declare module '@noodl/noodl-sdk' {
    export type NodeDefinitionInstance = {
        node: Node;

        /**
         * This is called once on startup
         */
        setup: () => void;
    };

    export function defineNode<TDef = {}>(def: Node<TDef>): NodeDefinitionInstance;
    export function defineReactNode(def: ReactNode): ReactNodeDefinition;
    export function defineModule(def: {
        reactNodes: ReactNodeDefinition[];
        nodes: NodeDefinitionInstance[];

        /**
         * This is called once on startup
         */
        setup: () => void;
    }): void;
}
