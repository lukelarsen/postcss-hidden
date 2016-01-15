var ava = require('ava');
var hidden = require('./');
var postcss = require('postcss');

var tests = [{
    message: 'display - disappear',
    fixture: 'h1{display: disappear}',
    expected: 'h1{display: none !important;visibility: hidden}'
}, {
    message: 'display - hidden',
    fixture: 'h2{display: hidden}',
    expected: [
        'h2{position: absolute;width: 1px;height: 1px;margin: -1px;padding: 0;border: 0;overflow: hidden;clip: rect(0 0 0 0)}',
        'h2.focusable:active,h2.focusable:focus{display: table;position: static;clear: both}'
    ].join('\n')
}, {
    message: 'display - invisible',
    fixture: 'h3{display: invisible}',
    expected: 'h3{visibility: hidden}'
}];

tests.forEach(function (test) {
    ava(test.message, function (t) {
        var result = postcss(hidden).process(test.fixture);
        t.same(result.css, test.expected);
    });
});
