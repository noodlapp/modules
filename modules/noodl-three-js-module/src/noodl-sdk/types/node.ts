import { Color, TypeName, Type } from './common'
import { TSFixme } from '../global'
import { NodeInstance } from './node-instance'
import { InternalNodeDefinition } from '../internal/common';

/** Defines a input defined on a node. */
export type NodeInput = TypeName | {
    type: Type;
    displayName?: string;
    group?: string;
    default?: any;
    set?: (this: NodeInstance, value: unknown) => void;
};

/** Defines a output defined on a node. */
export type NodeOutput = TypeName | {
    type: Type;
    displayName?: string;
    group?: string;
};

/** Defines a signal defined on a node. */
export type NodeSignal = {
    (this: NodeInstance): void;
} | {
    displayName?: string;
    group?: string;
    signal: (this: NodeInstance) => void;
};

/** Defines a method defined on a node. */
export type NodeMethod<TInstance> = {
    (this: TInstance & NodeInstance, ...args: any): unknown;
};

export type InspectInfoFunc = () => { type: 'text' | 'color', value: string }[] | string | undefined;

export type NodeDefinition<TInstance = {}> = {
    /**
     * Sets the name.
     * 
     * IMPORTANT:
     * This name will be a identifier for this node,
     * so changing the name will make all the projects using it lose reference.
     */
    name: string;
    
    /**
     * Sets a name that will be displayed instead of 'name'.
     */
    displayName?: string;

    displayNodeName?: string;
    usePortAsLabel?: string;
    
    /** Use the port value as label */
    useInputAsLabel?: string;

    /**
     * Sets the color.
     * 
     * Default: 'default'
     */
    color?: Color;

    /** Sets the category. */
    category?: string;

    allowChildren?: boolean;
    allowChildrenWithCategory?: string[];

    getInspectInfo?: InspectInfoFunc;

    /** URL to the docs page. */
    docs?: string;

    setup?: () => void;
    initialize?: (this: NodeInstance & TInstance) => void;

    inputs?: {
        [key: string]: NodeInput;
    };

    outputs?: {
        [key: string]: NodeOutput;
    };

    changed?: {
        [key: string]: (this: NodeInstance & TInstance, newValue: unknown, oldValue: unknown) => void;
    }

    signals?: {
        [key: string]: NodeSignal
    };

    methods?: {
        [key: string]: NodeMethod<TInstance>;

        /** Occurs when a node is deleted. */
        onNodeDeleted?: NodeMethod<TInstance>;
    };
}

export type ReactNodeDefinition<TInstance = {}> = NodeDefinition<TInstance> & {
    getReactComponent: () => (...args: any) => JSX.Element;
    
    inputProps?: {
        [key: string]: {
            index?: number;
            displayName: string;
            type: Type;
            group: string;
            default?: unknown;
        }
    };

    inputCss?: {
        [key: string]: {
            index?: number;
            displayName: string;
            type: Type;
            group: string;
            default: unknown;
            applyDefault: boolean;

            onChange: (value: unknown) => void;
        }
    }

    outputProps?: {
        [key: string]: {
            displayName: string;
            type: Type;
            group: string;
        }
    };

    setup?: TSFixme;
    frame?: TSFixme;
}

export type NodeCtor = {
    node: InternalNodeDefinition;
    setup: () => void;
}
