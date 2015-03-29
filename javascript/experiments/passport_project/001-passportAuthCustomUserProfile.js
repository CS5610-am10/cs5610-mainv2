var app = angular.module("PassportApp", ["ngRoute"]);

app.controller("PassportAppCtrl", function ($scope, $http, $location, $rootScope) {
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
        controller: 'ProfileCtrl',
        resolve: {
            loggedin: isLoggedin
        }
    }).
     otherwise({
         redirectTo: '/home'
     });
});

var isLoggedin = function ($q, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
            // User is Not Authenticated
        else {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};
