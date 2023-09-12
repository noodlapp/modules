import Noodl from '@noodl/noodl-sdk';
import Utils from './utils';
import RadioButtonContext from './radiobuttoncontext';

import {
	useEffect,
    useState,
    useContext,
} from 'react';

function _styleTemplate(_class,props) {
    return `
    .${_class}:checked {
        background-color: ${props.checkedBackgroundColor};
    }  
    `;
}

// --------------------------------------------------------------------------------------
// RadioButton
// --------------------------------------------------------------------------------------
function RadioButton(props) {
    const radioButtonGroup = useContext(RadioButtonContext)

    // On mount
	useEffect(() => {
        props.focusChanged && props.focusChanged(false);
        props.hoverChanged && props.hoverChanged(false);
    }, []);

    const tagProps = {id:props.id,style:props.style};

    props.checkedChanged && props.checkedChanged(radioButtonGroup?(radioButtonGroup.selected === props.value):false);

    Utils.updateStylesForClass("ndl-formkit-radiobutton-"+props._nodeId,{checkedBackgroundColor:props.checkedBackgroundColor},_styleTemplate);
    return <input className={"ndl-formkit-radiobutton-"+props._nodeId+" ndl-formkit-radiobutton"} type="radio" name={radioButtonGroup?radioButtonGroup.name:undefined} {...tagProps} disabled={!props.enabled} 
        checked={radioButtonGroup?(radioButtonGroup.selected === props.value):false}
        onChange = {e => {
            radioButtonGroup && radioButtonGroup.checkedChanged && radioButtonGroup.checkedChanged(props.value);
        }}
        onFocus={(e) => {props.enabled && props.focusChanged && props.focusChanged(true); props.enabled && props.onFocused && props.onFocused()}}
        onBlur={(e) => {props.enabled && props.focusChanged && props.focusChanged(false); props.enabled && props.onBlurred && props.onBlurred()}}
        onMouseEnter={() => props.enabled && props.hoverChanged && props.hoverChanged(true)}
        onMouseLeave={() => props.enabled && props.hoverChanged && props.hoverChanged(false)}
        ></input>;
}

var RadioButtonNode = {
	name: 'net.noodl.formkit.radiobutton',
	displayName:'Radio Button',
	category: 'Form Kit',
	initialize() {
        this.props.sizeMode = 'explicit';
        this.props.id = this.outputs.controlId = 'input-' + Utils.guid();
        this.props.enabled = this.outputs.enabled = true;
        this.props._nodeId = this.id;
        this.props.checkedChanged = (value) => {
            this.setOutputs({
                checked:value
            })
        }
	},
	getReactComponent() {
		return RadioButton;
	},
	frame:{
		margins:true,
		position:true,
		align:true
    },
    inputs:{
        enabled: {type:'boolean', displayName:'Enabled',group:'General', default:true},
    },
    changed:{
        enabled(value) {
            this.props.enabled = value;
            this.setOutputs({
                enabled:value
            })
        }
    },
    outputs:{
        controlId:{type:'string',displayName:'Control Id',group:'General'},
        enabled: {type:'boolean', displayName:'Enabled',group:'States'},
        checked: {type:'boolean', displayName:'Checked',group:'States'},
    },
	inputProps: {
      //  checked: {type:'boolean', displayName:'Checked',group:'General'},
        value: {type:'string', displayName:'Value',group:'General'},
		width: {
			index: 11,
			group: 'Dimensions',
			displayName: 'Width',
			type: {
				name: "number",
				units: ["%", "px", 'vw'],
				defaultUnit: "px"
			},
			default: 32,
		},
		height: {
			index: 12,
			group: 'Dimensions',
			displayName: 'Height',
			type: {
				name: "number",
				units: ["%", "px", 'vh'],
				defaultUnit: "px"
			},
			default: 32
        },
        
        // Styles
        checkedBackgroundColor: {
            displayName: 'Background color',
            group: 'Checked Style',
            type: {name:'color',allowEditOnly:true},
            default: '#000000'
        },
    },
    inputCss:{
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
            default: 16,
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
        // States
		//checkedChanged: {type: 'boolean', displayName: 'Checked', group:'States'},
        focusChanged: {type: 'boolean', displayName: 'Focused', group:'States'},
        hoverChanged: {type: 'boolean', displayName: 'Hover', group:'States'},

        // Events
        onFocused: {type: 'signal', displayName: 'Focused', group:'Events'},
        onBlurred: {type: 'signal', displayName: 'Blurred', group:'Events'},
	}
}

Utils.addVisibilityUtils(RadioButtonNode)
RadioButtonNode = Noodl.defineReactNode(RadioButtonNode);

export default RadioButtonNode;

