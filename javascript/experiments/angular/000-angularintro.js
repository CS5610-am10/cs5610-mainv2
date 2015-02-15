var app = angular.module("WeatherApp", []);
app.controller("WeatherAppController", function ($scope, $http) {
    $scope.searchWeather = function () {
        var locationInfo = $scope.locationInfo;
        $http.jsonp("http://api.openweathermap.org/data/2.5/weather?q=" +
            locationInfo + "&units=metric&format=jsonp&callback=JSON_CALLBACK").
        success(function (weather) {
            $scope.weatherInfo = [
                {"name" : "City Name", "value" : weather.name},
                {"name" : "Country", "value" : weather.sys.country},
                {"name" : "Weather Description", "value" : weather.weather[0].description},
                {"name" : "Temperature Current (degrees celsius)", "value" : weather.main.temp},
                {"name" : "Wind Speed (km/hr)", "value" : weather.wind.speed}
            ];
        });

    }
})