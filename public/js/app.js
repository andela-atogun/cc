'use strict'

var app = angular.module('CreativeCoApp', [
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/profile');
  $stateProvider
    .state('timeline', {
      url: '/timeline',
      templateUrl: '../views/partials/timeline.html'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '../views/partials/profile.html'
    })
    .state('updates', {
      url: '/updates',
      templateUrl: '../views/partials/updates.html'
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




