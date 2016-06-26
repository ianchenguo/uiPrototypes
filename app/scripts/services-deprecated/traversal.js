// pre-order depth-first non-recursive reversal
angular
    .module('rsServices')
    .factory('traversal', [function () {

        var traverse = function traverse(root, childrenLocator, action) {

            var stack = [];

            stack.push(root);

            var addChild = function (child) {
                stack.push(child);
            };

            while (stack.length > 0) {

                var obj = stack.pop();

                action(obj);

                var children = childrenLocator(obj);

                if (Array.isArray(children)) {
                    children.forEach(addChild);
                }
            }
        };
        
        return {
            traverse: traverse
        };
    }]);