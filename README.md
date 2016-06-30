ffconf 2016
===============

## Todo

* [ ] Service worker


## Howto

### Disable minified code while developing the website

* In `node_modules/terraform/lib/stylesheet/processors/scss.js` change `outputStyle: 'compressed'` to `outputStyle: 'expanded'`.

* In `node_modules/terraform/lib/stylesheet/index.js` change `callback(null, minify.css(result.css))` to `callback(null, result.css)`.

* In  `node_modules/terraform/lib/template/processors/jade.js` add `options.pretty = true` before `return jade.compile(fileContents, options)`.


### Convert fonts into JSON

Source: http://crocodillon.com/blog/non-blocking-web-fonts-using-localstorage

Install npm module [font-store](https://github.com/CrocoDillon/font-store), locally it's fine:

```bash
$ mkdir fontstore && cd $_
$ npm install font-store
```

Now generate the Google Fonts link and run:

```bash
$ ./node_modules/font-store/bin/font-store "https://fonts.googleapis.com/css?family=Anonymous+Pro|Rubik:700"
```


### Create favicons

Use https://realfavicongenerator.net

* Favicon for iOS - Web Clip: add a solid background, color `#1A1A1A`, size as default
* Favicon for Android Chrome: no change
* Windows Metro: use the original, color is `blue`
* Safari Pinned Tab: turn your picture into a monochrom icon, threshold as default
* Favicon Generator Options:
  * path: `/images/favicons`
  * app name: `ffconf 2016`

Delete the generated `manifest.json`, we already have our own, just check to reference the images correctly.