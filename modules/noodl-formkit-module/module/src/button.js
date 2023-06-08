import Noodl from '@noodl/noodl-sdk'
import Utils from './utils'

import {
	useEffect,
} from 'react';

// --------------------------------------------------------------------------------------
// Button
// --------------------------------------------------------------------------------------
function Button(props) {
    // On mount
    useEffect(() => {
        props.focusChanged && props.focusChanged(false);
        props.hoverChanged && props.hoverChanged(false);
        props.pressedChanged && props.pressedChanged(false);
    }, []);
    
	return <button className="ndl-formkit-button" disabled={!props.enabled} type={props.buttonType} {...props}
        onFocus={(e) => {props.enabled && props.focusChanged && props.focusChanged(true); props.enabled && props.onFocused && props.onFocused()}}
        onBlur={(e) => {props.enabled && props.focusChanged && props.focusChanged(false); props.enabled && props.onBlurred && props.onBlurred()}}
        onMouseEnter={() => props.enabled && props.hoverChanged && props.hoverChanged(true)}
        onMouseLeave={() => props.enabled && props.hoverChanged && props.hoverChanged(false)}
        onMouseDown={() => props.enabled && props.pressedChanged && props.pressedChanged(true)}
        onMouseUp={() => props.enabled && props.pressedChanged && props.pressedChanged(false)}
    >{props.label}</button>
}

var ButtonNode = {
	name: 'net.noodl.formkit.button',
	displayName:'Button',
	category: 'Form Kit',
	initialize() {
        this.props.id = this.outputs.controlId = 'input-' + Utils.guid();
        this.props.enabled = this.outputs.enabled = true;
	},
	getReactComponent() {
		return Button;
	},
	frame:{
		dimensions:{defaultSizeMode: 'contentHeight', contentLabel: 'Text'},
        margins:true,
        padding:true,
		position:true,
		align:true
    },
    inputs:{
        enabled:{type:'boolean',displayName:'Enabled',group:'General',default:true},
    },
    outputs:{
        controlId:{type:'string',displayName:'Control Id',group:'General'},
        enabled:{type:'boolean',displayName:'Enabled',group:'States'}
    },
    changed:{
        enabled(value) {
            this.props.enabled = value;
            this.setOutputs({
                enabled:value
            })
        }
    },
    inputCss:{
		color: {
			index: 24,
			group: 'Text',
			displayName: 'Color',
            type: 'color',
            default:'#FFFFFF'
		},
        backgroundColor: {
            index: 100,
            displayName: 'Background Color',
            group: 'Style',
            type: 'color',
            default: '#000000'
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
            default: 'none',
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
            default: 0,
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
	inputProps: {
        label:{type:'string',displayName:'Label',group:'General'},
        buttonType:{
            type:{name:'enum',enums:[ {label:'Button',value:'button'},{label:'Submit',value:'submit'}, {label:'Rest',value:'reset'}]},
            displayName:'Type',
            default:'button',
            group:'General'
        }
	},
	outputProps: {
        // States
        focusChanged:{type:'boolean',displayName:'Is Focused',group:'States'},
        hoverChanged:{type:'boolean',displayName:'Hover',group:'States'},
        pressedChanged:{type:'boolean',displayName:'Is Pressed',group:'States'},

        // Events
        onClick:{type:'signal',displayName:'Click',group:'Events'},
        onFocused: {type: 'signal', displayName: 'Focused', group:'Events'},
        onBlurred: {type: 'signal', displayName: 'Blurred', group:'Events'},
	}
}
Utils.addFontStyling(ButtonNode);
Utils.addVisibilityUtils(ButtonNode)
ButtonNode = Noodl.defineReactNode(ButtonNode);
export default ButtonNode;