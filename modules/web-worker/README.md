# web-worker

Start and interact with Dedicated Web Workers.

## Getting started

Web Worker:
```js
onmessage = (e) => {
  const kind = e.data[0];
  const data = e.data[1];

  switch (kind) {
    case "Action": {
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
