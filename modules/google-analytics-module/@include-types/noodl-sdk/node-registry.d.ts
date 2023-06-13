declare module '@noodl/noodl-sdk' {
    export type NodeRegister = {
        register(nodeDefinition: any): void;
        createNode(name: string, id: string, nodeScope: NodeScope): any;
        getNodeMetadata(type: any): any;
        hasNode(type: any): any;
        getInputType(type: any, inputName: any): any;
    }
}
