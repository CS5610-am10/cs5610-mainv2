var app = angular.module("BeingChefApp", ['ngRoute']);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: 'being_chef/home/home.html',
        controller: 'HomeCtrl'
    })
    .when('/detail/:recipeId', {
        templateUrl: 'being_chef/details/details.html',
        controller: 'DetailsCtrl',
    })
    .otherwise({
         redirectTo: '/home'
     });
});
