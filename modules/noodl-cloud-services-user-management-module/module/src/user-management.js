const Noodl = require('@noodl/noodl-sdk');
import Parse from 'parse/dist/parse.min.js';

const ErrorCodes = {
	0: "OTHER_CAUSE",
	1: "INTERNAL_SERVER_ERROR",
	100: "CONNECTION_FAILED",
	101: "OBJECT_NOT_FOUND",
	102: "INVALID_QUERY",
	103: "INVALID_CLASS_NAME",
	104: "MISSING_OBJECT_ID",
	105: "INVALID_KEY_NAME",
	106: "INVALID_POINTER",
	107: "INVALID_JSON",
	108: "COMMAND_UNAVAILABLE",
	109: "NOT_INITIALIZED",
	111: "INCORRECT_TYPE",
	112: "INVALID_CHANNEL_NAME",
	115: "PUSH_MISCONFIGURED",
	116: "OBJECT_TOO_LARGE",
	119: "OPERATION_FORBIDDEN",
	120: "CACHE_MISS",
	121: "INVALID_NESTED_KEY",
	122: "INVALID_FILE_NAME",
	123: "INVALID_ACL",
	124: "TIMEOUT",
	125: "INVALID_EMAIL_ADDRESS",
	126: "MISSING_CONTENT_TYPE",
	127: "MISSING_CONTENT_LENGTH",
	128: "INVALID_CONTENT_LENGTH",
	129: "FILE_TOO_LARGE",
	130: "FILE_SAVE_ERROR",
	137: "DUPLICATE_VALUE",
	139: "INVALID_ROLE_NAME",
	140: "EXCEEDED_QUOTA",
	141: "SCRIPT_FAILED",
	142: "VALIDATION_ERROR",
	150: "INVALID_IMAGE_DATA",
	151: "UNSAVED_FILE_ERROR",
	152: "INVALID_PUSH_TIME_ERROR",
	153: "FILE_DELETE_ERROR",
	155: "REQUEST_LIMIT_EXCEEDED",
	160: "INVALID_EVENT_NAME",
	200: "USERNAME_MISSING",
	201: "PASSWORD_MISSING",
	202: "USERNAME_TAKEN",
	203: "EMAIL_TAKEN",
	204: "EMAIL_MISSING",
	205: "EMAIL_NOT_FOUND",
	206: "SESSION_MISSING",
	207: "MUST_CREATE_USER_THROUGH_SIGNUP",
	208: "ACCOUNT_ALREADY_LINKED",
	209: "INVALID_SESSION_TOKEN",
	250: "LINKED_ID_MISSING",
	251: "INVALID_LINKED_SESSION",
	252: "UNSUPPORTED_SERVICE",
	600: "AGGREGATE_ERROR",
	601: "FILE_READ_ERROR",
	602: "X_DOMAIN_REQUEST",
}

let userObject; //Noodl.Object not available yet when this line runs, so create this object later

function updateUserObject() {
	const user = Parse.User.current();
	const attributes = user ? user.attributes : {};

	userObject.setAll({
		...attributes,
		userId: user ? user.id : null,
		authenticated: user ? user.authenticated() : false
	});
}

function setUserProperty(name, value) {
	userObject.set(name, value);
	Parse.User.current().set(name, value);
}

function initializeParse(cloudservices) {

	userObject = Noodl.Object.get('_noodl_user_');

	if (!cloudservices) {
		console.error("Cloud services must be enabled for Parse to work");
		return;
	}

	const {
		endpoint,
		instanceId,
		workspaceId,
		appId
	} = cloudservices;

	const id = appId ? appId : `${workspaceId}-${instanceId}`
	Parse.initialize(id);

	Parse.serverURL = endpoint;

	const user = Parse.User.current();

	//fetch user data from local storage, if any, otherwise set default values
	updateUserObject();

	if (user) {
		//there's a cached login, fetch in case some value has changed
		user.fetch()
			.then(updateUserObject)
			.catch(e => {
				//this can happen if the session has been deleted on the backend and is now invalid
				userObject.set("authenticated", false);
			})
	}
}

