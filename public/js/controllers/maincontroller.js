'use strict';

app.controller('mainController', ['$scope', '$timeout', '$q', function($scope, $timeout, $q){
  $scope.name = "CreativeCoApp";
  $scope.location = {name: 'Lagos'};
  $scope.jobTag = {name: 'Photographer'};
  // $scope.interests = {names: ['Conceptual', 'Fine-Art', 'Commercial']};
  $scope.bio = 'Joey L. is an entirely new breed of photographer who brings photojournalism to the fine art arena. The dignity and beauty that he portrays in peoples of rapidly vanishing cultures are incredibly important in getting their message out to the world.';

  $scope.chips = function ($timeout, $q) {
    var self = this;
    console.log('fjijeij');
    this.interests = ['Conceptual', 'Fine-Art', 'Commercial'];
  };

  $scope.user = {
    name: 'Joey L',
    avatar: '../images/joey.jpeg',
    email: 'joey@gmail.com'
  };

  $scope.posts = [];
  $scope.newPost = {posted_by: '', text: '', created_at: ''};
  $scope.post = function() {
    $scope.newPost.created_at = Date.now();
    $scope.posts.push($scope.newPost);
    $scope.newPost = {
      posted_by: '',
      text: '',
      created_at: ''
    };
  };
}]);
