import { defineModule } from '@noodl/noodl-sdk';

import SendPasswordResetEmail from './nodes/auth/sendPasswordResetEmail';
import SignIn from './nodes/auth/signIn';
import SignOut from './nodes/auth/signOut';
import User from './nodes/auth/user';

defineModule({
	nodes: [SendPasswordResetEmail, SignIn, SignOut, User],
	settings: [
		{
			name: "firebaseApiKey",
			type: "string",
			displayName: "API Key",
			group: "Firebase"
		},
		{
			name: "firebaseAuthDomain",
			type: "string",
			displayName: "Auth Domain",
			group: "Firebase"
		},
		{
			name: "firebaseProjectId",
			type: "string",
			displayName: "Project ID",
			group: "Firebase"
		},
		{
			name: "firebaseStorageBucket",
			type: "string",
			displayName: "Storage Bucket",
			group: "Firebase"
		},
		{
			name: "firebaseMessagingSenderId",
			type: "string",
			displayName: "Messaging SenderId",
			group: "Firebase"
		},
		{
			name: "firebaseAppId",
			type: "string",
			displayName: "App ID",
			group: "Firebase"
		},
		{
			name: "firebaseMeasurementId",
			type: "string",
			displayName: "Measurement Id",
			group: "Firebase"
		},
	]
});
