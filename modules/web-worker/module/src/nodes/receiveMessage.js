import { defineNode } from "@noodl/noodl-sdk";
import { events } from "./worker";

export default defineNode({
  name: "web-worker.receiveMessage",
  displayName: "Worker Receive Message",
  color: "green",
  inputs: {
    workerName: {
      type: {
        name: 'string',
        identifierOf: 'web-worker.name',
        identifierDisplayName: 'Worker Names'
      },
      displayName: 'Worker Name',
      group: 'General',
    },
    messageName: {
      type: {
        name: "string",
        allowEditOnly: true
      },
      displayName: "Message Name",
      group: "General",
    },
    properties: {
      type: {
        name: 'stringlist',
        allowEditOnly: true
      },
      group: 'Properties',
      set(_value) {
        // no op
      }
    },
  },
  outputs: {
    received: {
      type: "signal",
      displayName: "Received",
      group: "Events"
    },
  },
  initialize() {
    this._internal = {
      outputValues: {},
    };

    const _this = this;
    
    this._internal.handler = (event) => {
      const messageName = _this.inputs.messageName;
      if (event.kind !== messageName) return;

      Object.keys(event.data).forEach((prop) => {
        _this.registerOutputIfNeeded("prop-" + prop);
        _this._internal.outputValues[prop] = event.data[prop];
        _this.flagOutputDirty("prop-" + prop);
      });
      
      _this.sendSignalOnOutput("received");
    };

    this.addDeleteListener(() => {
      debugger
      _this.unsubscribe();
    });

    this.scheduleAfterInputsHaveUpdated(() => {
      _this.subscribe();
    });
  },
  signals: {},
  changed: {
    workerName() {
      this.subscribe();
    }
  },
  methods: {
    unsubscribe() {
      if (!this._internal.workerName) return;
      console.log("unsub");
      events.removeEventListener(
        this._internal.workerName,
        this._internal.handler
      );
      this._internal.workerName = null;
      this._internal.handler = null;
    },
    subscribe() {
      this.unsubscribe();

      const workerName = this.inputs.workerName;
      const messageName = this.inputs.messageName;

      if (!workerName) {
        const message = `Missing Worker Name.`;
        this.sendWarning(this.nodeScope.componentOwner.name, message, 'web-worker', { message, showGlobally: true });
        return;
      }

      if (!messageName) {
        const message = `Missing Message Name.`;
        this.sendWarning(this.nodeScope.componentOwner.name, message, 'web-worker', { message, showGlobally: true });
        return;
      }

      this.clearWarnings();

      this._internal.workerName = workerName;
      events.addEventListener(workerName, this._internal.handler);
    },
    registerOutputIfNeeded: function (name) {
      if (this.hasOutput(name)) {
        return;
      }

      return this.registerOutput(name, {
        getter: function (name) {
          return this._internal.outputValues[name];
        }.bind(this, name.substring("prop-".length)),
      });
    },
  },
  setup(context, graphModel) {
    if (
      !context.editorConnection ||
      !context.editorConnection.isRunningLocally()
    ) {
      return;
    }
    
    graphModel.on("editorImportComplete", () => {
      graphModel.on("nodeAdded.web-worker.receiveMessage", function (node) {
        _managePortsForNode(context, node);
      });

      for (const node of graphModel.getNodesWithType('web-worker.receiveMessage')) {
        _managePortsForNode(context, node);
      }
    });
  },
});

function _managePortsForNode(context, node) {
  function _updatePorts() {
    const ports = [];

    if (node.parameters.properties) {
      node.parameters.properties.split(",").forEach((label) => {
        ports.push({
          name: 'prop-' + label,
          displayName: label,
          plug: 'output',
          type: '*',
          group: 'Properties'
        })
      })
    }

    context.editorConnection.sendDynamicPorts(node.id, ports);
  }

  _updatePorts();
  node.on('parameterUpdated', function (ev) {
    _updatePorts();
  })
}
