"use strict";

var mqtt = require("mqtt");
const EventEmitter = require('events');

class MQTTConnection extends EventEmitter {
  constructor() {
    super();

    this.subscriptions = {};
    this.requestQueue = [];
  }

  connect(args) {
    if (this.url === args.url && this.clientId === args.clientId &&
      this.client) return; //don't connect to same url again

    this.connectArgs = args;
    this.url = args.url;
    this.clientId = args.clientId;

    if (this.client) {
      //end old connection before creating a new one
      this.disconnect();
    }

    var url = (typeof this.url === 'function') ? this.url() : this.url;
    if (!url) return;

    if (!url.endsWith('/') && url.indexOf('?') === -1) url += '/'; // Must end with /, add if no params
    if (url.startsWith('mqtt://')) {
      url = 'ws://' + url.substring(7); // Change mqtt to ws
    } else if (url.startsWith('mqtts://')) {
      url = 'wss://' + url.substring(8); // Change mqtts to wss
    }

    var match = url.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);
    if (!match) return;

    //add a random string to the client id so we can have multiple connections from the same clientId
    var clientGuid = ("000000" + (Math.random() * Math.pow(36, 6) << 0).toString(36)).slice(-6);
    var connectOptions = {
      clientId: args.clientId + '_' + clientGuid,
      ...args.webSocketOptions
    };

    var host = match[4] || match[2];
    if (host.indexOf('@') !== -1) {
      // There is a username and password in the url, we need to extract it and provide it
      // as options instead
      var up = host.split('@');
      var pair = up[0].split(':');
      var username = pair[0];
      var password = pair[1];
      url = url.substring(0, url.indexOf('://') + 3) + url.substring(url.indexOf('@') + 1);

      connectOptions.username = username;
      connectOptions.password = password;
    }

    const client = mqtt.connect(url, connectOptions);
    this.client = client;

    client.on('connect', () => {
      console.log('MQTT', 'Connected to', url);

      // Re subscribe to topics and report connected when ready
      const activeTopics = Object.keys(this.subscriptions).filter(topic => this.subscriptions[topic].length > 0) 
      let numTopics = activeTopics.length;
      const topicComplete = () => {
        numTopics--;
        if (numTopics === 0) {
          this.emit('connected');
          this._doQueue();
        }
      };

      if (numTopics === 0) {
        this.emit('connected');
        this._doQueue();
      } else {
        activeTopics.forEach(topic => {
          this.client.subscribe(topic, err => {
            if (err) {
              console.log('mqtt: failed to subscribe to', topic, err);
            }
            topicComplete();
          })
        })
      }
    });

    client.on('close', event => {
      if (event && event.type === 'error') {
        console.log("mqtt: connection error");
        this.emit('failure');
      }
      this.emit('connectionClosed');
    });

    client.on('message', (topic, message) => {
      const messageString = message.toString();

      let payload;
      try {
        payload = JSON.parse(messageString);
      } catch (e) {
        //payload wasn't a json object, assume it's a string
        payload = messageString;
      }

      this.routeMessage({
        topic: topic,
        payload: payload
      });
    });

  }

  reconnect() {
    this.connect(this.connectArgs);
  }

  disconnect() {
    if (this.client) {
      this.client.end();
      this.client = null;
    }
  }

  isConnected() {
    return this.client && this.client.connected;
  }

  getMatchingSubscribers(topic) {
    var subscribers = [];

    if (topic[0] === '/') topic = topic.substring(1); // Remove leading / when comparing

    function match(topic, filter) {
      if (filter[0] === '/') filter = filter.substring(1); // Remove leading / when comparing

      var c1 = topic.split('/');
      var c2 = filter.split('/');
      if (c1.length !== c2.length) return false;

      for (var i = 0; i < c1.length; i++) {
        if (c2[i] !== '+' && c1[i] !== c2[i]) return false;
      }
      return true;
    }

    for (var filter in this.subscriptions) {
      if (match(topic, filter)) {
        var subs = this.subscriptions[filter];
        for (var j = 0; j < subs.length; j++)
          subscribers.push(subs[j]);
      }
    }

    return subscribers;
  }

  routeMessage(message) {
    var subscribers = this.getMatchingSubscribers(message.topic);
    for (var i = 0; i < subscribers.length; i++) {
      try {
        subscribers[i](message);
      } catch (e) {
        console.log('Exception in MQTT message handler: ' + e);
        console.log(e.stack);
      }
    }
  }

  _doQueue() {

    if (this.requestQueueBusy) return;
    if (this.requestQueue.length === 0) return;
    if (!this.isConnected()) return;

    const next = () => {
      this.requestQueueBusy = false;
      this._doQueue();
    }

    const request = this.requestQueue.shift();

    if (request.type === "subscribe") {
      this.requestQueueBusy = true;
      this.client.subscribe(request.topic, err => {
        if (err) {
          console.log('mqtt: failed to subscribe', request.topic, err);
        }
        request.callback && request.callback(err);
        next();
      })
    } else if (request.type === "unsubscribe") {
      this.requestQueueBusy = true;
      this.client.unsubscribe(request.topic, (err) => {
        if (err) {
          console.log('mqtt: failed to unsubscribe', request.topic, err);
        }
        request.callback && request.callback(err);
        next();
      })
    } else if (request.type === "publish") {
      let payload = request.payload;
      if (typeof payload === "object") {
        payload = JSON.stringify(request.payload);
      }
      this.client.publish(request.topic, payload, err => {
        request.callback && request.callback(err);
      });
      this._doQueue();
    }
  }

  getSubscribers(topic) {
    if (!this.subscriptions[topic]) this.subscriptions[topic] = [];
    return this.subscriptions[topic];
  };

  subscribe(topic, callback) {
    var subscribers = this.getSubscribers(topic);

    if (subscribers.length === 0) {
      this.requestQueue.push({
        type: 'subscribe',
        topic: topic
      });
      this._doQueue();
    }

    subscribers.push(callback);
  }

  unsubscribe(topic, callback) {
    var subscribers = this.getSubscribers(topic);
    for (var i = 0; i < subscribers.length; i++) {
      if (subscribers[i] === callback)
        subscribers.splice(i, 1);
    }

    if (subscribers.length === 0) {
      this.requestQueue.push({
        type: 'unsubscribe',
        topic: topic
      });
      this._doQueue();
    }
  }

  publish(topic, payload) {
    this.requestQueue.push({
      type: 'publish',
      topic: topic,
      payload: payload
    });
    this._doQueue();
  }
}

module.exports = MQTTConnection;