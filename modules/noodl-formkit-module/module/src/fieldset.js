import Noodl from '@noodl/noodl-sdk'

// --------------------------------------------------------------------------------------
// FieldSet
// --------------------------------------------------------------------------------------
function FieldSet(props) {
	return <fieldset className="ndl-formkit-fieldset" {...props}>{props.children}</fieldset>
}

var FieldSetNode = {
	name: 'net.noodl.formkit.fieldset',
	displayName:'Field Set',
	category: 'Form Kit',
	initialize() {
	},
	getReactComponent() {
		return FieldSet;
	},
	inputProps: {
	},
	outputProps: {
	}
}
FieldSetNode = Noodl.defineReactNode(FieldSetNode);
export default FieldSetNode;