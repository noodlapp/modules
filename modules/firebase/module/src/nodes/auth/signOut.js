import { defineNode } from '@noodl/noodl-sdk';

import { getAuth, signOut } from '@firebase/auth';
import { getApp } from '../../app';

export default defineNode({
  name: "firebase.auth.signOut",
  displayName: "Firebase Log Out",
  color: "green",
  initialize() {
    this.internal = {}
  },
  inputs: {},
  outputs: {
    onSuccess: {
      type: "signal",
      displayName: "Success",
      group: "Events"
    },
    onFailure: {
      type: "signal",
      displayName: "Failure",
      group: "Events"
    },
    onFinally: {
      type: "signal",
      displayName: "Finally",
      group: "Events"
    },
    error: {
      type: "string",
      displayName: "Error",
      group: "Error"
    },
  },
  signals: {
    ["Do"]: function () {
      this.signOut();
    },
  },
  methods: {
    signOut() {
      const self = this;

      const app = getApp();
      const auth = getAuth(app);
      
      signOut(auth)
        .then(() => {
          self.sendSignalOnOutput("onSuccess");
        })
        .catch((error) => {
          self.setOutputs({ error: error.message });
          self.sendSignalOnOutput("onFailure");
        })
        .finally(() => {
          self.sendSignalOnOutput("onFinally");
        });
    }
  },
  setup(context, graphModel) {}
});
