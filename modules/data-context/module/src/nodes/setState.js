import { defineNode } from '@noodl/noodl-sdk';
import { findContext } from './context';
import { getContextInputProperties } from '../utils';

export default defineNode({
	name: 'data_context.setState',
	displayName: "Set State",
	useInputAsLabel: 'contextName',
	color: 'green',
	inputs: {
		contextName: {
			type: {
				name: 'string',
				identifierOf: 'data_context.context',
				identifierDisplayName: 'Contexts'
			},
			displayName: 'Context Name',
			group: 'General',
		},
	},
	outputs: {
		done: {
			type: 'signal',
			displayName: "Success",
			group: "Events"
		},
		failure: {
			type: 'signal',
			displayName: "Failure",
			group: "Events"
		},
	},
	signals: {
		Do() {
			const newState = this._internal;

			const contextName = this._inputValues.contextName;
			const store = findContext(contextName, this.nodeScope);
			if (store) {
				store.setState((state) => ({
					...newState
				}));
				this.sendSignalOnOutput("done");
			} else {
				this.sendSignalOnOutput("failure");
			}
		}
	},
	methods: {
		registerInputIfNeeded: function (name) {
			if (this.hasInput(name)) {
				return;
			}

			if (name.startsWith("prop-")) {
				this.registerInput(name, {
					set: function (value) {
						const key = name.substring("prop-".length);
						this._internal[key] = value;
					}
				});
			}
		},
	},
	setup(context, graphModel) {
		if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
			return;
		}

		// Update the ports when:
		// - Context properties change
		// - Context node is deleted
		// - Set State is created
		// - Set State context name changed

    graphModel.on("editorImportComplete", function () {
			function parameterUpdated(node, { name, value, state }) {
				if (name !== "contextName") return;

				// Get all contexts and update them based on value which is the contextName
				const contextNodes = graphModel.getNodesWithType(
					"data_context.context"
				);
				const inputs = getContextInputProperties(contextNodes, value);
				updatePortsFromContext(node, inputs, context);
			}

      // When set state is created
      graphModel.on("nodeAdded.data_context.setState", function (node) {
        const contextNodes = graphModel.getNodesWithType(
          "data_context.context"
        );

        // Update this node, if it already have a contextName
        if (node.parameters.contextName) {
          const inputs = getContextInputProperties(
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
				const inputs = getContextInputProperties(contextNodes, contextName);

				// Update all set state nodes
				graphModel
					.getNodesWithType("data_context.setState")
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

			const nodes = graphModel.getNodesWithType(
				"data_context.setState"
			);
			nodes.forEach((node) => {
				updateAll(node);
        node.on("parameterUpdated", (args) => parameterUpdated(node, args));
			});
    });
	}
});

function updatePortsFromContext(node, contextParameters, context) {
	const ports = [];

	for (const label in contextParameters) {
		ports.push({
			name: 'prop-' + label,
			displayName: label,
			plug: 'input',
			type: {
				name: contextParameters[label].type,
				allowConnectionsOnly: true,
			},
			group: 'Properties',
		})
	}

	context.editorConnection.sendDynamicPorts(node.id, ports, {
		detectRenamed: {
			plug: "input/output",
		},
	});
}
