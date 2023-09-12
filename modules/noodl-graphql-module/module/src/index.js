const Noodl = require('@noodl/noodl-sdk');

const _defaultRequestHeaders = "// Specify the request headers as a JS object, for instance:\n" +
"// headers({\n" +
"//  'Auhtorization':'secret'\n" +
"// })\n"+
"headers({})\n"

const GraphQLQueryNode = Noodl.defineNode({
	category: 'GraphQL',
	name: 'GraphQL Query',
	color: 'green',
	initialize:function() {
		this.variableValues = {};
		this.results = {};

		this.clearWarnings();
	},
	inputs: {
		Query: {
			group:'General',
			type: { name: 'string', codeeditor: 'graphql' }
		},
		Endpoint: {
			group:'General',
			type: 'string'
		},
		ResultsList: {
			group:'Results',
			type: 'stringlist'
		},
		RequestHeaders:{
			group:'Advanced',
			displayName:'Request Headers',
			type: { name: 'string', codeeditor: 'javascript' },
			default:_defaultRequestHeaders
		}
	},
	outputs: {
	},
	changed:{
		RequestHeaders:function(value) {
			try {
				this.requestHeaderFunc = new Function('headers',value);
			}
			catch(e) {
				this.requestHeaderFunc = undefined;
				this.sendWarning('grapgl-headers-warning','Error in headers script: ' +  e);
			}  
		}
	},
	signals: {
		Fetch: function () {
			this.clearWarnings();
			
			const xhr = new XMLHttpRequest();

			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					const response = JSON.parse(xhr.responseText);
					if(response.data) {
						if(this.inputs.ResultsList) {
							this.inputs.ResultsList.split(',').forEach((o) => {
								var _o = 'res-'+o;
								if(this.hasOutput(_o)) {
									this.results[o] = this.extractResult(o,response.data);
									this.flagOutputDirty(_o);
								}
							})
						}
					}
					else if(response.errors) {
						var message = '';
						response.errors.forEach((e) => message += (e.message + '\n'))
						this.sendWarning('grapgql-query-warning',message);
					}
				}
			}

			const json = {
				"query": this.inputs.Query,
				"variables": this.variableValues
			};

			xhr.open('POST', this.inputs.Endpoint);

			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader('Accept', 'application/json');

			// Let's get the user specified headers
			if(this.requestHeaderFunc) {
				this.requestHeaderFunc(function(headers) {
					for(var key in headers) {
						xhr.setRequestHeader(key,headers[key])
					}
				})
			}

			xhr.send(JSON.stringify(json));
		}
	},
	methods: {
		registerInputIfNeeded: function (name) {
			if (this.hasInput(name)) {
				return;
			}

			this.registerInput(name, {
				set: this.setVariableValue.bind(this, name.substring('var-'.length))
			});
		},
		registerOutputIfNeeded: function (name) {
			if (this.hasOutput(name)) {
				return;
			}

			this.registerOutput(name, {
				getter: this.getResult.bind(this, name.substring('res-'.length))
			});
		},		
		setVariableValue: function (name, value) {
			this.variableValues[name] = value;
		},
		getResult: function(name) {
			return this.results[name];
		},
		extractResult:function(name,json) {
			const result = Noodl.Array.get();
			result.set(json[name]);
			return result;
		}
	},
	setup: function (context, graphModel) {
		if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
			return;
		}

		graphModel.on("nodeAdded.GraphQL Query", function (node) {

			function updatePorts() {
				var ports = [];

				const query = node.parameters.Query;
				if (query) {
					var variables = query.match(/\$[A-Za-z0-9]+/g)

					if(variables) {
						const unique = {};
						variables.forEach((v) => unique[v] = true)

						Object.keys(unique).forEach((p) => {
							ports.push({
								name: 'var-' + p.substring(1),
								displayName: p.substring(1),
								group: 'Variables',
								plug: 'input',
								type: { name: '*', allowConnectionsOnly: true }
							});
						})
					}
				}

				const resultsList = node.parameters.ResultsList;
				if (resultsList) {
					resultsList.split(',').forEach((p) => {
						ports.push({
							name: 'res-' + p,
							displayName: p,
							group: 'Results',
							plug: 'output',
							type: '*'
						});
					})
				}

				context.editorConnection.sendDynamicPorts(node.id, ports);
			}

			if (node.parameters.Query || node.parameters.ResultsList) {
				updatePorts();
			}
			node.on("parameterUpdated", function (event) {
				if (event.name === "Query" || event.name === "ResultsList") {
					updatePorts();
				}
			})
		})
	}
})

Noodl.defineModule({
	nodes: [
		GraphQLQueryNode
	],
	setup() {
		//this is called once on startup
	}
});