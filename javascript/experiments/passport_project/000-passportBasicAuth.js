var app = angular.module("PassportApp", ["ngRoute"]);


app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
     .when('/login', {
         templateUrl: 'views/login/login.html',
         controller: 'LoginCtrl',
     })
    .when('/home', {
        templateUrl: 'views/home/home.html'
        //controller: 'LoginController',
    })
    .when('/profile', {
        templateUrl: 'views/profile/profile.html',
        //controller: 'LoginCtrl',
    }).
     otherwise({
         redirectTo: '/home'
     });
});

app.controller("PassportAppController", function ($scope, $http) {
    console.log('hello');
})
