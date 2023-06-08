import Noodl from '@noodl/noodl-sdk'
import Utils from './utils'
import RadioButtonContext from './radiobuttoncontext';

import {
	useEffect,
    useState,
    useContext,
} from 'react';

// --------------------------------------------------------------------------------------
// RadioButtonGroup
// --------------------------------------------------------------------------------------
function RadioButtonGroup(props) {
    const [selected, setSelected] = useState(props.value)
    const context = {
        selected:selected,
        name:props.name,
        checkedChanged:(value) => {
            setSelected(value)
            props.valueChanged && props.valueChanged(value);
        }
    }

    useEffect(() => {
        setSelected(props.value);
        props.valueChanged && props.valueChanged(props.value);
    }, [props.value]);

	return (<RadioButtonContext.Provider value={context}>
        <div className="ndl-formkit-radiobuttongroup" {...props}
        >{props.children}</div>
    </RadioButtonContext.Provider>)
}

var RadioButtonGroupNode = {
	name: 'net.noodl.formkit.radiobuttongroup',
	displayName:'Radio Button Group',
	category: 'Form Kit',
	initialize() {
        this.props.name = 'radio-' + Utils.guid()
	},
	getReactComponent() {
		return RadioButtonGroup;
	},
	inputProps: {
        value:{type:'string',displayName:'Value',group:'General'}
	},
	outputProps: {
        valueChanged:{type:'string',displayName:'Value',group:'General'}
	}
}
RadioButtonGroupNode = Noodl.defineReactNode(RadioButtonGroupNode);
export default RadioButtonGroupNode;