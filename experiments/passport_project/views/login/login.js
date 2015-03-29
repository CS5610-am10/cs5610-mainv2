app.controller("LoginCtrl", function ($scope, $http, $location, $rootScope) {
    $scope.login = function (user) {
        $http.post("/login", user)
        .success(function (response, status) {
            $scope.loginStatus = 'Logged in successfully !!!';
            console.log(response);
            $location.url("/profile");
        })
        .error(function (response, status) {
            if (status == 401) {
                $rootScope.errorMessage = 'User authentication failed.';
            }
        });
    }
});