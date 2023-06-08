import Noodl from '@noodl/noodl-sdk'
import * as yup from 'yup'

const _schemaFuncs = {}; // Cache for schema functions, optimization

function _createSignal(args) {

    var currentValue = false;

    return function (value) {
        value = value ? true : false;
        //value changed from false to true
        if (value && currentValue === false) {
            args.valueChangedToTrue.call(this);
        }
        currentValue = value;
    };
}

const ValidateNode = Noodl.defineNode({
	category:'Form Kit',
	name:'noodl.net.formkit.validate',
	displayName:'Validate',
	color:'green',
	inputs:{
		Schema:{
			group:'General',
			type:{name:'string',codeeditor:'javascript',allowEditOnly:true}
		},
		Enabled:{
			group:'General',
			type:'boolean',
			default:true,
		}
	},
	outputs:{
		IsValid:{
			type:'boolean',
			displayName:'Is Valid'
		}
	},
	initialize:function() {
		this.propertyValues = {}
		this.propertyOutputValues = {}
		this.errors = {}
        this.hasError = {}
        this.propertyDisabled = {}
	},
	changed:{
		Schema:function(script) {
			if(_schemaFuncs[script] === undefined) {
				try {
					_schemaFuncs[script] = new Function('schema', 'string', 'object','number','date','ref','Yup', 'return function() {' + script + '}' )
				}
				catch(e) {
					console.log(e);
				}
			}
			this.schemaFunc = _schemaFuncs[script]((s) => {this.schema = s},yup.string,yup.object,yup.number,yup.date,yup.ref,yup); // This creates a new closure for the schema function
			this.scheduleValidate();
		},
		Enabled:function() {
			this.scheduleValidate();
		}
	},
	methods:{
		scheduleValidate:function() {
			if(this.validateScheduled) return;
			this.validateScheduled = true;
			this.scheduleAfterInputsHaveUpdated(() => {
				this.validateScheduled = false;
				this.validate();
			})
		},
		validate:function() {
			if(this.schemaFunc !== undefined) {
				this.schema = undefined;
				if(this.context.editorConnection !== undefined) {
					this.context.editorConnection.clearWarning(this.nodeScope.componentOwner.name, this.id, 'validate-schema-run-warning'); // Clear editor warnings
				}

				try {
					this.schemaFunc();
				}
				catch(e) {
					console.log('Validate schema run error',e); // Error running schema script
					if(this.context.editorConnection !== undefined) {
						this.context.editorConnection.sendWarning(this.nodeScope.componentOwner.name, this.id, 'validate-schema-run-warning', {
							message: e.message
						})
					}
				}

				if(this.inputs.Enabled === false) {
					// If the node is disabled, do not output any error messages, but otherwise nothing is valid
					for(var key in this.schema) {
						this.hasError[key] = false;
						this.errors[key] = "";
						if(this.hasOutput('err-' + key)) this.flagOutputDirty('err-' + key);
						if(this.hasOutput('haserr-' + key)) this.flagOutputDirty('haserr-' + key);
					}
					this.outputs.IsValid = false;
					this.flagOutputDirty('IsValid');
					return;
				}

				if(this.schema !== undefined) {
					yup.object().shape(this.schema).validate(this.propertyValues,{abortEarly:false}).then((cast) => {
                        // The object was successfully validated

						for(var key in this.schema) { // Clear errors
							this.hasError[key] = false;
							this.errors[key] = "";
							if(this.hasOutput('err-' + key)) this.flagOutputDirty('err-' + key);
							if(this.hasOutput('haserr-' + key)) this.flagOutputDirty('haserr-' + key);
						}
						this.outputs.IsValid = true;
						this.flagOutputDirty('IsValid');

                        // Output properties 
						for(var key in cast) {
							this.propertyOutputValues[key] = cast[key];
							if(this.hasOutput('prop-' + key)) this.flagOutputDirty('prop-' + key);
						}
					})
					.catch((errs) => {
                        // There was an error when validating
						this.outputs.IsValid = false;
						this.flagOutputDirty('IsValid');

						for(var key in this.schema) {
							this.hasError[key] = false;
							this.errors[key] = "";
						}

						for(var prop in errs.inner) {
                            var err = errs.inner[prop];
                            
                            if(this.propertyDisabled[err.path]) continue; // Don't output errors for disabled properties

							this.errors[err.path] = err.errors.join(' ');
							this.hasError[err.path] = true;
						}

						for(var key in this.schema) {
							if(this.hasOutput('err-' + key)) this.flagOutputDirty('err-' + key);

							if(this.hasOutput('haserr-' + key)) this.flagOutputDirty('haserr-' + key);
						}

					})
				}
			}
		},
		setPropertyValue:function(name,value) {
			this.propertyValues[name] = value;
			this.scheduleValidate();
		},
		getPropertyValue:function(name) {
			return this.propertyOutputValues[name];
        },
        setPropertyEnabled:function(name,value) {
            this.propertyDisabled[name] = (value==undefined)?false:(!value);
            this.scheduleValidate();
        },
        enableProperty:function(name) {
            this.propertyDisabled[name] = false;
            this.scheduleValidate();
        },
        disableProperty:function(name) {
            this.propertyDisabled[name] = true;
            this.scheduleValidate();
        },        
		getError:function(name) {
			return this.errors[name];
		},
		getHasError:function(name) {
			return this.hasError[name];
		},
	/*	getIsValid:function(name) {
			return !this.hasError[name];
		},*/
		registerInputIfNeeded: function (name) {
			if (this.hasInput(name)) {
				return;
			}

			if(name.startsWith('prop-')) this.registerInput(name, {
				set: this.setPropertyValue.bind(this, name.substring('prop-'.length))
            })
            
            if(name.startsWith('enabled-')) this.registerInput(name, {
				set: this.setPropertyEnabled.bind(this, name.substring('enabled-'.length))
            })
            
            if (name.startsWith('enable-')) return this.registerInput(name, {
                set: _createSignal({
                    valueChangedToTrue: this.enableProperty.bind(this, name.substring('enable-'.length))
                })
            })

            if (name.startsWith('disable-')) return this.registerInput(name, {
                set: _createSignal({
                    valueChangedToTrue: this.disableProperty.bind(this, name.substring('disable-'.length))
                })
            })
		},
		registerOutputIfNeeded: function (name) {
			if (this.hasOutput(name)) {
				return;
			}

			if(name.startsWith('prop-')) this.registerOutput(name, {
				getter: this.getPropertyValue.bind(this, name.substring('prop-'.length))
			})

			if(name.startsWith('err-')) this.registerOutput(name, {
				getter: this.getError.bind(this, name.substring('err-'.length))
			})	
			
			if(name.startsWith('haserr-')) this.registerOutput(name, {
				getter: this.getHasError.bind(this, name.substring('haserr-'.length))
			})	
		},
	},
	setup: function (context, graphModel) {
		if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
			return;
		}

		function _managePortsForNode(node) {
            function _updatePorts() {
				var ports = [];

				if(node.parameters['Schema'] !== undefined) {
					// We have a schema script, extract ports from the script
					context.editorConnection.clearWarning(node.component.name, node.id, 'validate-schema-parse-warning'); // Clear editor warnings
					var schemaScript;
					try {
						schemaScript = new Function('schema', 'string', 'object','number','date','ref','Yup', node.parameters['Schema']);
					}
					catch (e) {
						console.log('Validate schema parser error',e); // Error in schema script

						// Send warning to editor
						context.editorConnection.sendWarning(node.component.name, node.id, 'validate-schema-parse-warning', {
							message: e.message
						})
					}

					if(schemaScript !== undefined) {
						var schema;
						try {
							schemaScript(function(s) {
								schema = s;
							},yup.string,yup.object,yup.number,yup.date,yup.ref,yup);
						}
						catch(e) {
							console.log(e); // Error running schema script
						}

						if(schema !== undefined) {

							for(let key in schema) { // Each key in the schema will generate a port
								ports.push({
									name:'prop-'+key,
									displayName:key,
									group:'Properties',
									type:'*',
									plug:'input/output',
								})

								ports.push({ // An error messsage output for each property
									name:'err-'+key,
									displayName:key,
									editorName:key + ' Error',
									group:'Errors',
									type:'string',
									plug:'output',
								})							

								ports.push({ // An is valid output for each property
									name:'haserr-'+key,
									editorName:key + ' Has Error',
									displayName:key,
									group:'Has Error',
									type:'boolean',
									plug:'output',
                                })	
                                
                                ports.push({ // Boolean if a certain property is valid or not
									name:'enabled-'+key,
									editorName:key + ' Enabled',
									displayName:key,
									group:'Property Enabled',
									type:'boolean',
                                    plug:'input',
                                    default:true,
                                })
                                
                                ports.push({ // Signal to enable a certain property
									name:'enable-'+key,
									editorName:'Enable ' + key,
									displayName:'Enable ' + key,
									group:'Actions',
									type:'signal',
                                    plug:'input',
                                })
                                
                                ports.push({ // Signal to disable a certain property
									name:'disable-'+key,
									editorName:'Disable ' + key,
									displayName:'Disable ' + key,
									group:'Actions',
									type:'signal',
                                    plug:'input',
								})
							}

						}
					}
				}

				context.editorConnection.sendDynamicPorts(node.id,ports);
			}
			_updatePorts();

            node.on("parameterUpdated", function (event) {
                if (event.name === 'Schema') {
                    _updatePorts();
                }
            });
        }

        graphModel.on("editorImportComplete", ()=> {
            graphModel.on("nodeAdded.noodl.net.formkit.validate", function (node) {
				_managePortsForNode(node)
			})

			for(const node of graphModel.getNodesWithType('noodl.net.formkit.validate')) {
				_managePortsForNode(node)
			}
        })
	}
})

export default ValidateNode;