const SignUp = Noodl.defineNode({
	category: 'Cloud Services',
	name: 'Sign Up',
	color: 'green',
	docs:'https://docs.noodl.net/#/modules/cloud-services-user-management/signup',
	inputs: {
		email: {
			type: 'string',
			displayName: 'Email',
			group: 'User Data'
		},
		username: {
			type: 'string',
			displayName: 'Username',
			group: 'User Data'
		},
		password: {
			type: 'string',
			displayName: 'Password',
			group: 'User Data'
		},
	},
	outputs: {
		success: {
			type: 'signal',
			displayName: 'Success',
			group: 'Success'
		},
		error: {
			type: 'signal',
			displayName: 'Error',
			group: 'Error'
		},
		errorMessage: {
			type: 'string',
			displayName: 'Error Message',
			group: 'Error'
		},
		errorCode: {
			type: 'string',
			displayName: 'Error Code',
			group: 'Error'
		},
	},
	signals: {
		signup: {
			displayName: 'Sign Up',
			group: 'Actions',
			signal() {

				this.setOutputs({
					errorMessage: "",
					errorCode: ""
				});

				const user = new Parse.User();

				//Parse requires a username, and email is optional.
				//if no username is specified, use the email as a username 
				const username = this.inputs.username ? this.inputs.username : this.inputs.email;
				user.set("username", username);
				user.set("password", this.inputs.password);
				user.set("email", this.inputs.email);

				user.signUp().then(() => {
						this.sendSignalOnOutput('success');
						updateUserObject();
					})
					.catch(error => {
						this.setOutputs({
							errorMessage: error.message,
							errorCode: ErrorCodes[error.code]
						});
						this.sendSignalOnOutput('error');
					});
			}
		}
	}
});

const LogIn = Noodl.defineNode({
	category: 'Cloud Services',
	name: 'Log In',
	color: 'green',
	docs:'https://docs.noodl.net/#/modules/cloud-services-user-management/login',
	inputs: {
		username: {
			type: 'string',
			displayName: 'Username',
			group: 'User Data'
		},
		password: {
			type: 'string',
			displayName: 'Password',
			group: 'User Data'
		},
	},
	outputs: {
		success: {
			type: 'signal',
			displayName: 'Success',
			group: 'Success'
		},
		error: {
			type: 'signal',
			displayName: 'Error',
			group: 'Error'
		},
		errorMessage: {
			type: 'string',
			displayName: 'Error Message',
			group: 'Error'
		},
		errorCode: {
			type: 'string',
			displayName: 'Error Code',
			group: 'Error'
		},
	},
	signals: {
		login: {
			displayName: 'Log In',
			group: 'Actions',
			signal() {
				this.setOutputs({
					errorMessage: "",
					errorCode: ""
				});

				Parse.User.logIn(this.inputs.username, this.inputs.password).then(user => {
						this.sendSignalOnOutput('success');
						updateUserObject();
					})
					.catch(error => {
						this.setOutputs({
							errorMessage: error.message,
							errorCode: ErrorCodes[error.code]
						});
						this.sendSignalOnOutput('error');
					});
			}
		}
	},
	changed: {}
});

const builtInUserProps = {
	userId: {
		displayName: 'Id',
		type: 'string',
		group: 'User Data'
	},
	email: {
		displayName: 'Email',
		type: 'string',
		group: 'User Data'
	},
	username: {
		displayName: 'Username',
		type: 'string',
		group: 'User Credentials'
	},
	createdAt: {
		displayName: 'Created At',
		type: 'string',
		group: 'User Data'
	},
	updatedAt: {
		displayName: 'Updated At',
		type: 'string',
		group: 'User Data'
	},
	authenticated: {
		displayName: 'Authenticated',
		type: 'boolean',
		group: 'User Data'
	}
};

