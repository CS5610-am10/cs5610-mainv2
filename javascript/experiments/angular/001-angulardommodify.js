var app = angular.module("TranslateApp", []);
app.controller("TanslateController", function ($scope, $http) {
    $scope.translate = function () {
        var input = $scope.enText;
        $http.jsonp("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20150214T214754Z.f24524a6ba947e55.0b517ffb397939ef326b4b298f5c1944e8de47c4&lang=en-ru&text="+input+"&callback=JSON_CALLBACK").
        success(function (response) {
            $scope.ruText = response.text[0];
        });

        $http.jsonp("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20150214T214754Z.f24524a6ba947e55.0b517ffb397939ef326b4b298f5c1944e8de47c4&lang=en-fr&text=" + input + "&callback=JSON_CALLBACK").
        success(function (response) {
            $scope.frText = response.text[0];
        });

        $http.jsonp("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20150214T214754Z.f24524a6ba947e55.0b517ffb397939ef326b4b298f5c1944e8de47c4&lang=en-de&text=" + input + "&callback=JSON_CALLBACK").
        success(function (response) {
            $scope.deText = response.text[0];
        });
    }
})