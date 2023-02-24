declare module '@noodl/noodl-sdk' {

    export function getProjectSettings(): { [key: string]: unknown };

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

        settings?: {
            name: string;
            type: Type;
            displayName?: string;
            group?: string;
            tooltip?: string;
        }[];

        /**
         * This is called once on startup
         */
        setup: () => void;
    }): void;
}
