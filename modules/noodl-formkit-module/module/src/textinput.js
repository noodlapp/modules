import Noodl from '@noodl/noodl-sdk'
import Utils from './utils'

import {
	useEffect,
	useState,
	forwardRef,
	useRef,
	useImperativeHandle
} from 'react';

// --------------------------------------------------------------------------------------
// TextInput
// --------------------------------------------------------------------------------------
function TextInput(props, ref) {

	const [text, setText] = useState(props.text);

	const inputRef = useRef();

	useEffect(() => {
		props.textChanged && props.textChanged(text);
	}, []);

	useImperativeHandle(ref, () => ({
		setText(text) {
			setText(text);
			props.textChanged && props.textChanged(text);
		},
		focus() {
			inputRef.current.focus();
		},
		blur() {
			inputRef.current.blur();
		},
		clear() {
			setText('');
			props.textChanged && props.textChanged('');
		}
	}))

    return <input className="ndl-formkit-textinput"
                    ref = {inputRef}
				  type = "text"
				  {...props} //optional className and style, sent by Noodl
				  value = {text}
				  disabled={!props.enabled}
				  onChange = {e => {
					setText(e.target.value);
					props.textChanged && props.textChanged(e.target.value);
				}}
				onFocus={(e) => {props.enabled && props.focusChanged && props.focusChanged(true); props.enabled && props.onFocused && props.onFocused()}}
                onBlur={(e) => {props.enabled && props.focusChanged && props.focusChanged(false); props.enabled && props.onBlurred && props.onBlurred()}}
                onMouseEnter={() => props.enabled && props.hoverChanged && props.hoverChanged(true)}
                onMouseLeave={() => props.enabled && props.hoverChanged && props.hoverChanged(false)}
	/>
}

var TextInputNode = {
	name: 'net.noodl.formkit.textinput',
	displayName:'Text Input',
	category: 'Form Kit',
	getReactComponent() {
		return forwardRef(TextInput);
	},
	initialize() {
        this.props.id = this.outputs.controlId = 'input-' + Utils.guid();
        this.props.enabled = this.outputs.enabled = true;
    },
	inputs: {
		text: {
            type: 'string',
            displayName:'Text',
            group:'General'
        },
        enabled: {type:'boolean', displayName:'Enabled',group:'General', default:true},
    },
    outputs:{
        controlId:{type:'string',displayName:'Control Id',group:'General'}
    },
	changed: {
		text(newValue) {
			if (!this.isInputConnected('set')) {
				this.props.text = newValue;
				this.innerReactComponentRef && this.innerReactComponentRef.setText(this.inputs.text);
			}
        },
        enabled(value) {
            this.props.enabled = value;
            this.forceUpdate();
            this.setOutputs({
                enabled:value
            })
        }
	},
	signals: {
		focus() {
			this.innerReactComponentRef && this.innerReactComponentRef.focus();
		},
		blur() {
			this.innerReactComponentRef && this.innerReactComponentRef.blur();
		},
		set() {
			this.innerReactComponentRef && this.innerReactComponentRef.setText(this.inputs.text);
		},
		clear() {
			this.innerReactComponentRef && this.innerReactComponentRef.clear();
		}
    },
    inputCss:{
		color: {
			index: 24,
			group: 'Text',
			displayName: 'Color',
            type: 'color',
            default:'#000000'
		},
        backgroundColor: {
            index: 100,
            displayName: 'Background Color',
            group: 'Style',
            type: 'color',
            default: 'transparent'
        },
    },
	inputProps:{
        type: {
            displayName: 'Type',
            group: 'Text',
            index: 19,
            type: {
                name: 'enum',
                enums: [
                    {label: 'Text', value: 'text'},
                    {label: 'Text Area', value: 'textArea'},
                    {label: 'Email', value: 'email'},
                    {label: 'Number', value: 'number'},
                    {label: 'Password', value: 'password'},
                    {label: 'URL', value: 'url'},
                ]
            },
            default: 'text'
        },
        placeholder: {
            index: 22,
            group: 'Text',
            displayName: 'Placeholder',
            default: '',
            type: {
                name: 'string'
            }
        },
	},
	outputProps: {
		textChanged: {
			type: 'string',
			displayName: 'Text',
			group:'General'
        },
        
        // States
        focusChanged: {type: 'boolean', displayName: 'Is Focused', group:'States'},
        hoverChanged: {type: 'boolean', displayName: 'Hover', group:'States'},

        // Events
        onFocused: {type: 'signal', displayName: 'Focused', group:'Events'},
        onBlurred: {type: 'signal', displayName: 'Blurred', group:'Events'},
	},
	frame:{
		dimensions:{defaultSizeMode: 'contentSize', contentLabel: 'Text'},
		margins:true,
		padding:true,
		position:true,
		align:true
	},
}
Utils.addFontStyling(TextInputNode)
Utils.addVisibilityUtils(TextInputNode)
TextInputNode = Noodl.defineReactNode(TextInputNode)
export default TextInputNode