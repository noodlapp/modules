import Noodl from '@noodl/noodl-sdk';
import Utils from './utils';

import {
	useEffect,
	useState,
} from 'react';

function _styleTemplate(_class,props) {
    return `
    .${_class}:checked {
        background-color: ${props.checkedBackgroundColor};
    }  
    `;
}

// --------------------------------------------------------------------------------------
// CheckBox
// --------------------------------------------------------------------------------------
function CheckBox(props) {
    const [checked, setChecked] = useState(props.checked);

    // Report initial values when mounted
	useEffect(() => {
		setChecked(!!props.checked);
        props.checkedChanged && props.checkedChanged(!!props.checked);

        props.focusChanged && props.focusChanged(false);
        props.hoverChanged && props.hoverChanged(false);
	}, []);

	useEffect(() => {
			setChecked(props.checked);
			props.checkedChanged && props.checkedChanged(props.checked);
    }, [props.checked]);

    const tagProps = {id:props.id,style:props.style};

    Utils.updateStylesForClass("ndl-formkit-checkbox-"+props._nodeId,{checkedBackgroundColor:props.checkedBackgroundColor},_styleTemplate);
    return <input className={"ndl-formkit-checkbox-"+props._nodeId + " ndl-formkit-checkbox"} type="checkbox" {...tagProps} checked={checked} disabled={!props.enabled} 
        onChange = {e => {
            setChecked(e.target.checked);
            props.checkedChanged && props.checkedChanged(e.target.checked);
        }}
        onFocus={(e) => {props.enabled && props.focusChanged && props.focusChanged(true); props.enabled && props.onFocused && props.onFocused()}}
        onBlur={(e) => {props.enabled && props.focusChanged && props.focusChanged(false); props.enabled && props.onBlurred && props.onBlurred()}}
        onMouseEnter={() => props.enabled && props.hoverChanged && props.hoverChanged(true)}
        onMouseLeave={() => props.enabled && props.hoverChanged && props.hoverChanged(false)}
        ></input>;
}

var CheckBoxNode = {
	name: 'net.noodl.formkit.checkbox',
	displayName:'Checkbox',
	category: 'Form Kit',
	initialize() {
        this.props.sizeMode = 'explicit';
        this.props.id = this.outputs.controlId = 'input-' + Utils.guid();
        this.props.enabled = this.outputs.enabled = (this.inputs.enabled===undefined)?true:this.inputs.enabled;
        this.props.checked = this.outputs.checked = (this.inputs.checked===undefined)?false:this.inputs.checked;
        this.props._nodeId = this.id;
        this.props.checkedChanged = (checked) => {
            this.setOutputs({
                checked:checked
            })
        }
	},
	getReactComponent() {
		return CheckBox
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
            this.forceUpdate()
        }
    },
    outputs:{
        controlId:{type:'string',displayName:'Control Id',group:'General'},
        enabled: {type:'boolean', displayName:'Enabled',group:'States'},
        checked: {type:'boolean', displayName:'Checked',group:'States'},
    },
	inputProps: {
		checked: {type:'boolean', displayName:'Checked',group:'General'},
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
    },
	outputProps: {
        // States
        focusChanged: {type: 'boolean', displayName: 'Is Focused', group:'States'},
        hoverChanged: {type: 'boolean', displayName: 'Hover', group:'States'},
      //  checkedChanged: {type: 'boolean', displayName: 'Checked', group:'States'}

      // Events
      onFocused: {type: 'signal', displayName: 'Focused', group:'Events'},
      onBlurred: {type: 'signal', displayName: 'Blurred', group:'Events'},
	}
}

Utils.addVisibilityUtils(CheckBoxNode)
CheckBoxNode = Noodl.defineReactNode(CheckBoxNode);

export default CheckBoxNode;

