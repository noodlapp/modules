declare module '@noodl/noodl-sdk' {
    export type NodeInput =
        | Type
        | {
              type: Type
              displayName?: string
              group?: string
              default?: any
              set?: (this: NodeInstance, value: unknown) => void
          }

    export type NodeOutput =
        | Type
        | {
              type: Type
              displayName?: string
              group?: string
          }

    export type NodeSignal = {
        (this: NodeInstance): void
    }

    export type NodeMethod = {
        (this: NodeInstance, ...args: any): any
    }

    export type Node<TDef = {}> = {
        /**
         * Sets the name.
         */
        name: string

        displayName?: string
        usePortAsLabel?: string

        /**
         * Sets the color.
         */
        color?: Color

        /**
         * Sets the category.
         */
        category?: string

        allowChildren?: boolean

        getInspectInfo?: any

        /**
         * URL to the docs page.
         */
        docs?: string

        shortDesc?: string

        initialize?: (this: NodeInstance & TDef) => void

        inputs?: {
            [key: string]: NodeInput
        }

        outputs?: {
            [key: string]: NodeOutput
        }

        changed?: {
            [key: string]: (
                this: NodeInstance & TDef,
                newValue: unknown,
                oldValue: unknown
            ) => void
        }

        signals?: {
            [key: string]: NodeSignal
        }

        // Previously 'prototypeExtensions'
        methods?: {
            [key: string]: (this: NodeInstance & TDef, ...args: any) => any
        }

        /**
         * This is called once on startup
         */
        setup?: () => void
    }
}
