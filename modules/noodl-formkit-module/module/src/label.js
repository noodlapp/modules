import Noodl from '@noodl/noodl-sdk'
import Utils from './utils'


// --------------------------------------------------------------------------------------
// Label
// --------------------------------------------------------------------------------------
function Label(props) {
	return <label className="ndl-formkit-label" {...props}>{props.text}</label>
}

var LabelNode = {
	name: 'net.noodl.formkit.label',
	displayName:'Label',
	category: 'Form Kit',
	initialize() {
        this.props.id = this.outputs.controlId = 'input-' + Utils.guid();
	},
	getReactComponent() {
		return Label;
	},
	frame:{
		dimensions:{defaultSizeMode: 'contentHeight', contentLabel: 'Text'},
		margins:true,
		position:true,
		align:true
    },
    outputs:{
        controlId:{type:'string',displayName:'Control Id',group:'General'}
    },
	inputProps: {
		for:{type:'string',displayName:'For',group:'General'},
		text:{type:'string',displayName:'Text',group:'General'},
	},
	outputProps: {
	}
}
Utils.addFontStyling(LabelNode);
Utils.addVisibilityUtils(LabelNode)
LabelNode = Noodl.defineReactNode(LabelNode);
export default LabelNode;