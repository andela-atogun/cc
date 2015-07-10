'use strict'

var app = angular.module('CreativeCoApp', [
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('UserProfile', {
      url: '/',
      templateUrl: 'partials/'
    });
})
.directive('topbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/header.html',
    replace: true
  };
})
.directive('avatar', function() {
  return {
    restrict: 'A',
      link: function(scope, element, attrs) {
        var styles = {
          background: 'url(' + attrs.id + ')' + ' no-repeat center center',
          'background-size': 'cover'
        };
        $(element).css(styles);
      }
  };
})
.directive('sidebar', function() {

  return {
    restrict: 'E',
    templateUrl: 'partials/sidebar.html',
    replace: true
  };
});




