import {
	defineNode
} from '@noodl/noodl-sdk';
import { inputTypeEnums } from '../constants';
import { findContext } from './context';

export default defineNode({
	name: 'data_context.subscriber',
	displayName: "Subscriber",
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
		}
	},
	outputs: {},
	initialize() {
		this._internal = {
			outputValues: {}
		};

		const _this = this;
		function updateState(state) {
      Object.keys(state).forEach((prop) => {
        _this.registerOutputIfNeeded("prop-" + prop);
        _this._internal.outputValues[prop] = state[prop];
        _this.flagOutputDirty('prop-' + prop);
      });
		}

    this.scheduleAfterInputsHaveUpdated(() => {
      setTimeout(() => {
        const contextName = this._inputValues.contextName;
        const store = findContext(contextName, this.nodeScope);
  
        if (store) {
          store.subscribe(updateState);
  
          const state = store.getState();
          updateState(state)
        }
      }, 100);
	  });
	},
	methods: {
    registerOutputIfNeeded: function (name) {
      if (this.hasOutput(name)) {
        return;
      }

			return this.registerOutput(name, {
				getter: (function (name) {
					return this._internal.outputValues[name]
				}).bind(this, name.substring('prop-'.length))
			});
    }
	},
	getInspectInfo() {
		return [{
			type: 'value',
			value: this._internal.outputValues || {}
		}]
	},
	setup(context, graphModel) {
		if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
			return;
		}

		graphModel.on("nodeAdded.data_context.context", function (contextNode) {
			for (const node of graphModel.getNodesWithType('data_context.subscriber')) {
				updatePorts(node, contextNode.parameters, context)
			}

			contextNode.on("parameterUpdated", function (event) {
				for (const node of graphModel.getNodesWithType('data_context.subscriber')) {
					updatePorts(node, contextNode.parameters, context)
				}
			});
		});
	}
});

function updatePorts(node, parameters, context) {
	if (node.parameters.contextName !== parameters.contextName) {
		return;
	}

	const ports = [];

	const contextInputs = parameters.contextInputs || [];
	for (const prop of contextInputs) {
    // Type for output
    ports.push({
      name: 'proptype-' + prop.label,
      displayName: 'Type',
      editorName: prop.label + ' | Type',
      plug: 'input',
      type: {
        name: 'enum',
        enums: inputTypeEnums,
        allowEditOnly: true
      },
      default: 'string',
      parent: 'contextInputs',
      parentItemId: prop.id
    })

    // Value for output
    ports.push({
      name: 'prop-' + prop.label,
      displayName: prop.label,
      plug: 'output',
      type: node.parameters['proptype-' + prop.label] || '*',
      group: 'Properties',
    })
	}

	context.editorConnection.sendDynamicPorts(node.id, ports, {
		detectRenamed: {
			plug: "output",
		},
	});
}
