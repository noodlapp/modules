const Noodl = require("@noodl/noodl-sdk");

function _makeRequest(path, options) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var result;
      try {
        result = JSON.parse(xhr.response);
      } catch (e) {
        result = xhr.response;
      }

      if (xhr.status === 200 || xhr.status === 201) {
        options.success(result);
      } else options.error(result);
    }
  };

  xhr.open(options.method || "GET", options.endpoint + path, true);

  xhr.setRequestHeader("X-Parse-Application-Id", options.appId);
  xhr.setRequestHeader("Content-Type", "application/json");

  // Check for current users
  var _cu = localStorage["Parse/" + options.appId + "/currentUser"];
  if (_cu !== undefined) {
    try {
      const currentUser = JSON.parse(_cu);
      xhr.setRequestHeader("X-Parse-Session-Token", currentUser.sessionToken);
    } catch (e) {
      // Failed to extract session token
    }
  }

  xhr.send(JSON.stringify(options.content));
}

const CloudFunctionNode = Noodl.defineNode({
  name: "net.noodl.parse-cloud-function",
  displayName: "Parse Cloud Function",
  useInputAsLabel: "functionName",
  docs: "https://docs.noodl.net/library/modules/parse-cloud-function/",
  initialize: function () {
    this._internal.paramsValues = {};
  },
  getInspectInfo() {
    const result = this._internal.lastCallResult;
    if (!result) return "[Not executed yet]";

    return [{ type: "value", value: result }];
  },
  inputs: {
    functionName: {
      type: "string",
      displayName: "Function Name",
      group: "General",
    },
    params: {
      group: "Parameters",
      type: { name: "stringlist", allowEditOnly: true },
      set: function (value) {
        this._internal.params = value;
      },
    },
  },
  signals: {
    call: {
      type: "signal",
      displayName: "Call",
      group: "Actions",
      signal() {
        this.scheduleCall();
      },
    },
  },
  outputs: {
    success: {
      type: "signal",
      displayName: "Success",
      group: "Signals",
    },
    failure: {
      type: "signal",
      displayName: "Failure",
      group: "Signals",
    },
    result: {
      type: "*",
      displayName: "Result",
      group: "Output",
    },
  },
  methods: {
    registerOutputIfNeeded: function (name) {
      if (this.hasOutput(name)) {
        return;
      }
    },
    setParamsValue: function (name, value) {
      this._internal.paramsValues[name] = value;
    },
    registerInputIfNeeded: function (name) {
      if (this.hasInput(name)) {
        return;
      }

      if (name.startsWith("pm-"))
        this.registerInput(name, {
          set: this.setParamsValue.bind(this, name.substring("pm-".length)),
        });
    },
    scheduleCall: function () {
      var internal = this._internal;
      if (!internal.hasScheduledCall) {
        internal.hasScheduledCall = true;
        this.scheduleAfterInputsHaveUpdated(this.doCall.bind(this));
      }
    },
    doCall: function () {
      this.clearWarnings();

      this._internal.hasScheduledCall = false;

      const cloudServices =
        this.context.graphModel.getMetaData("cloudservices");

      if (cloudServices === undefined) {
        this._internal.lastCallResult = {
          status: "failure",
          res: "No active cloud services in this project",
        };

        this.sendSignalOnOutput("failure");
        this.sendWarning("failure", "No active cloud services in this project");
        return;
      } else if (!this.inputs.functionName) {
        this._internal.lastCallResult = {
          status: "failure",
          res: "No function name defined",
        };

        this.sendSignalOnOutput("failure");
        this.sendWarning("failure", "No function name defined");
        return;
      }

      var appId =
        cloudServices.appId ||
        cloudServices.workspaceId + "-" + cloudServices.instanceId;
      var endpoint = cloudServices.endpoint;

      _makeRequest(
        "/functions/" + encodeURIComponent(this.inputs.functionName),
        {
          appId,
          endpoint,
          content: this._internal.paramsValues,
          method: "POST",
          success: (res) => {
            var res = res.result; // Cloud functions always return "result"
            if (res === undefined) {
              this.sendSignalOnOutput("failure");
              return;
            }

            this.setOutputs({ result: res });

            this._internal.lastCallResult = {
              status: "success",
              result: res,
            };

            this.sendSignalOnOutput("success");
          },
          error: (res) => {
            this._internal.lastCallResult = {
              status: "failure",
              result: res,
            };

            this.sendSignalOnOutput("failure");
            if (res.error) {
              this.sendWarning("failure", res.error);
            }
          },
        }
      );
    },
  },
  setup: handleCloudFunctionPorts,
});

function handleCloudFunctionPorts(context, graphModel) {
  if (
    !context.editorConnection ||
    !context.editorConnection.isRunningLocally()
  ) {
    return;
  }

  function _managePortsForNode(node) {
    function _updatePorts() {
      var ports = [];

      // Add params inputs
      var params = node.parameters.params;
      if (params !== undefined) {
        params = params.split(",");
        for (var i in params) {
          var p = params[i];

          ports.push({
            type: "*",
            plug: "input",
            group: "Parameters",
            name: "pm-" + p,
            displayName: p,
          });
        }
      }

      context.editorConnection.sendDynamicPorts(node.id, ports);
    }

    _updatePorts();
    node.on("parameterUpdated", function (event) {
      if (event.name === "params") {
        _updatePorts();
      }
    });
  }

  graphModel.on("editorImportComplete", () => {
    graphModel.on("nodeAdded.net.noodl.parse-cloud-function", function (node) {
      _managePortsForNode(node);
    });

    for (const node of graphModel.getNodesWithType("Cloud Function")) {
      _managePortsForNode(node);
    }
  });
}

Noodl.defineModule({
  nodes: [CloudFunctionNode],
  setup() {
    //this is called once on startup
  },
});
