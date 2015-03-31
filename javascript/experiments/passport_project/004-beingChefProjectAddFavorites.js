var app = angular.module("BeingChefApp", ['ngRoute']);

app.controller("BeingChefCtrl", function ($scope, $http, $location, $rootScope) {
    $scope.logout = function () {
        $http.post("/logout")
        .success(function () {
            $rootScope.currentUser = null;
            $location.url("/home");
        });
    };
});

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: 'being_chef/home/home.html',
        controller: 'HomeCtrl'
    })
    .when('/detail/:recipeId', {
        templateUrl: 'being_chef/details/details.html',
        controller: 'DetailsCtrl'
    })
    .when('/login', {
        templateUrl: 'being_chef/login/login.html',
        controller: 'LoginCtrl'
    })
    .when('/favorite', {
        templateUrl: 'being_chef/favorite/favorite.html',
         controller: 'FavoriteCtrl'
     })
    .when('/register', {
        templateUrl: 'being_chef/register/register.html',
        controller: 'RegisterCtrl'
    })
    .otherwise({
         redirectTo: '/home'
     });
});
