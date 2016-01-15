var postcss = require('postcss');

module.exports = postcss.plugin('hidden', function hidden(options) {
    return function(css) {
        options = options || {};
        // Only search for display properties
        css.walkDecls('display', function(decl, i) {
            var value = decl.value;

            if (value.indexOf('disappear') !== -1) {
                // Insert disappear css
                decl.cloneBefore({ prop: 'display',  value: 'none !important' });
                decl.cloneBefore({ prop: 'visibility',  value: 'hidden' });

                // Remove original declaration
                decl.remove();
            }

            if (value.indexOf('hidden') !== -1) {
                var origRule = decl.parent,
                    ruleSelectors = origRule.selectors,
                    newRule;

                ruleSelectors = ruleSelectors.map(function(ruleSelector){
                    return ruleSelector + '.focusable:active,' + ruleSelector + '.focusable:focus';
                });

                // Insert the :active rule after the original rule
                newRule = origRule.cloneAfter({
                    selectors: ruleSelectors
                }).removeAll();

                newRule.append('display: table; position: static; clear: both;');

                // Insert visually hidden css
                decl.cloneBefore({ prop: 'position',  value: 'absolute' });
                decl.cloneBefore({ prop: 'width',  value: '1px' });
                decl.cloneBefore({ prop: 'height',  value: '1px' });
                decl.cloneBefore({ prop: 'margin',  value: '-1px' });
                decl.cloneBefore({ prop: 'padding',  value: '0' });
                decl.cloneBefore({ prop: 'border',  value: '0' });
                decl.cloneBefore({ prop: 'overflow',  value: 'hidden' });
                decl.cloneBefore({ prop: 'clip',  value: 'rect(0 0 0 0)' });

                // Remove the original declaration
                decl.remove();
            }

            if (value.indexOf('invisible') !== -1) {
                // Insert invisible css
                decl.cloneBefore({ prop: 'visibility',  value: 'hidden' });

                // Remove original declaration
                decl.remove();
            }
        });
    };
});
