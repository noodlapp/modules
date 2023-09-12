const Noodl = require('@noodl/noodl-sdk');
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const i18nextNode = Noodl.defineNode ({
	category:'i18next-noodl',
	name:"i18next",
	docs:'https://docs.noodl.net/modules/i18next/i18next-node',
	inputs:{
		Language:"string"
	},
	outputs:{
		LanguageChanged:"signal",
		CurrentLanguage:"string"
	},
	signals: {
		ChangeLanguage: function () {
			geti18next().then ( () => {
				i18next.changeLanguage (this.inputs.Language).then( () => {/*this.sendSignalOnOutput ("LanguageChanged");*/})
			} );
		}
	},
	initialize: function () {
		this.clearWarnings ();
		geti18next().then ( () => {
			i18next.on('languageChanged', (lng) => {
				this.setOutputs ({CurrentLanguage:lng});
				this.sendSignalOnOutput ("LanguageChanged");
			});

			this.setOutputs ({CurrentLanguage:i18next.language});
			this.sendSignalOnOutput ("LanguageChanged");
		} );
	}
	
});

const LanguageBundleNode = Noodl.defineNode({
	category:'i18next-noodl',
	name:'Language Bundle',
	docs:'https://docs.noodl.net/modules/i18next/language-bundle',
	inputs:{
		Bundle:{type:{name:'string', codeeditor:"JSON"}},
		ExternalFilePath: {
			type: {name: 'source', allowEditOnly: true},
			displayName: 'External Bundle Path',
		},
		//Bundle:'array',
		Language:'string',
		Namespace:'string',
		ResourceKey:{type:{name:'string'}, displayName:"Resource Key", group:"Add Resource"},
		ResourceValue:{type:{name:'string'}, displayName:"Resource Value", group:"Add Resource"},
		ResourceBundleObject:{type:{name:'*'}, displayName:"Resource Bundle Object", group:"Add Resource"}
	},
	outputs:{
		BundleLoaded:'signal'
	},
	changed:{
		Bundle:function(jsonData) {

			this.clearWarnings();

			let obj = {};
			if (jsonData !== undefined || jsonData == "") {
				try {
					obj= JSON.parse (jsonData);
				}
				catch (e) {
					this.sendWarning ('i18next-warning',e.message);
					console.log ("Warning JSON is not correct in language bundle. ", jsonData);
				}
			}

			this.loadBundle(obj);
		},
		ExternalFilePath(path) {
			this.clearWarnings();
			if(!path) return;

			fetch(path)
				.then(response => {
					if(response.ok) {
						return response.json();
					}
					throw new Error(response.status + " " + response.statusText);
				})
				.then(data => {
					this.loadBundle(data);
				})
				.catch(e => {
					console.log(e);
					this.sendWarning('i18next-warning',e.message);
				});
		}
	},
	methods: {
		loadBundle(obj) {
			geti18next().then ( () => {

				let namespace = this.inputs.Namespace;
				if (namespace === undefined) {
					namespace = 'common';
				}
				let language = this.inputs.Language;
				if (language === undefined) {
					language = 'en';
				}
				if (Object.keys(obj).length > 0) {
					i18next.addResourceBundle (language, namespace, obj, false, true);
				}
			});
		}
	},
	signals: {
		AddResource:function () {
			geti18next().then ( () => {
				let namespace = this.inputs.Namespace;
				if (namespace === undefined) {
					namespace = 'common';
				}
				let language = this.inputs.Language;
				if (language === undefined) {
					language = 'en';
				}
				//console.log ("adding resource");
				i18next.addResource (language, namespace, this.inputs.ResourceKey, this.inputs.ResourceValue);
			});
		},
		AddBundleObject:function () {
			geti18next().then ( () => {
				let namespace = this.inputs.Namespace;
				if (namespace === undefined) {
					namespace = 'common';
				}
				let language = this.inputs.Language;
				if (language === undefined) {
					language = 'en';
				}
				//console.log ("adding resource bundle");
				i18next.addResourceBundle (language, namespace, this.inputs.ResourceBundleObject, true, true);
			} );



		}
	},
	initialize: function () {
		this.clearWarnings ();
	}

	
});

