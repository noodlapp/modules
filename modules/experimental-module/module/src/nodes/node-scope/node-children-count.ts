import * as Noodl from '@noodl/noodl-sdk'

const nodeChildrenCountComponent = Noodl.defineNode<{
    fetch: () => number,
}>({
    name: 'Node Children Count',
    color: 'grey',
    category: 'Logic',
    inputs: {
        component: {
            group: 'General',
            displayName: 'Node',
            type: '*'
        },
        recursive: {
            group: 'General',
            displayName: 'Recursive',
            type: 'boolean'
        },
    },
    outputs: {
        fetched: {
            type: 'signal',
            displayName: 'Fetched'
        },
        count: {
            type: 'number',
            displayName: 'Count'
        }
    },
    signals: {
        Fetch() {
            // TODO: This doesn't seem right, but what is "component" ?
            if (this.inputs.recursive) {
                const count = this.inputs.component.nodeScope.getAllNodesRecursive().length
                this.setOutputs({ count })
            } else {
                const count = Object.values(this.inputs.component.nodeScope.nodes).length
                this.setOutputs({ count })
            }
            this.sendSignalOnOutput('fetched');
        }
    }
})

export const module = {
    node: nodeChildrenCountComponent
}
