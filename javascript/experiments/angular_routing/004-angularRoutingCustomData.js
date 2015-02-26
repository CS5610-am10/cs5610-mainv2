var app = angular.module('AngularRoutingCustomDataApp', ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/page1', {
                templateUrl: 'partials/page1.html',
                controller: 'Page1Controller',
                footer: 'This is Page 1 footer'
            }).
            when('/page2', {
                templateUrl: 'partials/page2.html',
                controller: 'Page2Controller',
                footer: 'This is Page 2 footer'
            }).
            otherwise({
                redirectTo : '/page1'
            });
    }]);

app.controller("Page1Controller", function ($scope, $route) {
    $scope.footer = $route.current.footer;
});

app.controller("Page2Controller", function ($scope, $route) {
    $scope.footer = $route.current.footer;
});

