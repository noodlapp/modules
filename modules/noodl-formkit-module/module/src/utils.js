function addFontStyling(def) {
    def.inputs = Object.assign(def.inputs || {}, {
        textStyle: {
            index: 19,
            type: 'textStyle',
            group: 'Text',
            displayName: 'Text Style',
            default: 'None',
        },
        fontFamily: {
            index: 20,
            type: 'font',
            group: 'Text',
            displayName: 'Font Family',
        },
    })

    def.inputCss = Object.assign(def.inputCss || {}, {
        fontSize: {
            index: 21,
            group: 'Text',
            displayName: 'Font Size',
            type: {
                name: 'number',
                units: ['px'],
                defaultUnit: 'px'
            },
            onChange() {
                if (this.props.textStyle) {
                    this.forceUpdate();
                }
            }
        },
    })

    def.changed = Object.assign(def.changed || {}, {
        fontFamily(value) {
            if (value) {
                let family = value;
                if (family.split('.').length > 1) {
                    family = family.replace(/\.[^/.]+$/, "");
                    family = family.split('/').pop();
                }
                this.setStyle({ fontFamily: family });
            }
            else {
                this.removeStyle(['fontFamily']);
            }

            if (this.props.textStyle) {
                this.forceUpdate();
            }
        },
        textStyle(value) {
            this.props.textStyle = this.context.styles.getTextStyle(value);
            this.forceUpdate();
        },
        items(newValue) {
            if (this._items !== newValue && this._items !== undefined) {
                this._items.off('change', this._itemsChanged);
            }
            this._items = newValue;
            this._items.on('change', this._itemsChanged)

            this.props.items = this._items;
        }
    })
}

function addVisibilityUtils(def) {
    def.inputCss = Object.assign(def.inputCss || {}, {
        opacity: {
            index: 200,
            group: 'Style',
            displayName: 'Opacity',
            type: 'number',
            default: 1
        }
    })

    def.inputs = Object.assign(def.inputs || {}, {
        visible: {
            index: 210,
            displayName: 'Visible',
            group: 'Style',
            default: true,
            type: 'boolean'
        },
        zIndex: {
            index: 211,
            displayName: 'zIndex',
            group: 'Style',
            type: 'number'
        }
    })

    def.changed = Object.assign(def.changed || {}, {
        visible(value) {
            if (value) {
                this.removeStyle(['visibility']);
            }
            else {
                this.setStyle({ visibility: 'hidden' });
            }
        },
        zIndex(value) {
            if (value === undefined) {
                this.removeStyle(['zIndex']);
            }
            else {
                this.setStyle({ zIndex: Number(value) });
            }
        }
    })
}

/*function addBorderStyles(def) {
    def.inputCss = Object.assign(def.inputCss || {}, {
        borderRadius: {
            index: 202,
            displayName: 'Border Radius',
            group: 'Style',
            type: {
                name: 'number',
                units: ['px'],
                defaultUnit: 'px'
            },
            default: 2,
            applyDefault: false
        },
        borderStyle: {
            index: 203,
            displayName: 'Border Style',
            group: 'Style',
            type: {
                name: 'enum',
                enums: [
                    {label: 'None', value: 'none'},
                    {label: 'Solid', value: 'solid'},
                    {label: 'Dotted', value: 'dotted'},
                    {label: 'Dashed', value: 'dashed'}
                ]
            },
            default: 'solid',
            applyDefault: false
        },
        borderWidth: {
            index: 204,
            displayName: 'Border Width',
            group: 'Style',
            type: {
                name: 'number',
                units: ['px'],
                defaultUnit: 'px'
            },
            default: 1,
            applyDefault: false
        },
        borderColor: {
            index: 205,
            displayName: 'Border Color',
            group: 'Style',
            type: 'color',
            default: '#000000'
        }
    })
}*/

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000) .toString(16) .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4() + s4();
}

function _shallowCompare(o1, o2){
    for(var p in o1){
        if(o1.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    for(var p in o2){
        if(o2.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    return true;
}
 
const _styleSheets = {}

function updateStylesForClass(_class,props,_styleTemplate) {
    if(_styleSheets[_class]) {
        // Check if props have changed
        if(!_shallowCompare(props,_styleSheets[_class].props)) {
            _styleSheets[_class].style.innerHTML = _styleTemplate(_class,props);
            _styleSheets[_class].props = Object.assign({},props);
        }
    }
    else {
        // Create a new style sheet if none exists
        var style=document.createElement('style');
        style.innerHTML = _styleTemplate(_class,props);
        document.head.appendChild(style);

        _styleSheets[_class] = {style,props:Object.assign({},props)}
    }
    
}

export default {
    addFontStyling,
    addVisibilityUtils,
    //addBorderStyles,
    guid,
    updateStylesForClass
}