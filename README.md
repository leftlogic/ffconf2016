ffconf2015
===============

##### How to disable minified code while developing the website

In `node_modules/terraform/lib/stylesheet/processors/scss.js` change `outputStyle: 'compressed'` to `outputStyle: 'expanded'`.

In `node_modules/terraform/lib/stylesheet/index.js` change `callback(null, minify.css(result.css))` to `callback(null, result.css)`.

In  `node_modules/terraform/lib/template/processors/jade.js` add `options.pretty = true` before `return jade.compile(fileContents, options)`.
