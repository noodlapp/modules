import { Type } from "./common"

/** Defines a module setting. */
export type ModuleSettingDefinition = {
    name: string;
    type: Type;
    displayName?: string;
    group?: string;
    tooltip?: string;
}

export type ModuleDefinition = {
    reactNodes?: unknown[]; // InternalNodeDefinition
    nodes?: unknown[]; // NodeCtor
    settings?: ModuleSettingDefinition[];
    
    /** This is called once on startup */
    setup?: () => void;
}
