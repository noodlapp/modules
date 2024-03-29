# data-context

This module is designed to make it easier to work with data objects in complex data scenarios,
where the [Parent Component Object nodes](https://docs.noodl.net/#/nodes/component-utilities/parent-component-object/) will not be enough or will make it harder to maintain. 

## How to use it?

This module is adding 4 new nodes.

- Context
- Get State (to get the data from the context, you have to call the Fetch method)
- Set State
- Subscriber (this is a reactive object so when something changes on the context this one get the new data automatically)

The Context node is the most important node,
where you design the data object you want to use and share it with all the child components.
When you have a Context you can use either the Get State or Subscriber nodes (which work similarly to the Variable nodes) to get the current data, it will then find the closest Context node upwards in the graph to get the data.

## How to contribute

In `.\module\webpack.config.js` you will see `outputPath` close to the top,
change this path to where your Noodl project is located and include `/noodl_modules/` at the end.

```sh
# Go to the module folder
$ cd ./module

# Install dependencies
$ npm install

# Build the module in dev mode with watch,
# so when you make a change it will rebuild the project.
#
# This will build unoptimized javascript code of the module. 
$ npm run dev

# Build optimized javascript code of the module.
$ npm run build
```
