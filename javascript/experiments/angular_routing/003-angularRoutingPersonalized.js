var app = angular.module('AngularRoutingPersonalized', ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'amazing_shopping/home.html'
            }).
            when('/myorders', {
                templateUrl: 'amazing_shopping/myorders.html',
                controller: 'MyOrdersController'
            }).
            when('/myrecommendations', {
                templateUrl: 'amazing_shopping/myrecommendations.html',
                controller: 'MyRecommendationsController'
            }).
            otherwise({
                redirectTo : '/home'
            });
    }]);

app.controller("MyRecommendationsController", function ($scope, AmazingShoppingService) {
    $scope.myRecommendations = AmazingShoppingService.getMyRecommendations();
});

app.controller("MyOrdersController", function ($scope, AmazingShoppingService) {
    $scope.myOrders = AmazingShoppingService.getMyOrders();
});

app.controller("PersonalizedController", function ($scope, AmazingShoppingService) {
    $scope.isUserLoggedIn = false;

    $scope.login = function () {
        console.log($scope.username);

        AmazingShoppingService.login($scope.username);
        $scope.isUserLoggedIn = true;
    }
});


app.factory("AmazingShoppingService", function () {
    var username = null;
    var myOrders = null;
    var myRecommendations = null;

    var recommendations = [
        {
            "username": "alice",
            "recommendations": ["Lenovo Z500 Laptop", "HP XYZ laptop bag", "Apple Juice"]
        },
        {
            "username": "bob",
            "recommendations": ["CK Jacket", "Northface Apex Bionic", "Godfather DVD - All Parts Pack"]
        }
    ];

    var orders = [
        {
            "username": "alice",
            "orders": ["Lenovo 769 Mouse", "Nature Valley Protein bar 10 pack box"]
        },
        {
            "username": "bob",
            "orders": ["Columbia windproof fleece", "Scarface DVD"]
        }
    ];

    var login = function (name) {
        username = name;
        populateMyOrders(name);
        populateMyRecommendations(name);
    }

    var populateMyOrders = function (name) {
        for (var index in orders) {
            if (orders[index].username == name) {
                myOrders = orders[index].orders;
                return;
            }
        }
        myOrders = null;
    }

    var populateMyRecommendations = function (name) {
        for (var index in recommendations) {
            if (recommendations[index].username == name) {
                myRecommendations = recommendations[index].recommendations;
                return;
            }
        }
        myRecommendations = null;
    }

    var getMyOrders = function () {
        return myOrders;
    }

    var getMyRecommendations = function () {
        return myRecommendations;
    }

    return {
        login : login,
        getMyOrders: getMyOrders,
        getMyRecommendations: getMyRecommendations
    }

});
