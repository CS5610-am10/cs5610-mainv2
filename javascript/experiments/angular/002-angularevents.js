var app = angular.module("EventApp", []);
app.controller("EventAppController", function ($scope, $http) {
    $scope.reverseVar = false;
    var movies = [
        {
            "title": "Godfather",
            "year": 1994,
            "rating": 9.2
        },
        {
            "title": "The Dark Knight",
            "year": 2008,
            "rating": 8.9
        },
        {
            "title": "Psycho",
            "year": 1960,
            "rating": 8.5
        },
        {
            "title": "Goodfellas",
            "year": 1990,
            "rating": 8.7
        },
    ];

    $scope.movies = movies;

    sortVar = 'title';

    $scope.sortFunc = function (movie) {
        return movie[sortVar];
    }

    $scope.sortDescendingYear = function () {
        sortVar = 'year';
        $scope.reverseVar = true;
    }

    $scope.sortAscendingYear = function () {
        sortVar = 'year';
        $scope.reverseVar = false;
    }

    $scope.sortDescendingRating = function () {
        sortVar = 'rating';
        $scope.reverseVar = true;
    }

    $scope.sortAscendingRating = function () {
        sortVar = 'rating';
        $scope.reverseVar = false;
    }
});