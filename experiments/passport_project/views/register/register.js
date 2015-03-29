app.controller("RegisterCtrl", function ($scope, $http, $location, $rootScope) {
    $scope.user = {};
    $scope.addDish = function () {
        console.log($scope.dishItem);
        if (!$scope.user.favorites) {
            $scope.user.favorites = [];
        }
        $scope.user.favorites.push(($scope.dishItem));
    };
    $scope.registerUser = function () {
        console.log($scope.user);
        $http.post("/register", $scope.user)
             .success(function (response) {
                 console.log(response);
                 if (response != null) {
                     $rootScope.currentUser = response;
                     $location.url("/profile");
                 }
             });
        
    }
});