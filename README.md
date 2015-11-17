# PostCSS Hidden

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo-leftp.png">

[PostCSS] plugin for hiding things.

```css
h1 {
    display: disappear;
}

h2{
    display: hidden;
}

h3{
    display: invisible;
}
```

```css
h1 {
    display: none !important;
    visibility: hidden;
}

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

h3{
    visibility: hidden;
}
```

## Usage

```
npm install postcss-hidden
```

### Gulp
```js
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