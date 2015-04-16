var app = angular.module("BeingChefApp", []);

app.controller("BeingChefCtrl", function ($scope, BeingChefService) {
    $('ul.tabs li').click(function () {

        var tab_id = $(this).attr('data-target');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $(tab_id).addClass('current');
    })

    BeingChefService.getUserByUsername("test", function (data) {
        BeingChefService.getFavorites(data.user._id, function (favorites) {
            console.log(favorites);
            $scope.favorites = favorites;
        })

        BeingChefService.getReviewsByUser(data.user._id, function (reviews) {
            $scope.reviews = reviews;
            for (i in $scope.reviews) {
                $scope.reviews[i].timeSpan = humanized_time_span($scope.reviews[i].creationDate);
            }
        })
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