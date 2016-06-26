'use strict';

/**
 * @ngdoc overview
 * @name uiProjectApp
 * @description
 * # uiProjectApp
 *
 * Main module of the application.
 */
angular
  .module('uiProjectApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'rsForm',
    'rsModels',
    'rsServices'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('rsServices',[]);
angular.module('rsForm',[]);
angular.module('rsModels',[]);