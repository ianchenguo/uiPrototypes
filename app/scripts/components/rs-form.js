(function () {
    angular
        .module('rsForm')
        .directive('rsFormContainer', ['definitions', function (definitions) {

            var ddo = {
                template: '<rs-form-section ui-def="vm.uiDef"></rs-form-section>',
                scope: {

                },

                controllerAs: 'vm',
                bindToController: true,
                controller: function ($scope) {
                    var vm = this;
                    vm.uiDef = definitions.uiDef;
                },
                compile: function (tEl, tAttrs) {


                    return {
                        pre: function (scope, el, attrs, ctrl, transclude) {

                        },
                        post: function (scope, el, attrs, ctrl, transclude) {

                        }
                    }
                }
            };

            return ddo;

        }]);

    angular
        .module('rsForm')
        .directive('rsFormSection', [function () {

            var ddo = {
                template: '<rs-form-children ui-def="vm.uiDef.ch[$index]" parent-ui-def="vm.uiDef"></rs-form-children>',
                scope: {
                    uiDef: '='
                },
                controllerAs: 'vm',
                bindToController: true,
                controller: function ($scope) {
                    var vm = this;
                },
                compile: function (tEl, tAttrs) {


                    return {
                        pre: function (scope, el, attrs, ctrl, transclude) {

                        },
                        post: function (scope, el, attrs, ctrl, transclude) {

                        }
                    }
                }
            };

            return ddo;

        }]);

    angular
        .module('rsForm')
        .directive('rsFormArraySection', [function () {

            var ddo = {
                template: '<rs-form-children ng-repeat="child in vm.children" child-data="child" ui-def="vm.uiDef.ch[$index]" parent-ui-def="vm.uiDef"></rs-form-children>',
                scope: {
                    uiDef: '='
                },
                controllerAs: 'vm',
                bindToController: true,
                controller: function ($scope) {
                    var vm = this;
                    vm.children = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

                },
                compile: function (tEl, tAttrs) {


                    return {
                        pre: function (scope, el, attrs, ctrl, transclude) {

                        },
                        post: function (scope, el, attrs, ctrl, transclude) {

                        }
                    }
                }
            };

            return ddo;

        }]);

    angular
        .module('rsForm')
        .directive('rsFormChildren', ['$compile', function ($compile) {

            var ddo = {
                scope: false,
                priority: 1500,
                terminal: true,
                compile: function (tEl, tAttrs) {

                    var attrMappings = [];
                    for (var attr in tAttrs.$attr) {
                        attrMappings.push({
                            key: tAttrs.$attr[attr],
                            value: tAttrs[attr]
                        });
                    }

                    //var key = Math.random();
                    //console.log(key + ' in rs-form-children compile');

                    return {
                        pre: function (scope, el, attrs, ctrl, transclude) {
                            //console.log(key + ' in rs-form-children pre-link');
                        },
                        post: function (scope, el, attrs, ctrl, transclude) {
                            //console.log(key + ' in rs-form-children post-link');
                            var parentUiDef = scope.$eval(attrs.parentUiDef);

                            var childSegment = angular.element(document.createDocumentFragment());
                            // create child elements
                            var childIndex = 0;
                            parentUiDef.ch.forEach(function (ch) {
                                //console.log(key + ' in rs-form-children post-link loop ' + childIndex + ' ' + ch.component);
                                var childTemplate = '<' + ch.component + '></' + ch.component + '>';
                                var childElement = angular.element(childTemplate);

                                attrMappings.forEach(function (mapping) {
                                    if (mapping.value.includes('$index')) mapping.value = mapping.value.replace('$index', childIndex);
                                    childElement.attr(mapping.key, mapping.value);
                                });

                                var clonedChildElement = $compile(childElement)(scope, function (clonedChildElement, scope) {
                                    //console.log(key + ' in rs-form-children post-link loop ' + childIndex + ' compile function for ' + ch.component);
                                    childSegment.append(clonedChildElement);
                                });

                                childIndex++;
                            });


                            el.replaceWith(childSegment);
                        }
                    }
                }
            };

            return ddo;

        }]);



    angular
        .module('rsForm')
        .directive('rsFormInput', function () {

            var ddo = {
                template: '{{vm.childData}} {{vm.title}} <input rs-attrs="vm.attrs" />',
                scope: {
                    uiDef: '=',
                    childData: '='
                },
                controllerAs: 'vm',
                bindToController: true,
                controller: function ($scope) {
                    var vm = this;
                    vm.attrs = vm.uiDef.attrs;
                    vm.title = vm.uiDef.meta.desc;
                    
                },
                compile: function (tEl, tAttrs) {

                }
            };

            return ddo;

        });



    angular
        .module('rsForm')
        .directive('rsAttrs', function () {
            var ddo = {
                scope: false,
                link: function (scope, elem, attrs) {
                    angular.forEach(scope.vm.attrs, function (value, key) {
                        elem.attr(key, value);
                    });
                }
            };

            return ddo;
        });






} ());