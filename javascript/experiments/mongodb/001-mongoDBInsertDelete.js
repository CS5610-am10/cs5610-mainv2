var app = angular.module("CourseApp", []);
app.controller("CourseAppController", function ($scope, $http) {
    
    $http.jsonp("http://cs5610-am10.rhcloud.com/course?callback=JSON_CALLBACK").
        success(function (courses) {
            $scope.courses = courses;
        });

    $scope.removeCourse = function (id) {
        $http.delete("http://cs5610-am10.rhcloud.com/course/" + id).
        success(function (courses) {
            $scope.courses = courses;
        });
    }

    $scope.addCourse = function (course) {
        $http.post("http://cs5610-am10.rhcloud.com/course/", course).
        success(function (courses) {
            $scope.courses = courses;
            $scope.course = {}
        });
    }
})