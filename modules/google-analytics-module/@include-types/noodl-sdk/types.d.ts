type ColorTypes = {
    purple: 'component'
    green: 'data'
    visual: 'blue'
    default: 'default'
    grey: 'default'
}

declare module '@noodl/noodl-sdk' {
    export type Color = keyof ColorTypes | ColorTypes[keyof ColorTypes]

    export type TypeEditor = 'javascript' | 'graphql' | 'html' | 'css'

    export type Type =
        | '*'
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
        | { name: Type; codeeditor?: TypeEditor; allowEditOnly?: boolean }
}
