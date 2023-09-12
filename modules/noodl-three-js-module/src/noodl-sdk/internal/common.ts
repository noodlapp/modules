import { Color, Type } from '../types/common'
import { TSFixme } from '../global'
import { InspectInfoFunc } from '../types/node';

export type InternalNodeInput = {
    type: Type | string;
    displayName: string | undefined;
    group: string | undefined;
    default: unknown | undefined;
    set?: (this: unknown, value: unknown) => void;
    valueChangedToTrue?: (this: unknown) => void;
};

export type InternalNodeOutput = {
    type: Type | string;
    displayName: string | undefined;
    group: string | undefined;
    getter: (() => unknown) | undefined;
};

type InternalReactNodeExtra = {
    getReactComponent?: () => (...args: any) => JSX.Element;
    inputProps?: TSFixme;
    inputCss?: TSFixme;
    outputProps?: TSFixme;
    setup?: TSFixme;
    frame?: TSFixme;
}

export type InternalNodeDefinition = InternalReactNodeExtra & {
    name: string;
    displayNodeName: string;
    usePortAsLabel: string;
    color: Color;
    category: string;
    
    allowChildren: boolean;
    allowChildrenWithCategory?: string[];

    getInspectInfo: InspectInfoFunc;
    docs: string;

    initialize: () => void;

    inputs: {
        [key: string]: InternalNodeInput;
    }

    outputs: {}
    methods: {}
}

export type NodeEditorContext = {
    variants: any;
    nodeRegister: NodeRegister;
    editorConnection: any;

    isWarningTypeEnabled(v: string): boolean;

    createComponentInstanceNode(name: string, id: string, t: any, extraProps: any): Promise<any>;

    hasComponentModelWithName(name: string): boolean;
}

/** Node Scope for the current component. */
export type NodeScope = {
    context: NodeEditorContext;
    nodes: { [key: string]: any };
    componentOwner: any;
    componentInstanceChildren: { [key: string]: any };

    addConnection(connectionData: any): void;
    setNodeParameters(node: any, nodeModel: any): void;
    createNodeFromModel(nodeModel: any): void;
    insertNodeInTree(nodeInstance: any, nodeModel: any): void;
    getNodeWithId(id: any): any;
    hasNodeWithId(id: any): boolean;
    createPrimitiveNode(name: any, id: any, extraProps: any): any;

    /**
     * 
     * @param name The name of the node.
     * @param id The node id, if undefined then it will generate a unique id.
     * @param extraProps 
     */
    createNode(
        name: string,
        id: string | undefined,
        extraProps?: { [key: string]: any } | undefined
    ): Promise<any>;

    getNodesWithIdRecursive(id: any): any;
    getNodesWithType(name: any): any;
    getNodesWithTypeRecursive(name: any): any;
    getAllNodesRecursive(): any[];
    getAllNodesWithVariantRecursive(variant: any): any[];
    onNodeModelRemoved(nodeModel: any): void;
    removeConnection(connectionModel: any): any;
    setComponentModel(connectionModel: any): any;
    reset(): void;
    deleteNode(nodeInstance: any): void;
    sendEventFromThisScope(eventName: any, data: any, propagation: any, sendEventInThisScope: any, _exlude: any): boolean;
}

export type NodeRegister = {
    register(nodeDefinition: any): void;
    createNode(name: string, id: string, nodeScope: NodeScope): any;
    getNodeMetadata(type: any): any;
    hasNode(type: any): any;
    getInputType(type: any, inputName: any): any;
}
