var app = angular.module("ArraysApp", []);
app.controller("ArraysAppController", function ($scope, $http) {
    var items = [
        {
            "isComplete": false,
            "description": "Bread"
        },
        {
            "isComplete": false,
            "description": "Butter"
        },
        {
            "isComplete": false,
            "description": "Apples"
        },
        {
            "isComplete": false,
            "description": "Juice"
        },
    ];

    $scope.items = items;

    $scope.temp = function (item) {
        item.isComplete = !item.isComplete;
    }

    $scope.addItem = function () {
        var newItem = $scope.newItem;
        $scope.items.push({ "isComplete": false, "description": newItem });
        $scope.newItem = null;
    }

    $scope.removeItem = function (item) {
        items.splice(items.indexOf(item), 1);
    }

});