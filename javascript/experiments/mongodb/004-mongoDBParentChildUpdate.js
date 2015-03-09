var app = angular.module("ProductApp", []);

app.factory('ProductService', function ($http) {
    var findAll = function (callback) {
        $http.jsonp("http://cs5610-am10.rhcloud.com/product_category?callback=JSON_CALLBACK").
        success(callback);
    }

    var incrementProductCount = function (productCategoryId, product, callback) {
        product.count = product.count + 1;
        $http.put("http://cs5610-am10.rhcloud.com/product_category/" + productCategoryId + "/product/" + product._id, product).
        success(callback);
    }

    var decrementProductCount = function (productCategoryId, product, callback) {
        product.count = product.count - 1;
        $http.put("http://cs5610-am10.rhcloud.com/product_category/" + productCategoryId + "/product/" + product._id, product).
        success(callback);
    }

    var removeProduct = function (productCategoryId, productId, callback) {
        $http.delete("http://cs5610-am10.rhcloud.com/product_category/" + productCategoryId + "/product/" + productId).
        success(callback);
    }

    var addProduct = function (productCategoryId, product, callback) {
        $http.post("http://cs5610-am10.rhcloud.com/product_category/" + productCategoryId, product).
        success(callback);
    }

    return {
        findAll: findAll,
        incrementProductCount: incrementProductCount,
        addProduct: addProduct,
        removeProduct: removeProduct
    }
});
app.controller("ProductAppController", function ($scope, $http, ProductService) {
    ProductService.findAll(function (productCategories) {
        $scope.productCategories = productCategories;
        var currentProductCategory = productCategories[0];
        $scope.currentProductCategory = currentProductCategory;
        $scope.products = currentProductCategory.products;
    })

    $scope.updateCurrentProduct = function () {
        $scope.products = $scope.currentProductCategory.products;
    }
    
    $scope.incrementProductCount = function (index) {
        ProductService.incrementProductCount($scope.currentProductCategory._id, 
            $scope.products[index], function (product) {
                $scope.products[index] = product;
            })
    }

    $scope.decrementProductCount = function (index) {
        ProductService.decrementProductCount($scope.currentProductCategory._id,
            $scope.products[index], function (product) {
                $scope.products[index] = product;
            })
    }

    $scope.addProduct = function (newProduct) {
        ProductService.addProduct($scope.currentProductCategory._id,
            newProduct, function (products) {
                $scope.products = products;
            })
    }

    $scope.removeProduct = function (productId) {
        ProductService.removeProduct($scope.currentProductCategory._id,
            productId, function (products) {
                $scope.products = products;
            })
    }
})