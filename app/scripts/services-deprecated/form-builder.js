angular
    .module('rsServices')
    .factory('formBuilder', ['definitionMappings', 'traversal', 'definitions', function (definitionMappings, traversal, definitions) {

        var buildForm = function (formContainerTemplateElement) {

            var uiDef = definitions.uiDef;
            
            var formSegment = angular.element(document.createDocumentFragment());

            definitionMappings.registerRoot(formSegment);

            traversal.traverse(
                uiDef,
                function (currentUiDef) { return currentUiDef.ch; },
                function (currentUiDef) {

                    var template = '<' + currentUiDef.component + '></' + currentUiDef.component + '>';
                    var currentTemplateElement = angular.element(template);

                    definitionMappings.registerChildren(currentUiDef, currentTemplateElement);

                    var parentEl = definitionMappings.getDefRecord(currentUiDef.modelPath).parentTemplateElement;
                    parentEl.append(currentTemplateElement);

                });

            return formSegment;
        }

        return {
            buildForm: buildForm
        };
    }]);