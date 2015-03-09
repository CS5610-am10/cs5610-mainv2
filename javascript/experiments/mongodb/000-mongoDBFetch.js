var app = angular.module("CourseApp", []);
app.controller("CourseAppController", function ($scope, $http) {
    console.log('hello');
    $http.jsonp("http://cs5610-am10.rhcloud.com/course?callback=JSON_CALLBACK").
        success(function (courses) {
            console.log(courses);
            $scope.courses = courses;
        });
})