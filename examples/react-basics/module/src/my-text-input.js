const Noodl = require('@noodl/noodl-sdk');
import {
	useEffect,
	useState,
	forwardRef,
	useRef,
	useImperativeHandle
} from 'react';

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

	return <input ref = {inputRef}
				  type = "text"
				  {...props} //optional className and style, sent by Noodl
				  value = {text}
				  onChange = {e => {
					setText(e.target.value);
					props.textChanged && props.textChanged(e.target.value);
				}}
	/>
}

const TextInputNode = Noodl.defineReactNode({
	name: 'My Text Input',
	category: 'Tutorial',
	getReactComponent() {
		return forwardRef(TextInput);
	},
	initialize() {},
	inputs: {
		text: {
			type: 'string'
		}
	},
	changed: {
		text(newValue) {
			if (!this.isInputConnected('set')) {
				this.props.text = newValue;
				this.innerReactComponentRef && this.innerReactComponentRef.setText(this.inputs.text);
			}
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
	outputProps: {
		textChanged: {
			type: 'string',
			displayName: 'Text'
		}
	}
})


Noodl.defineModule({
	reactNodes: [
		TextInputNode
	],
	nodes: []
});