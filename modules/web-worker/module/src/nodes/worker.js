import { defineNode } from '@noodl/noodl-sdk';

const workers = {}
export const events = new EventTarget();

export class WorkerMessageEvent extends Event {
  constructor(workerName, kind, data) {
    super(workerName);
    this.kind = kind;
    this.data = data;
  }
}

export function getWorker(workerName) {
  return workers[workerName];
}

export default defineNode({
  name: "web-worker.worker",
  displayName: "Worker",
  color: "green",
  initialize() {
    this.setOutputs({ isRunning: false });

    this.scheduleAfterInputsHaveUpdated(() => {
      if (workers[workerName]) {
        this.setOutputs({ isRunning: true });
        return;
      }
    });
  },
  inputs: {
    workerName: {
      type: {
        name: 'string',
        identifierOf: 'web-worker.name',
        identifierDisplayName: 'Worker Names'
      },
      displayName: 'Worker Name',
      group: 'General',
    },
    workerSource: {
      type: {
        name: 'source',
        allowEditOnly: true
      },
      displayName: 'Worker Source',
      group: 'General',
    },
  },
  outputs: {
    isRunning: {
      type: "boolean",
      displayName: "Is Running",
      group: "General"
    },
    notSupported: {
      type: "signal",
      displayName: "Not Supported",
      group: "Events"
    },
    started: {
      type: "signal",
      displayName: "Started",
      group: "Events"
    },
    stopped: {
      type: "signal",
      displayName: "Stopped",
      group: "Events"
    },
  },
  signals: {
    ["Start"]: function () {
      this.startWorker();
    },
    ["Stop"]: function () {
      this.stopWorker();
    },
    ["Restart"]: function () {
      this.stopWorker();
      this.startWorker();
    },
  },
  methods: {
    startWorker() {
      const workerName = this._inputValues.workerName;
      
      // Check browser support
      if (!window.Worker) {
        Outputs.Failure();
        this.sendSignalOnOutput("notSupported");
        return;
      }

      // Check currently instances of workers
      if (workers[workerName]) {
        this.setOutputs({ isRunning: true });
        console.info(`Worker '${workerName}' is already running. Sender: '${this.nodeScope.componentOwner.id}'`);
        return;
      }

      const workerSource = this._inputValues.workerSource;
      const worker = new Worker(workerSource);
      worker.onmessage = (event) => {
        if (typeof event.data !== 'object') {
          throw new Error("Received wrong data type from the web worker.");
        }

        if (workers[workerName]) {
          events.dispatchEvent(
            new WorkerMessageEvent(workerName, event.data.kind, event.data.data)
          );
        }
      };

      workers[workerName] = {
        worker,
        componentId: this.nodeScope.componentOwner.id,
        componentName: this.nodeScope.componentOwner.name,
      };

      this.setOutputs({ isRunning: true });
      this.sendSignalOnOutput("started");
    },
    stopWorker() {
      const workerName = this._inputValues.workerName;
      if (workers[workerName]) {
        workers[workerName].worker.terminate();
        workers[workerName] = null;
        this.setOutputs({ isRunning: false });
        this.sendSignalOnOutput("stopped");
      }
    }
  },
  getInspectInfo() {
    const workerName = this._inputValues.workerName;
    if (workers[workerName]) {
      const { componentId, componentName } = workers[workerName];
      return [
        { type: "value", value: `Started by:` },
        { type: "value", value: { componentId, componentName } },
      ];
    }

    return "[No value set]";
  },
  setup(context, graphModel) {}
});
