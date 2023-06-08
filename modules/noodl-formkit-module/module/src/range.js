import Noodl from '@noodl/noodl-sdk';
import Utils from './utils';

import {
	useEffect,
	useState,
} from 'react';

function _styleTemplate(_class,props) {
    return `
    .${_class}::-webkit-slider-thumb {
        width: ${props.thumbWidth};
        height: ${props.thumbHeight};
        background: ${props.thumbColor};
        border: 0;
        border-radius: ${props.thumbRadius};
        cursor: pointer;
        -webkit-appearance: none;
        margin-top:calc(${props.trackHeight}/2 - ${props.thumbHeight}/2);
    }
    
    .${_class}::-moz-range-thumb {
        width: ${props.thumbWidth};
        height: ${props.thumbHeight};
        background: ${props.thumbColor};
        border: none;
        border-radius: ${props.thumbRadius};
        cursor: pointer;
    }
    
    .${_class}::-ms-thumb {
        width: ${props.thumbWidth};
        height: ${props.thumbHeight};
        background: ${props.thumbColor};
        border: none;
        border-radius: ${props.thumbRadius};
        cursor: pointer;
        margin-top: 0px;
    }
    
    .${_class}::-webkit-slider-runnable-track {
        background: ${props.trackColor};
        border: none;
        width: 100%;
        height: ${props.trackHeight};
        cursor: pointer;
        margin-top:0px;
    }
    
    .${_class}:focus::-webkit-slider-runnable-track {
        background: ${props.trackColor};
    }
    
    .${_class}::-moz-range-track {
        background: ${props.trackColor};
        border: none;
        width: 100%;
        height: ${props.trackHeight};
        cursor: pointer;
    }
    
    .${_class}::-ms-track {
        background: transparent;
        border:none;
        color: transparent;
        width: 100%;
        height: ${props.trackHeight};
        cursor: pointer;
    }
    
    .${_class}::-ms-fill-lower {
        background: ${props.trackColor};
        border: none;
    }
    .${_class}::-ms-fill-upper {
        background: ${props.trackColor};
        border: none;
    }    
    `;
}

// --------------------------------------------------------------------------------------
// Range
// --------------------------------------------------------------------------------------
function Range(props) {
    const [value, setValue] = useState(props.value);

    // Report initial values when mounted
	useEffect(() => {
		setValue(props.value);
        props.valueChanged && props.valueChanged(props.value);

        props.focusChanged && props.focusChanged(false);
        props.hoverChanged && props.hoverChanged(false);
        props.pressedChanged && props.pressedChanged(false);
	}, []);

	useEffect(() => {
			setValue(props.value);
			props.valueChanged && props.valueChanged(props.value);
    }, [props.value]);

    const tagProps = {id:props.id,min:props.min,max:props.max,step:props.step,style:props.style};

    Utils.updateStylesForClass("ndl-formkit-range-"+props._nodeId,props,_styleTemplate);
    return <input className={"ndl-formkit-range-"+props._nodeId + " ndl-formkit-range"} type="range" {...tagProps} value={value} disabled={!props.enabled} 
        onChange = {e => {
            setValue(e.target.value);
            props.valueChanged && props.valueChanged(e.target.value);
        }}
        onFocus={(e) => {props.enabled && props.focusChanged && props.focusChanged(true); props.enabled && props.onFocused && props.onFocused()}}
        onBlur={(e) => {props.enabled && props.focusChanged && props.focusChanged(false); props.enabled && props.onBlurred && props.onBlurred()}}
        onMouseEnter={() => props.enabled && props.hoverChanged && props.hoverChanged(true)}
        onMouseLeave={() => props.enabled && props.hoverChanged && props.hoverChanged(false)}
        onMouseDown={() => props.enabled && props.pressedChanged && props.pressedChanged(true)}
        onMouseUp={() => props.enabled && props.pressedChanged && props.pressedChanged(false)}
        ></input>;
}

var RangeNode = {
	name: 'net.noodl.formkit.range',
	displayName:'Range',
	category: 'Form Kit',
	initialize() {
        this.props.sizeMode = 'explicit';
        this.props.id = this.outputs.controlId = 'input-' + Utils.guid();
        this.props.enabled = this.outputs.enabled = (this.inputs.enabled===undefined)?true:this.inputs.enabled;
        this.outputs.value = this.props.value = this.props.min;
        this.props._nodeId = this.id;
        this.props.valueChanged = (value) => {
            const min = this.props.min
            const max = this.props.max
            const valuePercent = Math.floor( (value - min) / (max - min) * 100 )
            this.setOutputs({
                value:value,
                valuePercent:valuePercent
            })
        }
        this.props.valueChanged(this.props.value); // Update initial values
	},
	getReactComponent() {
		return Range
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
        value: {type:'number', displayName:'Value',group:'General'},
        valuePercent: {type:'number', displayName:'Value Percent',group:'General'},
    },
	inputProps: {
        value: {type:'number', displayName:'Value',group:'General'},
        min: {type:'number', displayName:'Min',group:'General',default:0},
        max: {type:'number', displayName:'Max',group:'General',default:100},
        step: {type:'number', displayName:'Step',group:'General',default:1},
		width: {
			index: 11,
			group: 'Dimensions',
			displayName: 'Width',
			type: {
				name: "number",
				units: ["%", "px", 'vw'],
				defaultUnit: "%"
			},
			default: 100,
		},
		height: {
			index: 12,
			group: 'Dimensions',
			displayName: 'Height',
			type: {
				name: "number",
				units: ["%", "px", 'vh'],
				defaultUnit: "%"
			},
			default: 100
        },

        // Styles
        thumbWidth: {
			group: 'Thumb Style',
			displayName: 'Width',
			type: {
				name: "number",
				units: ["px", 'vw','%'],
                defaultUnit: "px",
                allowEditOnly:true,
			},
			default: 16,
        },
        thumbHeight: {
			group: 'Thumb Style',
			displayName: 'Height',
			type: {
				name: "number",
				units: ["px", 'vh','%'],
                defaultUnit: "px",
                allowEditOnly:true,
			},
			default: 16,
        },
        thumbRadius: {
			group: 'Thumb Style',
			displayName: 'Radius',
			type: {
				name: "number",
				units: ["px",'%'],
                defaultUnit: "px",
                allowEditOnly:true,
			},
			default: 8,
        },
        thumbColor: {
			group: 'Thumb Style',
			displayName: 'Color',
			type: {name:'color',allowEditOnly:true},
			default: '#000000',
        },
        trackHeight: {
			group: 'Track Style',
			displayName: 'Height',
			type: {
				name: "number",
				units: ["px", 'vh','%'],
                defaultUnit: "px",
                allowEditOnly:true,
			},
			default: 6,
        },
        trackColor: {
			group: 'Thumb Style',
			displayName: 'Color',
			type: {name:'color',allowEditOnly:true},
			default: '#f0f0f0',
        },        
	},
	outputProps: {
        // States
        focusChanged: {type: 'boolean', displayName: 'Focused', group:'States'},
        hoverChanged: {type: 'boolean', displayName: 'Hover', group:'States'},
        pressedChanged: {type: 'boolean', displayName: 'Pressed', group:'States'},

        // Events
        onFocused: {type: 'signal', displayName: 'Focused', group:'Events'},
        onBlurred: {type: 'signal', displayName: 'Blurred', group:'Events'},
	}
}

Utils.addVisibilityUtils(RangeNode)
RangeNode = Noodl.defineReactNode(RangeNode);

export default RangeNode;

