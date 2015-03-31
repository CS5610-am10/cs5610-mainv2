app.controller("DetailsCtrl", function ($scope, $http, $routeParams, $rootScope, $location) {
    var recipeId = $routeParams.recipeId;
    var apiKey = 'dvx8WTvxP086a6e2UOq8WAEshrVibl4y';
    var url = "http://api.bigoven.com/recipe/"+recipeId+"?api_key=" + apiKey;
    $http.get(url).
        success(function (data) {
            console.log(data.Ingredients);
            console.log(data.Instructions);
            $scope.dish = data;
        })
    $scope.addToFavorite = function (dish) {
        if ($rootScope.currentUser == null) {
            $rootScope.errorMessage = 'You need to log in.';
            $location.url('/login');
        } else {
            var reqData = { user: $rootScope.currentUser._id, dish: dish }
            $http.post('/favorite', reqData)
            .success(function (data) {
                console.log(data);
                $rootScope.currentUser = data;
                $location.url('/favorite');
            })
        }
    }
});
