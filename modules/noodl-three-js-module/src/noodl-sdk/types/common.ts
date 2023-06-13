export type ColorTypes = {
    purple: 'component',
    green: 'data',
    blue: 'visual',
    default: 'default',
    grey: 'default'
};

const ColorTypesCache: ColorTypes = {
    purple: 'component',
    green: 'data',
    blue: 'visual',
    default: 'default',
    grey: 'default'
};

export type Color = keyof ColorTypes | ColorTypes[keyof ColorTypes];

/**
 * Parse either Color key or Color value to a color.
 * 
 * @param value 
 * @returns 
 */
export function parseColor(value: string): Color {
    const types: string[] = Object.values(ColorTypesCache);
    if (types.includes(value)) {
        // @ts-expect-error
        return value;
    }

    const colors: string[] = Object.keys(ColorTypesCache);
    if (colors.includes(value)) {
        // @ts-expect-error
        return ColorTypesCache[value]
    }

    return ColorTypesCache['default'];
}

export type TypeEditor
    = 'javascript'
    | 'graphql'
    | 'css';

export type TypeName =  '*'
    | 'object'
    | 'array'
    | 'string'
    | 'stringlist'
    | 'number'
    | 'boolean'
    | 'signal'
    | 'enum'
    | 'color'
    | 'image'
    | 'icon'
    | 'font'
    | 'textStyle'
    | 'component'
    | 'dimension'
    | 'source'
    | 'resizing'
    | 'variable'
    | 'curve'
    | 'query-filter'
    | 'query-sorting'
    | 'pages'
    | 'proplist'
    | string // custom type

export type Type = TypeName
    | { name: Type, codeeditor?: TypeEditor, allowEditOnly?: boolean };
