import { defineNode } from "@noodl/noodl-sdk";
import { inputTypeEnums } from "../constants";
import { findContext } from "./context";
import { getContextOutputProperties } from "../utils";

export default defineNode({
  name: "data_context.getState",
  displayName: "Get State",
  useInputAsLabel: "contextName",
  color: "green",
  inputs: {
    contextName: {
      type: {
        name: "string",
        identifierOf: "data_context.context",
        identifierDisplayName: "Contexts",
      },
      displayName: "Context Name",
      group: "General",
    },
  },
  outputs: {
    success: {
      type: "signal",
      displayName: "Success",
      group: "Events",
    },
    failure: {
      type: "signal",
      displayName: "Failure",
      group: "Events",
    },
  },
  initialize() {
    this._internal = {
      outputValues: {},
    };
  },
  signals: {
    Fetch() {
      const _this = this;
      function updateState(state) {
        Object.keys(state).forEach((prop) => {
          _this.registerOutputIfNeeded("prop-" + prop);
          _this._internal.outputValues[prop] = state[prop];
          _this.flagOutputDirty("prop-" + prop);
        });
      }

      try {
        const contextName = this._inputValues.contextName;
        const store = findContext(contextName, this.nodeScope);

        const state = store.getState();
        updateState(state);

        this.sendSignalOnOutput("success");
      } catch (error) {
        console.error(error);

        this.sendSignalOnOutput("failure");
      }
    },
  },
  methods: {
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
  getInspectInfo() {
    return [{ type: "value", value: this._internal.outputValues || {} }];
  },
  setup(context, graphModel) {
    if (
      !context.editorConnection ||
      !context.editorConnection.isRunningLocally()
    ) {
      return;
    }

    // Update the ports when:
    // - Context properties change
    // - Context node is deleted
    // - Get State is created
    // - Get State context name changed

    graphModel.on("editorImportComplete", function () {
      function parameterUpdated(node, { name, value, state }) {
        if (name !== "contextName") return;

        // Get all contexts and update them based on value which is the contextName
        const contextNodes = graphModel.getNodesWithType(
          "data_context.context"
        );
        const inputs = getContextOutputProperties(contextNodes, value);
        updatePortsFromContext(node, inputs, context);
      }

      // When set state is created
      graphModel.on("nodeAdded.data_context.getState", function (node) {
        const contextNodes = graphModel.getNodesWithType(
          "data_context.context"
        );

        // Update this node, if it already have a contextName
        if (node.parameters.contextName) {
          const inputs = getContextOutputProperties(
            contextNodes,
            node.parameters.contextName
          );
          updatePortsFromContext(node, inputs, context);
        }

        // Listen to when contextName is changed
        node.on("parameterUpdated", (args) => parameterUpdated(node, args));
      });

      function updateAll(node) {
        const contextName = node.parameters.contextName;

        // Get all the contexts with the same contextName,
        // so we combine all the properties into one object
        const contextNodes = graphModel.getNodesWithType(
          "data_context.context"
        );
        const inputs = getContextOutputProperties(contextNodes, contextName);

        // Update all set state nodes
        graphModel
          .getNodesWithType("data_context.getState")
          .filter((x) => x.parameters.contextName === contextName)
          .forEach((node) => {
            updatePortsFromContext(node, inputs, context);
          });
      }

      // When context is created
      graphModel.on("nodeAdded.data_context.context", function (node) {
        // Listen to parameters are changed
        node.on("parameterUpdated", () => updateAll(node));

        // Listen to when a context is deleted
        node.on("nodeRemoved", () => updateAll(node));
      });

      const nodes = graphModel.getNodesWithType("data_context.getState");
      nodes.forEach((node) => {
        updateAll(node);
        node.on("parameterUpdated", (args) => parameterUpdated(node, args));
      });
    });
  },
});

function updatePortsFromContext(node, contextParameters, context) {
  const ports = [];

  for (const label in contextParameters) {
    // Type for output
    ports.push({
      name: "proptype-" + label,
      displayName: "Type",
      editorName: label + " | Type",
      plug: "input",
      type: {
        name: "enum",
        enums: inputTypeEnums,
        allowEditOnly: true,
      },
      default: "string",
      parent: "contextInputs",
      parentItemId: contextParameters[label].id,
    });

    // Value for output
    ports.push({
      name: "prop-" + label,
      displayName: label,
      plug: "output",
      type: contextParameters[label].type,
      group: "Properties",
    });
  }

  context.editorConnection.sendDynamicPorts(node.id, ports, {
    detectRenamed: {
      plug: "output",
    },
  });
}
