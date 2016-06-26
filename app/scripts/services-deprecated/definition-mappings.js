angular
    .module('rsServices')
    .factory('definitionMappings', ['definitions', function (definitions) {

        var uiDef = definitions.uiDef;

        var DefRecord = Immutable.Record({
            parentTemplateElement: {},
            uiDef: {}
        });

        var parentMappings = Immutable.Map();
        
        
        
        var registerRoot = function (containerTemplateElement) {
            parentMappings = parentMappings.set(uiDef.modelPath, 
            new DefRecord({parentTemplateElement: containerTemplateElement, uiDef: uiDef}));
            
        }

        var registerChildren = function (currentDef, currentTemplateElement) {

            if (Array.isArray(currentDef.ch)) {
                currentDef.ch.forEach(function (child) {
                    parentMappings = parentMappings.set(child.modelPath, 
                    new DefRecord({parentTemplateElement: currentTemplateElement, uiDef: currentDef}));
                })
            }
            
        }
        
        var getDefRecord = function(modelPath){
            return parentMappings.get(modelPath);
        };

        return {
            registerRoot: registerRoot,
            registerChildren: registerChildren,
            getDefRecord: getDefRecord
        };
    }]);