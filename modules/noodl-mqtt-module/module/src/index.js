const Noodl = require('@noodl/noodl-sdk');
const MQTTConnection = require('./mqttconnection');

Noodl.defineModule({
  nodes: [
    require('./sendmessage'),
    require('./receivemessage')
  ],
  settings: [ // The module settings will show up in the project settings panel
    {
      type: 'string',
      name: 'mqtt-module-broker-url',
      displayName: 'Broker URL',
      group: 'MQTT',
    }
  ],
  setup() {
    MQTTConnection.instance = new MQTTConnection();

    // Connect to the MQTT broker specified in the module settings
    MQTTConnection.instance.connect({
      url: Noodl.getProjectSettings()['mqtt-module-broker-url'],
      clientId: 'NoodlMQTT'
    })
  }
});