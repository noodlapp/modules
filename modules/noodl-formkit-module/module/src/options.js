import Noodl from '@noodl/noodl-sdk'
import Utils from './utils'

import {
	useEffect,
	useState,
} from 'react';

// --------------------------------------------------------------------------------------
// Options
// --------------------------------------------------------------------------------------
function Options(props) {
	const [value, setValue] = useState(props.value);

	// Must update value output on both "mount" and when it's changed
	useEffect(() => {
		setValue(props.value);
        props.valueChanged && props.valueChanged(props.value);
        props.focusChanged && props.focusChanged(false);
	}, []);

	useEffect(() => {
			setValue(props.value);
			props.valueChanged && props.valueChanged(props.value);
	}, [props.value]);

	return <select className="ndl-formkit-select" {...props} disabled={!props.enabled} value={value} onChange = {e => {
		setValue(e.target.value);
		props.valueChanged && props.valueChanged(e.target.value);}}
        onFocus={(e) => {props.enabled && props.focusChanged && props.focusChanged(true); props.enabled && props.onFocused && props.onFocused()}}
        onBlur={(e) => {props.enabled && props.focusChanged && props.focusChanged(false); props.enabled && props.onBlurred && props.onBlurred()}}
        >
			{
				(props.items!==undefined)?props.items.map((i) => (<option value={i.Value} disabled={i.Disabled?true:undefined} selected={i.Selected?true:undefined}>{i.Label}</option>)):null
			}
	</select>
}

var OptionsNode = {
	name: 'net.noodl.formkit.options',
	displayName:'Options',
	category: 'Form Kit',
	initialize:function() {
		this._itemsChanged = () => {
			this.forceUpdate()
        }
        this.props.id = this.outputs.controlId = 'input-' + Utils.guid();
	},
	getReactComponent() {
		return Options;
	},
	frame:{
        dimensions:{defaultSizeMode: 'contentHeight', contentLabel: 'Text'},
        padding:true,
		margins:true,
		position:true,
		align:true
	},
	inputs: {
		items:{type:'array',displayName:'Items',group:'General'},
    },
    outputs:{
        controlId:{type:'string',displayName:'Control Id',group:'General'}
    },
	changed: {
		items(newValue) {
			if(this._items !== newValue && this._items !== undefined) {
				this._items.off('change',this._itemsChanged);
			}
			this._items = newValue;
			this._items.on('change',this._itemsChanged)

			this.props.items = this._items;
		}
	},
	inputProps: {
		value:{type:'string',displayName:'Value',group:'General'},
		enabled: {type:'boolean', displayName:'Enabled',group:'General', default:true},
	},
	inputCss:{
		color: {
			index: 24,
			group: 'Text',
			displayName: 'Color',
			type: 'color'
		},
        backgroundColor: {
            index: 100,
            displayName: 'Background Color',
            group: 'Style',
            type: 'color',
            default: 'transparent'
        },

        // Border styles
        borderRadius: {
            index: 202,
            displayName: 'Border Radius',
            group: 'Style',
            type: {
                name: 'number',
                units: ['px'],
                defaultUnit: 'px'
            },
            default: 0,
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
	},
	outputProps: {
        valueChanged:{type:'string',displayName:'Value',group:'General'},
        
        // States
        focusChanged:{type:'boolean',displayName:'Is Focused',group:'States'},
        
        // Events
        onFocused: {type: 'signal', displayName: 'Focused', group:'Events'},
        onBlurred: {type: 'signal', displayName: 'Blurred', group:'Events'},
	}
}
Utils.addFontStyling(OptionsNode)
Utils.addVisibilityUtils(OptionsNode)
OptionsNode = Noodl.defineReactNode(OptionsNode)
export default OptionsNode;