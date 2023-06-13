declare module '@noodl/noodl-sdk' {
    type ModuleSettingsInput = {
        name: string
        type: Type
        displayName: string
        plug: TSFixme
        group: string
    }

    export type NodeDefinitionInstance = {
        node: Node

        /**
         * This is called once on startup
         */
        setup: () => void
    }

    export function defineNode<TDef = {}>(
        def: Node<TDef>
    ): NodeDefinitionInstance
    export function defineReactNode(def: ReactNode): ReactNodeDefinition
    export function defineModule(def: {
        reactNodes?: ReactNodeDefinition[]
        nodes?: NodeDefinitionInstance[]
        settings?: ModuleSettingsInput[]

        /**
         * This is called once on startup
         */
        setup?: () => void
    }): void
}
