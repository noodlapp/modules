import { defineNode } from "@noodl/noodl-sdk";
import { getWorker } from "./worker";

export default defineNode({
  name: "web-worker.sendMessage",
  displayName: "Worker Send Message",
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
      type: "string",
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
    success: {
      type: "signal",
      displayName: "Success",
      group: "Events"
    },
    failure: {
      type: "signal",
      displayName: "Failure",
      group: "Events"
    },
  },
  initialize() {
    this._internal.inputs = {};
  },
  signals: {
    Send() {
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

      const worker = getWorker(workerName);
      if (!worker) {
        this.sendSignalOnOutput("failure");
        const message = `Cannot find available worker '${workerName}'.`;
        this.sendWarning(this.nodeScope.componentOwner.name, message, 'web-worker', { message, showGlobally: true });
        return;
      }

      this.clearWarnings();

      try {
        worker.worker.postMessage([messageName, this._internal.inputs]);
        this.sendSignalOnOutput("success");
      } catch (error) {
        console.error(error);

        const message = `Failed to send: ${error}`;
        this.sendWarning(this.nodeScope.componentOwner.name, message, 'web-worker', { message, showGlobally: true });
        
        this.sendSignalOnOutput("failure");
      }
    }
  },
  changed: {},
  methods: {
    registerInputIfNeeded: function (name) {
      if (this.hasInput(name)) {
        return;
      }

      if (name.startsWith("prop-")) {
        this.registerInput(name, {
          set: function (value) {
            const key = name.substring("prop-".length);
            this._internal.inputs[key] = value;
          }
        });
      }
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
      graphModel.on("nodeAdded.web-worker.sendMessage", function (node) {
        _managePortsForNode(context, node);
      });

      for (const node of graphModel.getNodesWithType('web-worker.sendMessage')) {
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
          plug: 'input',
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
