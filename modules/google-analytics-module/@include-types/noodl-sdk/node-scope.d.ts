
declare module '@noodl/noodl-sdk' {
    /**
       * Node Scope for the current component.
       */
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
}
