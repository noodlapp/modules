# Noodl Modules - Expand Noodl with Custom Core Nodes

## Overview

Noodl Modules is a collection of custom modules written in JavaScript or TypeScript that expand the functionality of Noodl by introducing new core nodes
These modules are designed to enhance your Noodl development experience and provide additional capabilities for building interactive web applications.

## SDK

Not all the modules in this repository is using the SDK.
The way the SDK is built is a wrapper around the core Noodl API, 
is it recommended to always use the SDK, but in some cases the SDK is limited.

Our internal core Noodl API might change in the future so the modules will not be compatible.

Here is a list of all the modules in this repository that is using the SDK:

- [Custom HTML](modules/custom-html-module)
- [Data Context](modules/data-context)
- [Geospatial Analysis](modules/geospatial-analysis)
- [Google Analytics Module](modules/google-analytics-module)
- [Mapbox](modules/mapbox)
- [Chart.js](modules/noodl-chartjs)
- [GraphQL](modules/noodl-graphql-module)
- [Google Sheets](modules/noodl-gsheets-module)
- [i18next Module](modules/noodl-i18next-module)
- [Lottie](modules/noodl-lottie-module)
- [Markdown](modules/noodl-markdown-module)

and more...

## Installation

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

## Contributing

[How to write a module?](https://docs.noodl.net/#/javascript/extending/overview/)
