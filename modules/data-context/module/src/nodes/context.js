import {
  defineNode
} from '@noodl/noodl-sdk';
import {
  inputTypeEnums
} from '../constants';

import create from 'zustand/vanilla'

export function findContext(contextName, nodeScope) {
  if (!window.data_context_context || !window.data_context_context[contextName]) {
    // There is no context created by that name.
    return null;
  }

  const id = nodeScope.componentOwner.id;

  // Check if the context exist on this component.
  if (window.data_context_context[contextName][id]) {
    return window.data_context_context[contextName][id];
  }

  // Check if the context exists on the parent component.
  if (nodeScope.componentOwner.parent) {
    return findContext(contextName, nodeScope.componentOwner.parent.nodeScope);
  }

  return null;
}

function createContext(contextName, nodeScope, initialState) {
  if (!window.data_context_context) {
    window.data_context_context = {};
  }

  if (!window.data_context_context[contextName]) {
    window.data_context_context[contextName] = {};
  }

  // console.debug(`[state][initial]['${contextName}']`, initialState)

  const id = nodeScope.componentOwner.id;
  window.data_context_context[contextName][id] = create(() => initialState);
}

export default defineNode({
  name: 'data_context.context',
  displayName: "Context",
  useInputAsLabel: 'contextName',
  color: 'green',
  initialize() {
    this.scheduleAfterInputsHaveUpdated(() => {
      const contextName = this._inputValues.contextName;
      const contextInputs = this._inputValues.contextInputs;
      const initialState = contextInputs ? contextInputs.reduce((result, prop) => {
        result[prop.label] = this.model.parameters['in-' + prop.label];
        return result;
      }, {}) : {};

      createContext(contextName, this.nodeScope, initialState);
    });
  },
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
    contextInputs: {
      type: {
        name: 'proplist',
        allowEditOnly: true
      },
      group: 'Properties',
      set(_value) {
        // no op
      }
    },
  },
  getInspectInfo() {
    const contextName = this._inputValues.contextName;
    const store = findContext(contextName, this.nodeScope);
    if (store) {
      return [{ type: 'value', value: store.getState() }]
    }

    return "[No value set]";
  },
  setup(context, graphModel) {
    if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
      return;
    }

    graphModel.on("editorImportComplete", () => {
      graphModel.on("nodeAdded.data_context.context", function (node) {
        _managePortsForNode(context, node)

        // TODO: Check duplicates
      })

      for (const node of graphModel.getNodesWithType('data_context.context')) {
        _managePortsForNode(context, node)
      }
    })
  }
});

function _managePortsForNode(context, node) {
  function _updatePorts() {
    var ports = [];

    // Inputs
    if (node.parameters.contextInputs && node.parameters.contextInputs.length > 0) {
      node.parameters.contextInputs.forEach((p) => {
        // Type for input
        ports.push({
          name: 'intype-' + p.label,
          displayName: 'Type',
          editorName: p.label + ' | Type',
          plug: 'input',
          type: {
            name: 'enum',
            enums: inputTypeEnums,
            allowEditOnly: true
          },
          default: 'string',
          parent: 'contextInputs',
          parentItemId: p.id
        })

        // Default Value for input
        ports.push({
          name: 'in-' + p.label,
          displayName: p.label,
          plug: 'input',
          type: node.parameters['intype-' + p.label] || 'string',
          group: 'Inputs'
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