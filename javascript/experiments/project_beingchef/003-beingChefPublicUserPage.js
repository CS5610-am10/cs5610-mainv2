var app = angular.module("BeingChefApp", ['ui.bootstrap']);

app.controller("BeingChefCtrl", function ($scope, $modal, $http, $rootScope, BeingChefService) {

    var username = "test";
    $scope.username = username;
    $scope.active = true;
    $scope.active1 = true;
    $scope.isFollow = false;
    
    $scope.isUserSameAsLoggedin = false;
   
    BeingChefService.getUserByUsername(username, function (response) {
        if (response != null) {
            $scope.userid = response.user._id;
            $scope.favorites = response.user.favorites;
            $scope.reviews = response.userReviews;
            for (i in $scope.reviews) {
                $scope.reviews[i].timeSpan = humanized_time_span($scope.reviews[i].creationDate);
            }
        }
    });

    $(function () {
        $('#rating').on('change', function () {
            $scope.currentRating = $(this).val();
        });
    });
});

app.filter('range', function () {
    return function (val, range) {
        range = parseInt(range);
        for (var i = 0; i < range; i++)
            val.push(i);
        return val;
    };
});