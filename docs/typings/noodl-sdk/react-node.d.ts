
declare module '@noodl/noodl-sdk' {

    // https://github.com/noodlapp/noodl-chartjs-module/blob/cbd69e526a8e68804f738c1deeb679b22d7df3ac/module/src/chart.js#L68-L72
    export type ReactNodeInput = {
        index?: number;
        displayName?: string;
        group?: string;
        default?: any;
        type: Type | { // TODO: this is probably the same for everything? Just have extra props?
            name: string;
            units?: string[];
            defaultUnit?: string;
            enums?: {
                label: string;
                value: string;
            }[];
        };
        transformTo?: (value: any) => any;
    };

    export type ReactNodeOutput = {
        type: Type;
        displayName?: string;
        group?: string;
    };

    export type ReactNodeInputCss = {
        index?: number;
        group?: string;
        displayName?: string;
        type: Type;
        default?: any;
    };

    export type ReactNode = {
        name: string;
        category?: string;

        /**
         * URL to the docs page.
         */
        docs?: string;

        getReactComponent: () => any;

        inputs?: {
            [key: string]: NodeInput
        };

        inputProps?: {
            [key: string]: ReactNodeInput
        };

        outputProps?: {
            [key: string]: ReactNodeOutput
        };

        inputCss?: any;
        setup?: any;

        frame?: {
            margins?: boolean;
            position?: boolean;
            align?: boolean;
        };
    };

    export type ReactNodeDefinition = {

    };
}
