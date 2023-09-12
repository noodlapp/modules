import Noodl from '@noodl/noodl-sdk'
import Utils from './utils'


// --------------------------------------------------------------------------------------
// Link
// --------------------------------------------------------------------------------------
function Link(props) {
	return <a className="ndl-formkit-link" {...props}>{props.children}</a>
}

var LinkNode = {
	name: 'net.noodl.formkit.link',
	displayName:'Link',
	category: 'Form Kit',
	initialize() {
	},
	getReactComponent() {
		return Link;
	},
	frame:{
		margins:true,
		position:true,
		align:true
    },
    outputs:{
    },
	inputProps: {
        href:{type:'string',displayName:'HRef',group:'General'}
	},
	outputProps: {
	}
}
Utils.addVisibilityUtils(LinkNode)
LinkNode = Noodl.defineReactNode(LinkNode);
export default LinkNode;