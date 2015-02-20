var app = angular.module('AngularRoutingParameters', ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'restaurant/home.html',
                controller: 'HomeController'
            }).
            when('/details/:dish', {
                templateUrl: 'restaurant/dishDetails.html',
                controller: 'DishDetailsController'
            }).
            otherwise({
                redirectTo : '/home'
            });
    }]);

app.controller("HomeController", function ($scope, RestaurantService) {
    $scope.dishes = RestaurantService.getDishes();
});

app.controller("DishDetailsController", function ($scope, $routeParams, RestaurantService) {
    $scope.dishName = $routeParams.dish;
    var dishDetails = RestaurantService.getDishDetail($routeParams.dish);
    $scope.dishDescription = dishDetails.description;
    $scope.nutritionFacts = dishDetails.nutritionFacts;
});
