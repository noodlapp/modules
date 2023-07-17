import { defineNode } from '@noodl/noodl-sdk';

import { getAuth } from '@firebase/auth';
import { getApp } from '../../app';

export default defineNode({
  name: "firebase.auth.user",
  displayName: "Firebase User",
  color: "green",
  initialize() {
    this.internal = {}

    const self = this;

    const userObj = Noodl.Object.get("firebase.user");
    if (userObj) {
      // TODO: Delete listener
      userObj.on("change", () => {
        self.setOutputs({
          authenticated: true,
          uid: userObj.uid,
          displayName: userObj.displayName,
          email: userObj.email,
          phoneNumber: userObj.phoneNumber,
          photoURL: userObj.photoURL,
          accessToken: userObj.accessToken,
          isAnonymous: userObj.isAnonymous,
          createdAt: new Date(userObj.metadata?.createdAt),
          lastLoginAt: new Date(userObj.metadata?.lastLoginAt),
        });
        self.sendSignalOnOutput("onChanged");
      });
    }

    const app = getApp();
    const auth = getAuth(app);
    if (auth) {
      auth.onAuthStateChanged((user) => {
        // TODO: handle state, only create one global listener
        // console.log('AuthStateChanged', user);

        console.log(user);

        self.setOutputs({
          authenticated: !!user,
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
          photoURL: user?.photoURL,
          accessToken: user?.accessToken,
          isAnonymous: user?.isAnonymous,
          createdAt: new Date(user?.metadata?.createdAt),
          lastLoginAt: new Date(user?.metadata?.lastLoginAt),
        });
      });
    }
  },
  inputs: {},
  outputs: {
    uid: {
      type: "string",
      displayName: "UID",
      group: "General"
    },
    displayName: {
      type: "string",
      displayName: "Display Name",
      group: "General"
    },
    email: {
      type: "string",
      displayName: "Email",
      group: "General"
    },
    phoneNumber: {
      type: "string",
      displayName: "Phone Number",
      group: "General"
    },
    photoURL: {
      type: "string",
      displayName: "Photo URL",
      group: "General"
    },
    accessToken: {
      type: "string",
      displayName: "Access Token",
      group: "General"
    },
    authenticated: {
      type: "boolean",
      displayName: "Authenticated",
      group: "General"
    },
    isAnonymous: {
      type: "boolean",
      displayName: "isAnonymous",
      group: "General"
    },
    createdAt: {
      type: "date",
      displayName: "Created At",
      group: "Metadata"
    },
    lastLoginAt: {
      type: "date",
      displayName: "Last Login At",
      group: "Metadata"
    },
    onChanged: {
      type: "signal",
      displayName: "Changed",
      group: "Events"
    },
  },
  signals: {},
  methods: {},
  setup(context, graphModel) {}
});
