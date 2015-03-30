app.controller("DetailsCtrl", function ($scope, $http, $routeParams, $rootScope) {
    var recipeId = $routeParams.recipeId;
    var apiKey = 'dvx8WTvxP086a6e2UOq8WAEshrVibl4y';
    var url = "http://api.bigoven.com/recipe/"+recipeId+"?api_key=" + apiKey;
    $http.get(url).
        success(function (data) {
            console.log(data.Ingredients);
            console.log(data.Instructions);
            $scope.dish = data;
        })

});