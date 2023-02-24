import * as Noodl from '@noodl/noodl-sdk';

// Nodes
import { module as DynamicComponent } from './nodes/dynamic-component/dynamic-component'
import { module as nodeChildrenCountComponent } from './nodes/node-scope/node-children-count'
import { module as nodesOfTypeComponent } from './nodes/node-scope/nodes-of-type'

// React Nodes
import { iconSpinner } from './reactNodes/icons/icon-spinner'

Noodl.defineModule({
    reactNodes: [
        iconSpinner
    ],
    nodes: [
        DynamicComponent.node,
        nodeChildrenCountComponent.node,
        nodesOfTypeComponent.node
    ],
    setup() { }
});
