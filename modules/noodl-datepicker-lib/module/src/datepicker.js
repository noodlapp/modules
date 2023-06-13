import React,{Component} from 'react';
import Noodl from '@noodl/noodl-sdk';
import { Datepicker } from 'vanillajs-datepicker';
import {isMobile} from 'react-device-detect';

import './datepicker.css'

class DatePicker extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if(this.calendarRoot !== undefined) {
            this.datepicker = new Datepicker(this.calendarRoot, {
            })
            if(this.props.value) {
                this.datepicker.setDate(this.props.value);
            }
            //this.datepicker.pickerElement.id = "ndl-picker-"+this.props._nodeId;
            this.calendarRoot.addEventListener('changeDate',() => {
                this.onDateChanged(this.datepicker.getDate());
            })
        }
    }

    componentWillUnmount() {
        if(this.datepicker !== undefined) {
            this.datepicker.destroy();
        }
    }

    onDateChanged(date) {
        if(typeof date === 'string') date = new Date(date);
        this.props.onDateChanged&&this.props.onDateChanged(date);
    }

    render() {
        const props = this.props;

        const tagProps = {id:props.id,style:props.style};

        const events = {
            // Click
            onClick: (e) => {props.enabled && props.onClick && props.onClick()},

            // Focus
            onFocus: (e) => {props.enabled && props.focusState && props.focusState(true); props.enabled && props.onFocus && props.onFocus()},
            onBlur: (e) => {props.enabled && props.focusState && props.focusState(false); props.enabled && props.onBlur && props.onBlur()},

            // Hover
            onMouseOver: (e) => {props.enabled && props.hoverState && props.hoverState(true); props.enabled && props.hoverStart && props.hoverStart()},
            onMouseLeave: (e) => {props.enabled && props.hoverState && props.hoverState(false); props.enabled && props.hoverEnd && props.hoverEnd()},

            // Press
            onMouseDown: (e) => {props.enabled && props.pressedState && props.pressedState(true); props.enabled && props.pointerDown && props.pointerDown()},
            onMouseUp: (e) => {props.enabled && props.pressedState && props.pressedState(false); props.enabled && props.pointerUp && props.pointerUp()},  
            onTouchStart: (e) => {props.enabled && props.pressedState && props.pressedState(true); props.enabled && props.pointerDown && props.pointerDown()},
            onTouchEnd: (e) => {props.enabled && props.pressedState && props.pressedState(false); props.enabled && props.pointerUp && props.pointerUp()},    
            onTouchCancel: (e) => {props.enabled && props.pressedState && props.pressedState(false); props.enabled && props.pointerUp && props.pointerUp()},                    
        }

        if(this.datepicker && props.value) { // Change date on datepicker if visible
            this.datepicker.setDate(props.value);
        }

	    return <div {...tagProps} className="ndl-datepicker-button" onClick={() => { if(this.mobileCalendarRoot !== undefined) this.mobileCalendarRoot.focus() }}>
            {this.props.showIcon?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={props.iconColor} width="24px" height="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 3h-3V1h-2v2H7V1H5v2H2v20h20V3zm-2 18H4V8h16v13z"/></svg>:null}
            {isMobile
               ? <input type="date" class="ndl-datepicker-native-input" ref={(r) => {this.mobileCalendarRoot = r}} value={props.value} onChange={(e) => { this.onDateChanged(e.target.value) }} {...events}></input>
               : <input className="ndl-datepicker-native-input" type="text" ref={(r) => {this.calendarRoot = r}} value={props.value} {...events}></input> 
            }
        </div>
    }
}   

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000) .toString(16) .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4() + s4();
}

const DatePickerNode = Noodl.defineReactNode({
	name: 'Date Picker Button',
	category: 'Visuals',
    docs:'https://docs.noodl.net/#/modules/datepicker-button/datepicker-button',
    initialize() {
        this.props.sizeMode = 'explicit';
        this.props.enabled = this.outputs.enabled = (this.inputs.enabled===undefined)?true:this.inputs.enabled;
        this.props.id = this.outputs.controlId = 'input-' + guid();
        this.props._nodeId = this.id;
        this.props.onDateChanged = (date) => {
            this.outputs.value = date;
            this.flagOutputDirty('value');
            this.sendSignalOnOutput('onChange');
        }
    },
    frame:{
		margins:true,
		position:true,
		align:true
    },
	getReactComponent() {
		return DatePicker;
	},
    inputs:{
        enabled:{
            type:'boolean',
            displayName:'Enabled',
            group:'General'
        },
        value:{
            type:'date',
            displayName:'Value',
            group:'General'
        },
        visible: {
            index: 210,
            displayName: 'Visible',
            group: 'Style',
            default: true,
            type: 'boolean'
        },
        zIndex: {
            index: 211,
            displayName: 'zIndex',
            group: 'Style',
            type: 'number'
        }
    },
    changed:{
        enabled(value) {
            const changed = value !== this.props.enabled;
            this.props.enabled = value;

            if(changed) {
                this.setOutputs({
                    enabled:value
                })
                this.forceUpdate()
            }
        },
        value(newDate) {
            if(typeof newDate === 'string') newDate = new Date(newDate);
            const changed = newDate !== this.value;

            if(changed) {
                this.props.value = newDate;
                this.setOutputs({
                    value:newDate
                })
                this.forceUpdate()
            }
        },
        visible(value) {
            if (value) {
                this.removeStyle(['visibility']);
            }
            else {
                this.setStyle({ visibility: 'hidden' });
            }
        },
        zIndex(value) {
            if (value === undefined) {
                this.removeStyle(['zIndex']);
            }
            else {
                this.setStyle({ zIndex: Number(value) });
            }
        }
    },
    outputs:{
        controlId:{type:'string',displayName:'Control Id',group:'General'},
        enabled: {type:'boolean', displayName:'Enabled',group:'States'},
        value:{
            type:'date',
            displayName:'Value',
            group:'States'
        },
        onChange:{
            type:'signal',
            displayName:'Change',
            group:'Events'
        }
    },
    inputCss:{
        opacity: {
            index: 200,
            group: 'Style',
            displayName: 'Opacity',
            type: 'number',
            default: 1
        },

        backgroundColor: {
            index: 100,
            displayName: 'Background Color',
            group: 'Style',
            type: 'color',
            default: '#000000'
        },

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
            default: 0,
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
            default: 'none',
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
            default: 0,
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
	inputProps: {
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
        showIcon:{
            type:'boolean',
            group:'Style',
            displayName:'Show Icon',
            default:true
        },
        iconColor: {
			index: 24,
			group: 'Style',
			displayName: 'Icon Color',
            type: 'color',
            default:'#FFFFFF'
		},
	},
	outputProps: {
        // Click
        onClick:{type:'signal',group:'Events',displayName:'Click'},

        // Focus
        focusState:{type:'boolean',group:'States',displayName:'Focused'},
        onFocus:{type:'signal',group:'Events',displayName:'Focused'},
        onBlur:{type:'signal',group:'Events',displayName:'Blurred'},

        // Hover
        hoverState:{type:'boolean',group:'States',displayName:'Hover'},
        hoverStart:{type:'signal',group:'Events',displayName:'Hover Start'},
        hoverEnd:{type:'signal',group:'Events',displayName:'Hover End'},   
        
        // Press
        pressedState:{type:'boolean',group:'States',displayName:'Pressed'},
        pointerDown:{type:'signal',group:'Events',displayName:'Pointer Down'},
        pointerUp:{type:'signal',group:'Events',displayName:'Pointer Up'},           
	}
})

export default DatePickerNode;