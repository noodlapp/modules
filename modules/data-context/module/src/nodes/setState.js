import { defineNode } from '@noodl/noodl-sdk';
import { findContext } from './context';

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
			displayName: "Done",
			group: "Events"
		}
	},
	signals: {
		Do() {
			const newState = this._internal;

			const contextName = this._inputValues.contextName;
			const store = findContext(contextName, this.nodeScope);
			store.setState((state) => ({ ...newState }))

			this.sendSignalOnOutput("done");
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

		graphModel.on("nodeAdded.data_context.context", function (contextNode) {
			for (const node of graphModel.getNodesWithType('data_context.setState')) {
				updatePorts(node, contextNode.parameters, context)
			}

			contextNode.on("parameterUpdated", function (event) {
				for (const node of graphModel.getNodesWithType('data_context.setState')) {
					updatePorts(node, contextNode.parameters, context)
				}
			});
		});

		
		graphModel.on("nodeAdded.data_context.setState", function (contextNode) {
			const contextName = contextNode.parameters.contextName;

			const contextNodes = graphModel.getNodesWithType('data_context.context');
			const setStateNodes = graphModel.getNodesWithType('data_context.setState');

			for (const node of setStateNodes) {
				const dataContext = contextNodes.find((x) => x.parameters.contextName === contextName);
				if (dataContext) {
					updatePortsFromContextNode(node, dataContext, context);
				}
			}
		});
			
		graphModel.on("nodeAdded.data_context.context", function (contextNode) {
			contextNode.on("parameterUpdated", function (event) {
				for (const node of graphModel.getNodesWithType('data_context.setState')) {
					updatePorts(node, contextNode.parameters, context)
				}
			});
		});
	}
});

function updatePortsFromContextNode(node, contextNode, context) {
	const ports = [];

	const contextInputs = contextNode.parameters.contextInputs || [];
	for (const prop of contextInputs) {
    ports.push({
      name: 'prop-' + prop.label,
      displayName: prop.label,
      plug: 'input',
      type: {
				name: contextNode.parameters['intype-' + prop.label] || '*',
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

function updatePorts(node, parameters, context) {
	if (node.parameters.contextName !== parameters.contextName) {
		return;
	}

	const ports = [];

	const contextInputs = parameters.contextInputs || [];
	for (const prop of contextInputs) {
    ports.push({
      name: 'prop-' + prop.label,
      displayName: prop.label,
      plug: 'input',
      type: {
				name: parameters['intype-' + prop.label] || '*',
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
