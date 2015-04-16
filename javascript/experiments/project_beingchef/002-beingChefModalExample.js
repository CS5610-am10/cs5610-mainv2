var app = angular.module("BeingChefApp", ['ui.bootstrap']);

app.controller("BeingChefCtrl", function ($scope, $modal, $http, $rootScope, BeingChefService) {
    $scope.isSuccess = false;
    $scope.successMessage = null;

    $scope.logout = function () {
        BeingChefService.logout(function () {
            $rootScope.currentUser = null;
        });
    };

    $scope.dismissSuccessMessage = function () {
        $scope.isSuccess = false;
        $scope.successMessage = null;
    }

    $scope.showLoginRegisterForm = function (type) {
        var modalInstance = $modal.open({
            templateUrl: 'login-register.html',
            controller: LoginRegisterCtrl,
            scope: $scope,
            resolve: {
                type: function () {
                    return type
                }
            }
        });
        modalInstance.result.then(function () {
            if ($rootScope.currentUser != null) {
                $scope.isSuccess = true;
                $scope.successMessage = "User login successful!!!"
            }
        });
    }
    
});

var LoginRegisterCtrl = function ($rootScope, $scope, $modalInstance, type, BeingChefService) {

    var loginHeader = 'Login to Your Account';
    var registerHeader = 'Register New Account';
    if (type == 'register') {
        $scope.isLogin = false;
        $scope.header = registerHeader;
    } else {
        $scope.isLogin = true;
        $scope.header = loginHeader;
    }
    $scope.loginUser = function (user) {
        BeingChefService.loginUser(user, function (response) {
            if (response == null) {
                $scope.errorMessage = 'Invalid username or password';
            } else {
                $rootScope.currentUser = response;
                $modalInstance.close();
            }
        });
    };

    $scope.registerUser = function (user) {
        BeingChefService.registerUser(user, function (response) {
            if (response == null) {
                $scope.errorMessage = 'User already exists';
            } else {
                $rootScope.currentUser = response;
                $modalInstance.close();
            }
        });

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        //$modalInstance.close();
    };

    $scope.showRegisterForm = function () {
        $scope.isLogin = false;
        $scope.header = registerHeader;
    }

    $scope.showLoginForm = function () {
        $scope.isLogin = true;
        $scope.header = loginHeader;
    }

};