
declare module '@noodl/noodl-sdk' {
    export type NodeEditorContext = {
        variants: any;
        nodeRegister: NodeRegister;
        editorConnection: any;

        isWarningTypeEnabled(v: string): boolean;

        createComponentInstanceNode(name: string, id: string, t: any, extraProps: any): Promise<any>;

        hasComponentModelWithName(name: string): boolean;
    }
}
