import { defineNode } from '@noodl/noodl-sdk';
import {
  getAuth,
  sendPasswordResetEmail,
} from '@firebase/auth';

import { getApp } from '../../app';

export default defineNode({
  name: "firebase.auth.sendPasswordResetEmail",
  displayName: "Firebase Send Password Reset Email",
  color: "green",
  inputs: {
    email: {
      type: "string",
      displayName: "Email",
      group: "General"
    },
    continueUrl: {
      type: "string",
      displayName: "Continue URL",
      group: "General"
    },
  },
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
      this.sendPasswordResetEmail();
    },
  },
  methods: {
    sendPasswordResetEmail() {
      const self = this;

      const app = getApp();
      const auth = getAuth(app);

      sendPasswordResetEmail(auth, this.inputs.email, {
        url: this.inputs.continueUrl
      })
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
