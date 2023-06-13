# web-worker

Start and interact with Dedicated Web Workers.

## Nodes

#### **`Worker`**

The Worker node is what makes it possible to start/stop a worker.

The node have 2 Inputs:
- Worker Name, this is an identifier which can be used by the other nodes to interact with this worker.
- Worker Source, this is the absolute url path to the worker javascript file. It is important that it is the absolute path, starting with `/`.

#### **`Worker Send Message`**

The Worker Send Message node makes it possible to send a message to the worker.

The node have 2 Inputs:

- Worker Name, the worker you want to send the message to.
- Message Name, this will be sent into the worker as `kind`, allowing easy handling of different actions.

The node also have Properties, this is a list that can be changed.
All the properties in the list will create inputs on the node,
so values can be passed in.

The properties will be added to the `data` object in the worker.

#### **`Worker Receive Message`**

The Worker Receive Message node makes it possible to receive a message to the worker.

The node have 2 Inputs:

- Worker Name, the worker you want to receive messages from.
- Message Name, this is the `kind` we want to listen for.

The node also have Properties, this is a list that can be changed.
All the properties in the list will create outputs on the node.

For example, when sending this from a worker:
```js
postMessage({
  kind: "Response",
  data: {
    timestamp: Date.now(),
    message: "Hello"
  }
});
```

We have to listen for `Response`, and we have 2 properties `timestamp` and `message`.

## Web Worker Source

Create a file called `worker.js` in the project folder, with this snippet:

```js
onmessage = (e) => {
  const kind = e.data[0];
  const data = e.data[1];

  switch (kind) {
    case "Action": {
      console.log("Hello World");
      postMessage({
        kind: "Response",
        data: {
          timestamp: Date.now(),
          message: "Hello"
        }
      });
      break;
    }
  }
}
```

Then create a Worker node with the **Worker Source** input as `/worker.js`.

When calling **Send** on a **Worker Send Message** node, with a matching worker name and the message name `Action`. It will log `Hello World` in the console.
