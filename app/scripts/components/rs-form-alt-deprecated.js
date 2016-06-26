// DONE:
// definition traversal
// recursive rendering
// scope variable inheritence
// ng-repeat in array def

// TODO:
// centralised path - model - def mapping
// ng-form and ng-model integration


(function () {

    angular
        .module('rsForm')
        .directive('rsFormContainer', ['formBuilder', '$compile', 'definitions', function (formBuilder, $compile, definitions) {

            var ddo = {
                scope: {},
                template: '<rs-transclude></rs-transclude>',
                controllerAs: 'vm',
                bindToController: true,
                controller: function ($scope) {
                    var vm = this;
                    vm.uiDef = definitions.uiDef;
                    // console.log('form container scope start');
                    // console.log($scope);
                    // console.log('form container scope end');
                },
                compile: function (tEl, tAttrs) {

                    tEl.empty();

                    var formSegment = formBuilder.buildForm(tEl);
                    tEl.append(formSegment);
                    //inject uiDef to root section                    
                    tEl.find('rs-form-section').attr('ui-def', 'vm.uiDef');

                    return function (scope, el, attrs, ctrl) {
                        //console.log(el);

                    }
                }
            };

            return ddo;
        }]);

    angular
        .module('rsForm')
        .directive('rsTransclude', ['$compile', function ($compile) {

            var ddo = {
                priority: 1500,
                terminal: true,
                compile: function (tEl, tAttrs) {

                    var attrMappings = [];
                    for (attr in tAttrs.$attr) {
                        attrMappings.push({
                            key: tAttrs.$attr[attr],
                            value: tAttrs[attr]
                        });
                    }
                    

                    return function (scope, el, attrs, ctrl, transclude) {

                        attrMappings.forEach(function (mapping) {
                            if (mapping.value.includes('$index')) mapping.value = mapping.value.replace('$index', childIndex);
                            childElement.attr(mapping.key, mapping.value);
                        });

                        transclude(scope, function (clone, scope) {

                            // console.log('form transclude scope start');
                            // console.log(scope);
                            // console.log('form transclude scope end');

                            //console.log(clone);


                            el.replaceWith(clone);
                        });
                    }
                }
            };

            return ddo;
        }]);


    angular
        .module('rsForm')
        .directive('rsFormSection', function () {

            var ddo = {
                template: '<rs-transclude></rs-transclude>',
                scope: {
                    uiDef: '='
                },
                transclude: true,
                controllerAs: 'vm',
                bindToController: true,
                controller: function ($scope) {
                    var vm = this;
                    // console.log('form section scope start');
                    // console.log($scope);
                    // console.log('form section scope end');
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
        });


    //   angular
    //     .module('rsForm')
    //     .directive('rsFormArraySection', function($compile) {

    //       var ddo = {
    //         template: '<rs-transclude></rs-transclude>',
    //         scope: {
    //           uiDef: '='
    //         },
    //         transclude: true,
    //         controllerAs: 'vm',
    //         bindToController: true,
    //         controller: function($scope) {
    //           var vm = this;
    //           vm.children = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    //         },
    //         compile: function(tEl, tAttrs) {

    //           return function(scope, el, attrs, ctrl, transclude) {

    //             // TODO: destroy scope
    //             transclude(scope, function(clone, scope) {

    //               angular.element(el.find('rs-transclude')[0]).replaceWith(clone);
    //             });
    //           }
    //         }
    //       };

    //       return ddo;
    //     });


    angular
        .module('rsForm')
        .directive('rsFormInput', function () {

            var ddo = {
                template: 'unit number <input rs-attrs="vm.attrs" />',
                scope: {
                    attrs: '=',
                    uiDef: '=',
                    doubleBind: "="
                },
                controllerAs: 'vm',
                bindToController: true,
                controller: function ($scope) {
                    var vm = this;
                    //console.log('form input scope start');
                    //console.log($scope);
                    //console.log('form input scope end');
                },
                compile: function (tEl, tAttrs) {

                }
            };

            return ddo;

        });






})();