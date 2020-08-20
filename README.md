[PostCSS]:                 https://github.com/postcss/postcss

# PostCSS Hidden [![Build Status](https://travis-ci.org/lukelarsen/postcss-hidden.svg?branch=master)](https://travis-ci.org/lukelarsen/postcss-hidden)

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo-leftp.png">

[PostCSS] plugin for hiding things.

There are a few things to think about when hiding things via css. Do you want your item hidden completely? Do you want it to be seen by screen readers? Should it be invisible but still take up space? Based on what you need there are three options you can use with this plugin.

### 1. display: disappear;
Use disappear when you want to remove something completely from the page. This includes hiding the item screen readers and assistive technology. It will do this with display: none !important;.

```css
h1 {
    display: disappear;
}
```

Will output:

```css
h1 {
    display: none !important;
    visibility: hidden;
}
```

### 2. display: hidden;
Use hidden when you want to hide something but keep it available to screen readers and assistive technology. It will not use up space in the document flow.

```css
h2{
    display: hidden;
}
```

Will output:

```css
h2{
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
}

h2.focusable:active,
h2.focusable:focus {
    display: table;
    position: static;
    clear: both;
}
```

### 3. display: invisible;
Use invisible when you want to hide something and make it hidden to screen readers and assistive technology. It will take up space in the document. The block will only be visually hidden.

```css
h3{
    display: invisible;
}
```

Will output

```css
h3{
    visibility: hidden;
}
```

## Usage

```
npm install postcss-hidden --save-dev
```

### Gulp
```js
var postcss = require('gulp-postcss');
var hidden = require('postcss-hidden');

gulp.task('css', function () {
    var processors = [
        hidden
    ];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));
});
```
