
declare module '@noodl/noodl-sdk' {
    export type NodeInstance = {
        id: string;
        context: any;
        model: any;
        nodeScope: NodeScope;
        numberedInputs: {};

        inputs: {
            [key: string]: any;
        };

        outputs: {
            [key: string]: any;
        };

        result: Proxy;

        clearWarnings(): void;
        sendWarning(name: string, message: string): void;

        setOutputs(o: { [key: string]: any }): void;



        registerInput(t: any, e: any): void;
        registerInputIfNeeded(name: string): void;
        deregisterInput(t: any): void;

        registerInputs(t: { [key: string]: any }): void;
        registerNumberedInput(t: any, e: any): void;

        getInput(name: string): { set: (n: any) => void; } | undefined;
        hasInput(name: string): boolean;
        setInputValue(t: any, e: any): void;

        // TODO: Why do I have to add a getter? Can it use the default?
        registerOutput(name: string, e: {
            get?: () => any;
            getter: () => any;
            onFirstConnectionAdded?: () => void;
            onLastConnectionRemoved?: () => void;
        }): void;

        // TODO: This is not added in the core code
        //registerOutputIfNeeded(): void;
        deregisterOutput(t: any): void;

        registerOutputs(t: { [key: string]: any }): void;

        hasOutput(t: any): boolean;
        getOutput(t: string): any;

        connectInput(t: any, e: any, n: any): void;
        removeInputConnection(t: any, e: any, n: any): void;
        isInputConnected(t: any): boolean;
        queueInput(t: any, e: any): void;

        /**
         * Dispatch code after the inputs have been updated.
         *
         * @param func
         */
        scheduleAfterInputsHaveUpdated(func: (this: any) => void): void;

        update(): void;
        sendValue(t: any, e: any): void;
        setNodeModel(t: any): void;
        addDeleteListener(t: any): void;

        flagDirty(): void;
        flagOutputDirty(name: string): void;
        sendSignalOnOutput(name: string): void;
    };
}
