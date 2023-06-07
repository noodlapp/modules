"use strict";

const Noodl = require('@noodl/noodl-sdk');
const MQTTConnection = require('./mqttconnection');

function getCurrentTime() {
  if (typeof window !== 'undefined') {
    return window.performance.now();
  } else {
    return (+new Date());
  }
}

function addToCSVPayload(payload, name, value) {
  if (payload.length > 0) payload += ',';
  payload += value;
  return payload;
}

function addToJSONPayload(payload, name, value) {
  var path = name.split('.');
  for (var i = 0; i < path.length - 1; i++) {
    if (!payload[path[i]]) payload[path[i]] = {};
    payload = payload[path[i]];
  }
  payload[path[path.length - 1]] = value;
  return payload;
}

const SendMessageNode = Noodl.defineNode({
  name: "Send Message",
  category: "MQTT",
  useInputAsLabel: "topic", // This will instruct Noodl to use the topic input as the label of the nodes when shown in the editor
  color: "purple", // This will specify the color of the node in the editor, it can be "green" (data), "purple" (typically messages, component inputs/outputs and other control nodes) and "default" (grey)
  initialize: function () {
    this.inputs.payload = "";
    this.inputs.topic = "";
    this.payloadValues = {};
    this.topicValues = {};
    this.hasScheduledPublish = false;
    this.inputs.publishOnInputsChanged = false;
    this.inputs.rateLimitEnabled = false;
    this.inputs.maxMessagesPerSecond = 10;
    this.lastPublishTime = 0;
    this.inputs.format = 'json';
  },
  signals: {
    Send: function () {
      this.schedulePublish();
    }
  },
  inputs: {
    topic: { // You can specify more details regarding the type 
      type: {
        name: 'string' // This is a string
      },
      default: '', // The default value shown in the Noodl editor
      displayName: 'Topic', // The display name for the input (i.e. the name that will be shown in the editor)
      group: 'General', // The group it will belong to in the property panel
    },
    payload: {
      type: {
        name: 'stringlist',
        allowEditOnly: true
      }, // The stringlist type will produce a property where you can add and remove strings, it will be returned as a comma seperated list of strings
      group: 'Payload'
    },
    format: {
      type: { // The enumerator type will produce a drop down with the options speciried
        name: 'enum',
        enums: [{
          value: 'json',
          label: 'JSON'
        }, {
          value: 'csv',
          label: 'CSV'
        }]
      },
      displayName: 'Format',
      group: 'General',
      default: 'json',
    },
    publishOnInputsChanged: {
      type: 'boolean',
      default: false,
      displayName: 'Send On Change',
      group: 'General',
    },
    rateLimit: {
      type: 'boolean',
      default: false,
      displayName: 'Rate Limit',
      group: 'Rate Limit',
    },
    maxMessagesPerSecond: {
      type: 'number',
      default: 10,
      displayName: 'Messages / Sec',
      group: 'Rate Limit',
    }
  },
  methods: {
    registerInputIfNeeded: function (name) { // This method is used to register inputs dynamically, it is called by Noodl when it cannot find an input specified above
      if (this.hasInput(name)) { // First check that the input has not been created already
        return;
      }

      // All ports where the name starts with "topic-" are registered with the setter setTopicValue
      if (name.startsWith('topic-')) this.registerInput(name, {
        set: this.setTopicValue.bind(this, name.substring('topic-'.length))
      })

      // All ports where the name starts with "payload-" are registered with the setter setPayloadValue
      if (name.startsWith('payload-')) this.registerInput(name, {
        set: this.setPayloadValue.bind(this, name.substring('payload-'.length))
      })
    },
    setPayloadValue: function (name, value) {
      this.payloadValues[name] = value;
      if (this.inputs.publishOnInputsChanged) {
        this.schedulePublish();
      }
    },
    setTopicValue: function (name, value) {
      this.topicValues[name] = value;
      if (this.inputs.publishOnInputsChanged) {
        this.schedulePublish();
      }
    },
    computeTopic: function () {
      const topicComponentsMap = {};
      // Compute the topic components map to use later
      var inputs = this.inputs.topic.match(/\{([a-z]|[A-Z])([a-z]|[A-Z]|[0-9])*\}/g);
      for (var i in inputs)
        topicComponentsMap[inputs[i].replace(/(\{|\})/g, '')] = true;

      var topic = this.inputs.topic;
      for (var i in topicComponentsMap) {
        topic = topic.replace('{' + i + '}', this.topicValues[i]);
      }
      return topic;
    },
    schedulePublish: function () {
      if (this.hasScheduledPublish) {
        return;
      }

      if (this.inputs.rateLimitEnabled) {
        //if the last publish is waiting, drop it in favor of this one
        clearTimeout(this.rateLimitTimeoutId);
        var now = getCurrentTime();
        var ms = 1000 / this.inputs.maxMessagesPerSecond;
        var timeSinceLastPublish = now - this.lastPublishTime;
        if (timeSinceLastPublish < ms) {
          //don't drop this publish in case it's the last one in a sequence
          //If 1,2,3 is sent and 3 is dropped, wait until the next publish slot and send 3 later
          //note: setTimeout is not very precise (~20ms precision), but good enough
          this.rateLimitTimeoutId = setTimeout(this.schedulePublish.bind(this), ms - timeSinceLastPublish);
          return;
        }
      }

      this.hasScheduledPublish = true;

      // Wait for all other inputs to update before sending
      // This is important to do, otherwise there might be pending updates to e.g. payload and topic components that have not yet
      // propagated through the graph.
      // Do this every time you need to run some code that are dependent on the corrent value of the node inputs
      this.scheduleAfterInputsHaveUpdated(() => {
        this.hasScheduledPublish = false;
        var topic = this.computeTopic();

        var payload;
        var addToPayload;
        if (this.inputs.format === 'csv') {
          addToPayload = addToCSVPayload;
          payload = '';
        } else {
          addToPayload = addToJSONPayload;
          payload = {};
        }

        for (var i in this.payloadValues) {
          payload = addToPayload(payload, i, this.payloadValues[i]);
        }

        MQTTConnection.instance.publish(topic, payload);
        this.lastPublishTime = getCurrentTime();
      });
    }
  },
  setup: function (context, graphModel) {
    // This part will only run when the module is connected to the editor and can be used to
    // provide information to the editor at runtime about this node
    if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
      return;
    }

    graphModel.on("nodeAdded.Send Message", function (node) {
      // A node of the type "Send Message" (that is our node) have been added to the
      // graph
      function updatePorts() {
        const id = node.id;
        const topic = node.parameters.topic;

        var ports = [];

        if (topic) {
          var inputs = topic.match(/\{([a-z]|[A-Z])([a-z]|[A-Z]|[0-9])*\}/g); // Match topic components {...}

          for (var i in inputs) { // Create a port description for each topic component
            var p = (inputs[i].replace(/(\{|\})/g, ''));
            ports.push({
              name: 'topic-' + p, // We add a prefix to know that this port is a topic port
              displayName: p, // We don't want to show the name with prefix in the editor
              group: 'Topic components',
              plug: 'input',
              type: '*'
            })
          }
        }

        const payload = node.parameters.payload;
        if (payload) {
          payload.split(',').forEach((p) => {
            ports.push({
              name: 'payload-' + p, // The name of the port, we add a prefix to know that this port is a payload port
              displayName: p, // This is the display name, i.e. the name shown in the editor, we don't want the prefix here
              group: 'Payload',
              plug: 'input',
              type: {
                name: '*',
                allowConnectionsOnly: true
              }
            });
          })
        }

        // Send it to the editor
        context.editorConnection.sendDynamicPorts(id, ports);
      }

      // The topic and payload inputs will generate dynamic ports, so we check if this node instance
      // have any of them
      if (node.parameters.topic || node.parameters.payload) {
        updatePorts();
      }

      // Also we check if they are updated in which case we need to update the dynamic port description as
      // well
      node.on("parameterUpdated", function (event) {
        if (event.name === "topic" || event.name === "payload") {
          updatePorts();
        }
      });
    });
  }
})

module.exports = SendMessageNode;