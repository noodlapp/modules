# Project Settings

Get custom settings:
```ts
const settings = Noodl.getProjectSettings();
const hostingEndpoint = settings.hostingEndpoint;
```

Define the module with the settings.
```ts
Noodl.defineModule({
  reactNodes: [],
  nodes: [],
  settings: [
    {
      name: 'hostingAuthToken',
      type: 'string',
      displayName: 'Noodl Hosting Auth Token'
    },
    {
      // TODO: Default?
      name: 'hostingEndpoint',
      type: 'string',
      displayName: 'Noodl Hosting Endpoint'
    },
    {
      name: 'hostingMockApi',
      type: 'boolean',
      displayName: 'Noodl Mock Api'
    }
  ],
  setup() {
  }
});
```
