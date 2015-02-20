var app = angular.module('AngularBasicRoutingApp', ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/page1', {
                templateUrl: 'partials/page1.html'
            }).
            when('/page2', {
                templateUrl: 'partials/page2.html'
            }).
            otherwise({
                redirectTo : '/page1'
            });
    }]);