const User = Noodl.defineNode({
	category: 'Cloud Services',
	name: 'User',
	color: 'green',
	docs:'https://docs.noodl.net/#/modules/cloud-services-user-management/user',	
	initialize() {
		this.onPropertyUpdated = ({
			name,
			value
		}) => {
			if (builtInUserProps[name]) {
				const output = {};
				output[name] = value;
				this.setOutputs(output);
			} else if (this.hasOutput(name)) {
				//dynamic output
				this.flagOutputDirty(name);
			}
		};

		userObject.on('change', this.onPropertyUpdated);

		const startValues = {};
		for (const prop in builtInUserProps) {
			startValues[prop] = userObject.get(prop);
		}
		this.setOutputs(startValues);

		this.valuesToStore = {};
	},
	methods: {
		onNodeDeleted() {
			userObject.off('change', this.onPropertyUpdated);
		},
		registerOutputIfNeeded: function (name) {
			if (this.hasOutput(name)) {
				return;
			}

			this.registerOutput(name, {
				get() {
					return userObject.get(name, {
						resolve: true
					})
				}
			});
		},
		registerInputIfNeeded: function (name) {
			if (this.hasInput(name)) {
				return;
			}

			this.registerInput(name, {
				set(value) {
					this.valuesToStore[name] = value;
				}
			});
		}
	},
	signals: {
		fetch: {
			displayName: 'Fetch',
			group: 'Actions',
			signal() {
				const user = Parse.User.current();

				if (user) {
					user.fetch().then(() => {
						updateUserObject();
						this.sendSignalOnOutput("fetched");
					});
				} else {
					this.setOutputs({
						errorMessage: "User not logged in",
						errorCode: "NOT_INITIALIZED"
					});
					this.sendSignalOnOutput("error");
				}


			}
		},
		store: {
			displayName: 'Save',
			group: 'Actions',
			signal() {
				const user = Parse.User.current();
				if (!user) {
					this.setOutputs({
						errorMessage: "User not logged in",
						errorCode: "NOT_INITIALIZED"
					});
					this.sendSignalOnOutput("error");
					return;
				}

				for (const prop in this.valuesToStore) {
					setUserProperty(prop, this.valuesToStore[prop]);
				}

				if (this.inputs.email) {
					//if email matches the username, change the username as well
					if (user.get('username') === user.get('email') && !this.inputs.username) {
						setUserProperty("username", this.inputs.email);
					}

					setUserProperty("email", this.inputs.email);
				}
				if (this.inputs.username) {
					setUserProperty("username", this.inputs.username);
				}
				if (this.inputs.password) {
					user.set("password", this.inputs.password);
				}

				user.save()
					.then(
						() => {
							this.sendSignalOnOutput('stored');
							this.valuesToStore = {};
						},
						error => {
							this.setOutputs({
								errorMessage: error.message,
								errorCode: ErrorCodes[error.code]
							});
							this.sendSignalOnOutput('error');
						}
					);
			}
		}
	},
	inputs: {
		properties: {
			type: {
				name: 'stringlist',
				allowEditOnly: true
			},
			displayName: 'Custom User Data',
			group: 'Custom User Data',
		},
		username: builtInUserProps.username,
		password: {
			displayName: 'Password',
			type: 'string',
			group: 'User Credentials'
		},
		email: builtInUserProps.email
	},
	outputs: {
		...builtInUserProps,
		stored: {
			displayName: 'Saved',
			type: 'signal',
			group: 'Success'
		},
		error: {
			displayName: 'Error',
			type: 'signal',
			group: 'Error'
		},
		errorMessage: {
			displayName: 'Error message',
			type: 'string',
			group: 'Error'
		},
		errorCode: {
			displayName: 'Error code',
			type: 'string',
			group: 'Error'
		},
		fetched: {
			displayName: 'Fetched',
			type: 'signal'
		}
	},
	setup(context, graphModel) {
		if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
			return;
		}

		graphModel.on("nodeAdded.User", function (node) {
			updateUserPorts(node.id, node.parameters, context.editorConnection);

			node.on("parameterUpdated", function (event) {
				updateUserPorts(node.id, node.parameters, context.editorConnection);
			});
		});
	}
});

function updateUserPorts(nodeId, parameters, editorConnection) {

	const properties = parameters.properties ? parameters.properties.split(',') : [];
	const ports = properties.map(p => {
		return {
			type: {
				name: '*',
				allowConnectionsOnly: true
			},
			plug: 'input/output',
			group: 'Custom User Data',
			name: p,
		}
	});

	editorConnection.sendDynamicPorts(nodeId, ports, {
		detectRenamed: {
			plug: 'input/output',
		}
	});
}

const Logout = Noodl.defineNode({
	category: 'Cloud Services',
	name: 'Log Out',
	color: 'green',
	docs:'https://docs.noodl.net/#/modules/cloud-services-user-management/logout',	
	signals: {
		logout: {
			displayName: 'Log Out',
			group: 'Actions',
			signal() {
				Parse.User.logOut()
					.then(() => {
						this.sendSignalOnOutput('success');
						updateUserObject();
					})
					.catch(error => {
						this.setOutputs({
							errorMessage: error.message,
							errorCode: ErrorCodes[error.code]
						});
						this.sendSignalOnOutput('error');
					});
			}
		}
	},
	outputs: {
		success: {
			displayName: 'Success',
			type: 'signal',
			group: 'Success'
		},
		error: {
			displayName: 'Error',
			type: 'signal',
			group: 'Error'
		},
		errorMessage: {
			displayName: 'Error Message',
			type: 'string',
			group: 'Error'
		},
		errorCode: {
			displayName: 'Error Code',
			type: 'string',
			group: 'Error'
		},
	}
});

Noodl.defineModule({
	nodes: [
		SignUp,
		LogIn,
		User,
		Logout
	],
	setup() {
		initializeParse(Noodl.getMetaData('cloudservices'));
	}
});