var app = angular.module('AngularRoutingShareDataApp', ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'fakebook/home.html',
                controller: 'HomeController'
            }).
            when('/friends', {
                templateUrl: 'fakebook/friends.html',
                controller: 'FriendsController'
            }).
            otherwise({
                redirectTo : '/home'
            });
    }]);

app.controller("HomeController", function ($scope, FakebookService) {
    $scope.people = FakebookService.getPeople();

    $scope.addFriend = function (person) {
        FakebookService.addFriend(person);
    }
});

app.controller("FriendsController", function ($scope, FakebookService) {
    $scope.friends = FakebookService.getFriends();

    $scope.removeFriend = function (friend) {
        FakebookService.removeFriend(friend);
    }
});
