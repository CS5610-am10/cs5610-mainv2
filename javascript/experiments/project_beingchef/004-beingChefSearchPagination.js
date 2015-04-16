var app = angular.module("BeingChefApp", ['ui.bootstrap', 'simplePagination']);

app.controller("BeingChefCtrl", function ($scope, $modal, $http, $rootScope, BeingChefService, Pagination) {

    $scope.pageSize = 5;
    $scope.currentPage = 0;

    $scope.nextPage = function () {
        $scope.currentPage = $scope.currentPage + 1;
    }

    $scope.prevPage = function () {
        $scope.currentPage = $scope.currentPage - 1;
    }

    $scope.search = function () {
        var startTime = new Date();
        BeingChefService.searchRecipes($scope.searchText, function (data) {
            $scope.searchResults = data;
            console.log(data);
            if (data.ResultCount == 0) {
                $scope.notFoundString = $scope.searchText;
            }
            var endTime = new Date();
            $scope.secs = (endTime.getTime() - startTime.getTime()) / 1000;

        })
    }
});
