import Noodl from '@noodl/noodl-sdk'

// --------------------------------------------------------------------------------------
// Form
// --------------------------------------------------------------------------------------
function Form(props) {
	return <form className="ndl-formkit-form" {...props}
        onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit&&props.onSubmit();
        }}
    >{props.children}</form>
}

var FormNode = {
	name: 'net.noodl.formkit.form',
	displayName:'Form',
	category: 'Form Kit',
	initialize() {
	},
	getReactComponent() {
		return Form;
	},
	inputProps: {
	},
	outputProps: {
        onSubmit:{type:'signal',displayName:'Submit',group:'Events'}
	}
}
FormNode = Noodl.defineReactNode(FormNode);
export default FormNode;