﻿app.controller("LoginCtrl", function ($scope, $http, $location, $rootScope) {
    $scope.login = function (user) {
        $http.post("/login", user)
        .success(function (response, status) {
            $rootScope.loginStatus = 'Hi '+ response.firstName;
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