import { defineNode } from '@noodl/noodl-sdk';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';

import { getApp } from '../../app';
import { updateUser } from '../../utils';

export default defineNode({
  name: "firebase.auth.signUp",
  displayName: "Firebase Sign Up",
  color: "green",
  initialize() {
    this.internal = {}
  },
  inputs: {
    email: {
      type: "string",
      displayName: "Email",
      group: "General"
    },
    password: {
      type: "string",
      displayName: "Password",
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
      this.signIn();
    },
  },
  methods: {
    signIn() {
      const self = this;

      const app = getApp();
      const auth = getAuth(app);

      const email = this.inputs.email;
      const password = this.inputs.password;

      if (!email) {
        Outputs.Error = "Missing email";
        return Outputs.Failure();
      }

      if (!password) {
        Outputs.Error = "Missing password";
        return Outputs.Failure();
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateUser(userCredential.user);
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
