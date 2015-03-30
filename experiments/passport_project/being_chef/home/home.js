app.controller("HomeCtrl", function ($scope, $http, $rootScope) {

    $scope.search = function () {
        console.log('hello');
        var apiKey = 'dvx8WTvxP086a6e2UOq8WAEshrVibl4y';
        var titleKeyword = $scope.searchText;
        var url = "http://api.bigoven.com/recipes?pg=1&rpp=12&any_kw="
                  + titleKeyword
                  + "&api_key=" + apiKey;

        $http.get(url).
        success(function (data) {
            console.log(data);
            $rootScope.dishes = data.Results;
            $scope.searchResults = [].concat.apply([], data.Results.map(function (elem, i) {
                return i % 3 ? [] : [data.Results.slice(i, i + 3)];
            })
            );
        })
    };
});