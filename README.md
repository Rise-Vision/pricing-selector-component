# pricing-selector-component

UI Component allowing selection of various pricing parameters.

# Usage

``` html
<html>
  <head>
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.2.10/webcomponents-loader.js"></script>
    <script type="module" src="pricing-selector-component.mjs"></script>
  </head>
  <body>
    <pricing-selector-component></pricing-selector-component>
  </body>
</html>
```

The webcomponents-loader.js is a Polymer [requirement](https://polymer-library.polymer-project.org/3.0/docs/polyfills).

# Demo

Start a local http server and load pricing-selector-component-demo.html in browser.

# Testing

### Live browser test

Start a local http server and then browse to pricing-selector-component-test.html.
It's best to load with devtools open and cache disabled.

## Webdriver test

Start a local http server.

Start chromedriver.

``` bash
npm install
npm run test-ci

```

--------

This project does not use WCT since it is fragile and [not well supported](https://github.com/Polymer/tools/issues/3398).
