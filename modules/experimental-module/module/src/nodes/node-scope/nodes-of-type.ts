import * as Noodl from '@noodl/noodl-sdk'

const nodesOfTypeComponent = Noodl.defineNode<{
    fetch: () => unknown[];
}>({
    name: 'Nodes Of Type',
    color: 'grey',
    category: 'Logic',
    inputs: {
        component: {
            group: 'Type',
            displayName: 'Node Of Type',
            type: 'component'
        },
        checkRoot: {
            group: 'Type',
            displayName: 'Include all page',
            type: 'boolean'
        },
    },
    outputs: {
        fetched: {
            type: 'signal',
            displayName: 'Fetched'
        },
        nodes: {
            type: 'array',
            displayName: 'Nodes'
        }
    },
    signals: {
        Fetch() {
            const nodeScopeNodes: {
                [key: string]: any;
            } = this.inputs.checkRoot
                ? this.context.rootComponent.nodeScope.nodes
                : this.nodeScope.nodes

            const nodes = Object.values(nodeScopeNodes)
                .filter(x => (x.name || x.model.type) === this.inputs.component)
                .map(x => {
                    let object: { [key: string]: unknown } = {
                        id: x.id,
                        type: x.name || x.model.type,
                        inputs: Object.fromEntries(
                            Object.keys(x._inputs).map(k => [k, x._inputValues[k] || null])
                        )
                    }

                    if (x._internal?.childRoot) {
                        const domElement = x._internal.childRoot.getDOMElement()
                        if (domElement) {
                            object['element'] = domElement
                            object['clientBoundingRect'] = domElement.getBoundingClientRect()
                        }
                    }

                    return object
                })

            this.setOutputs({ nodes })
            this.sendSignalOnOutput('fetched');
        }
    }
})

export const module = {
    node: nodesOfTypeComponent
}