const TranslationNode = Noodl.defineNode({
	category:'i18next-noodl',
	name:'Translation',
	docs:'https://docs.noodl.net/modules/i18next/translation',	
	inputs:{
		Key: {
            type: { name: 'string'},
            displayName: 'Key',
            /*set: function (value) {
            	console.log ("KEY SET");
                this._internal.Key = value;
                this._internal.keyDirty = true;
                this.scheduleTranslate ();
            }*/
        },

		Namespace:'string',
		Variables: {
            type: { name: 'stringlist', allowEditOnly: true },
            displayName: 'Variables',
            group: "Variables",
            set: function (value) {
            }
        },
	},
	outputs:{
		Translation:{type:'string', displayName:"Translation", get:function () {console.log ("get outtahere");}}
	},
	changed:{
		Key:function (value) {
			this._internal.Key = value;
            this._internal.keyDirty = true;
            this.scheduleTranslate ();
		}
	},
	initialize: function ()  {
		this.clearWarnings ();
		this._internal = {translationScheduled:false, variables:{}, keyPorts:[], keyValues:{}, keyDirty:true, cachedKey:"", Key:""};
		this._internal.eventListenerAdded = (lng, ns) =>  {
				if (this.isMyNamespace (ns) === true) {
					//console.log ("something added in my namespace! my key is ", this.inputs.Key);

					geti18next().then( () => {
						this.scheduleTranslate();
					});
				}
			};
		this._internal.eventListenerLangChanged = (lng) => {
			this.scheduleTranslate ();
		};

		geti18next().then ( () => { 
			i18next.store.on('added', this._internal.eventListenerAdded);

			i18next.on('languageChanged', this._internal.eventListenerLangChanged);
		} );
	},

	setup: function (context, graphModel) {
		if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
	      return;
	    }

		function updatePorts(nodeId, parameters, editorConnection) {
		  var ports = [];

		  /*this._internal.variablePorts = [];
	      this._internal.keyPorts = [];*/

		  // Add value outputs
		  var properties = parameters.Variables;
		  if (properties) {
		    properties = properties ? properties.split(',') : undefined;
		    for (var i in properties) {
		      var p = properties[i];

		      ports.push({
		        type: {
		          name: '*',
		          allowConnectionsOnly: true
		        },
		        plug: 'input',
		        group: 'Variables',
		        name: p,
		      });

		      //this._internal.variablePorts.push (p);

		    }
		  }

		  // key ports
		  var keyPorts = [];
		  let key = parameters.Key;
		  if (key !== undefined) {
		  var inputs = key.match(/\{[A-Za-z0-9_]*\}/g) || [];
		  var portsNames = inputs.map(function(def) {
		      return def.replace('{','').replace('}','');
		  });
		  var portsNames = portsNames
	        //get unique names
	        .filter(function(value, index, self) { 
	            return self.indexOf(value) === index;
	        });
	      //this._internal.keyPorts = portsNames;
		  keyPorts = portsNames
	        
	        //and map names to ports
	        .map(function(name) {
	            return {
	            	group:'Key ports',
	                name:name,
	                type:'string',
	                plug:'input',
	            }
	        });
	     }

		  editorConnection.sendDynamicPorts(nodeId, ports.concat(keyPorts));
		}


	    graphModel.on("nodeAdded.Translation", function (node) {
	      updatePorts(node.id, node.parameters, context.editorConnection);

	      node.on("parameterUpdated", function (event) {
	        updatePorts(node.id, node.parameters, context.editorConnection);
	      });
	    });
	},
	methods: {
		onNodeDeleted: function () {
			geti18next().then ( () => {
				i18next.off ('added', this._internal.eventListenerAdded);
				i18next.off ('languageChanged', this._internal.eventListenerLangChanged);

			});
		},
		scheduleTranslate: function () {
			if (this._internal.translationScheduled === true) {

				return;
			}
			this._internal.translationScheduled = true;
			//console.log ("scheduled");
			/*console.log ("dirty!");
			this.flagOutputDirty ("Translation");*/
			this.scheduleAfterInputsHaveUpdated(() => {
				//console.log ("translate");
				this._internal.translationScheduled = false;
				this.translate ();
			});

		},
		getNamespaceKey: function () {
			//let key = this.inputs.Key;
			let namespace = this.inputs.Namespace;

			// first resolve the key if needed.
			if (this._internal.keyDirty === true) {
				//console.log ("key dirty "+this.inputs.Key);
				var formatted =  this._internal.Key;

                var matches = this._internal.Key.match(/\{[A-Za-z0-9_]*\}/g);
                var inputs = [];
                if(matches) {
                    inputs = matches.map(function(name) {
                        return name.replace('{','').replace('}','');
                    });
                }
                var self = this;
                inputs.forEach(function(name) {
                    var v = self._internal.keyValues[name];
                    formatted = formatted.replace('{'+name+'}',v!==undefined?v:'');
                });

                this._internal.cachedKey= formatted;
                this._internal.keyDirty = false;

			}
			let resolvedKey = this._internal.cachedKey;

			if (namespace === undefined) {
				return 'common:'+resolvedKey;
			}
			else {
				return namespace+":"+resolvedKey;
			}
		},
		isMyNamespace: function (namespace) {
			let myNs = null;
			if (this.inputs.Namespace === undefined) {
				myNs = 'common';
			}
			else {
				myNs = this.inputs.Namespace;
			}
			return myNs == namespace;
		},
		translate: function () {
			//console.log ("t "+this.inputs.Key);	
			if (this.inputs.Key === undefined) {
				return;
			}
			geti18next().then ( () => {
				//console.log ("translate");
				let namespaceKey = this.getNamespaceKey ();
				if (i18next.exists(namespaceKey)) {
					let translation = i18next.t (namespaceKey, this._internal.variables);
					this.setOutputs ({Translation:translation});
				}
				else {
					//console.log ("Warning translation ", namespaceKey, " is missing.");
				}
			});

		},
	    registerInputIfNeeded: function (name) {
	      if (this.hasInput(name)) {
	        return;
	      }

	      function userInputSetter (name, value) {
	      	//console.log ("name ", name, " value ", value);
	      	var keyPortMatches = this._internal.Key.match(/\{[A-Za-z0-9_]*\}/g);
	      	var inputs = [];
            if(keyPortMatches) {
                inputs = keyPortMatches.map(function(name) {
                    return name.replace('{','').replace('}','');
                });
            }


	      	if (inputs.includes (name) === false) {

	      		// a variable
	      		if (name == "count") {
		      		let num = parseInt (value);
		      		if (isNaN (num)) {
		      			this.sendWarning ("i18next-warning", "count variable must be a number");
		      		}
		      		else {
		      			this._internal.variables[name] = num;
		      			this.scheduleTranslate ();
		      		}
		      	}
		      	else {
			      	this._internal.variables[name] = value;
			      	this.scheduleTranslate ();
		      	}

	      	}
	      	else {
	      		// a key
				this._internal.keyValues[name] = value;
				//console.log ("scheduling translate  name ", name, " value ", value);
				this._internal.keyDirty = true;
				this.scheduleTranslate ();

	      	}
	      	
	      }

	      this.registerInput(name, {
	        set: userInputSetter.bind(this, name)
	      });
	    }
	},
	
});


var initialized = false;

function geti18next () {
	if (initialized === false) {
		return new Promise ( (resolve, reject) => {
			i18next.on ('initialized', () => {resolve ();});
		});

	}
	else {
		return Promise.resolve();
	}
}

Noodl.defineModule({
    nodes:[
    	i18nextNode,
		LanguageBundleNode,
		TranslationNode
    ],
    setup() {

    	i18nextSetup2 ();
    }
});

async function i18nextSetup2 () {

	i18next.on('initialized', () => {
		initialized = true;
	});

	await i18next.use(LanguageDetector).init({
			  /*lng: 'en',*/
			  debug: false,
			  ns:['common'],
			  defaultNS:'common',
			  fallbackLng:{
			  	'en-GB':['en'],
			  	'en-US':['en'],
			  	'en-au':['en'],
			  	'sv-fi':['sv'],
			  	'default':['en']
			  }
			});
}
