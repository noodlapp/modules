import { defineNode } from '@noodl/noodl-sdk';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInAnonymously,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider
} from '@firebase/auth';

import { getApp } from '../../app';
import { updateUser } from '../../utils';

export default defineNode({
  name: "firebase.auth.signIn",
  displayName: "Firebase Log In",
  color: "green",
  initialize() {
    this.internal = {}
  },
  inputs: {
    method: {
      type: {
        name: "enum",
        enums: [
          {
            label: "Anonymously",
            value: "anonymously"
          },
          {
            label: "Email",
            value: "email"
          },
          {
            label: "Email Link",
            value: "emailLink"
          },
          {
            label: "Email Password",
            value: "emailPassword"
          },
          {
            label: "Facebook",
            value: "facebook.com"
          },
          {
            label: "GitHub",
            value: "github.com"
          },
          {
            label: "Google",
            value: "google.com"
          },
          {
            label: "Twitter",
            value: "twitter.com"
          },
        ]
      },
      displayName: "Method",
      group: "General",
      default: "email"
    },
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

      const method = this.inputs.method;
      switch (method) {
        case "anonymously": {
          signInAnonymously(auth)
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

          break;
        }

        case "email": {
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

          signInWithEmailAndPassword(auth, email, password)
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

          break;
        }

        // signInWithCredential

        case "facebook.com": {
          const provider = new FacebookAuthProvider();
          signInWithPopup(auth, provider)
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
          break;
        }
        
        case "github.com": {
          const provider = new GithubAuthProvider();
          signInWithPopup(auth, provider)
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
          break;
        }
        
        case "google.com": {
          const provider = new GoogleAuthProvider();
          signInWithPopup(auth, provider)
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
          break;
        }

        case "twitter.com": {
          const provider = new TwitterAuthProvider();
          signInWithPopup(auth, provider)
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
          break;
        }

        default:
          throw `Not Supported method '${method}'`;
      }
    }
  },
  setup(context, graphModel) {}
});
