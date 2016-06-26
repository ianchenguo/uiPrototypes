angular
  .module('rsModels')
  .factory('definitions', [function () {

    var expendDef = function (width, depth, numberOfInput) {

      var source = {
        modelPath: Math.random(),
        component: "rs-form-section",
        meta: {},
        attrs: {},
        ch: []
      };

      for (var i = 0; i < width; i++) {
        var leaf = angular.copy(source);
        leaf.modelPath = Math.random();
        source.ch.push(leaf);
        nestDef2(leaf, depth - 3, numberOfInput);
      }

      return source;
    };

    var nestDef2 = function (source, depth, numberOfInput) {

      var leaf = source;
      for (var i = 0; i < depth; i++) {
        var newLeaf = angular.copy(source);
        newLeaf.modelPath = Math.random();
        leaf.ch = [newLeaf];
        leaf = newLeaf;
      }

      var sourceInput = {
        component: "rs-form-input",
        modelPath: Math.random(),
        meta: {
          desc: "unit number"
        },
        attrs: {
          name: "unitNumber",
          type: "text",
          value: "unit number"
        }
      };

      leaf.component = 'rs-form-array-section';
      leaf.ch = [sourceInput];

    }

    var nestDef = function (source, depth, numberOfInput) {

      var leaf = source;
      for (var i = 0; i < depth; i++) {
        var newLeaf = angular.copy(source);
        newLeaf.modelPath = Math.random();
        leaf.ch = [newLeaf];
        leaf = newLeaf;
      }

      var sourceInput = {
        component: "rs-form-input",
        modelPath: Math.random(),
        meta: {
          desc: "unit number"
        },
        attrs: {
          name: "unitNumber",
          type: "text",
          value: "unit number"
        }
      };

      leaf.ch = [];

      var count = numberOfInput;
      while (count > 0) {
        var input = angular.copy(sourceInput);
        input.modelPath = Math.random();
        leaf.ch.push(input);
        count--;
      }
      return source;
    }

    var uiDef = expendDef(10, 10, 10);

    // var uiDef = {
    //   component: "rs-form-section",
    //   modelPath: Math.random(),
    //   meta: {
    //     isArray: false,
    //   },
    //   attrs: {

    //   },
    //   ch: [{
    //     component: "rs-form-section",
    //     modelPath: Math.random(),
    //     meta: {
    //       isArray: false,
    //     },
    //     attrs: {

    //     },
    //     ch: [{
    //       component: "rs-form-input",
    //       modelPath: Math.random(),
    //       meta: {
    //         desc: "unit number"
    //       },
    //       attrs: {
    //         name: "unitNumber",
    //         type: "text",
    //         value: "unit number"
    //       }
    //     }]
    //   }]
    // };

    // var uiDef = {
    //   component: "rs-form-section",
    //   modelPath: Math.random(),
    //   meta: {
    //     isArray: false,
    //   },
    //   attrs: {

    //   },
    //   ch: []
    // };
    
    return {
      uiDef: uiDef
    };
  }]);