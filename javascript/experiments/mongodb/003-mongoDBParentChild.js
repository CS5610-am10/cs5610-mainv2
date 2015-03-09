var app = angular.module("ProductApp", []);
app.controller("ProductAppController", function ($scope, $http) {
    $scope.productsFound = true;
    //cs5610-am10.rhcloud.com
    $http.jsonp("http://cs5610-am10.rhcloud.com/product_category?callback=JSON_CALLBACK").
        success(function (productCategories) {
            $scope.productCategories = productCategories;
            $scope.currentProductCategory = productCategories[0];
        });

    $scope.searchProducts = function () {
        console.log($scope.productSearchString);
        console.log($scope.currentProductCategory._id);
        $http.jsonp("http://cs5610-am10.rhcloud.com/product_category/" + $scope.currentProductCategory._id + "/product?search=" + $scope.productSearchString + "&callback=JSON_CALLBACK").
        success(function (products) {
            $scope.products = products;
            if (products.length < 1) {
                $scope.productsFound = false;
            } else {
                $scope.productsFound = true;
            }
        });
    }

})