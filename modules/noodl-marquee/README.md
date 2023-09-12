# noodl-marquee

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
