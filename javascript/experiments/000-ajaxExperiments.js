$(function () {
    $("#searchWeather").click(function () {
        var locationInfo = $("#locationInfo").val();
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + locationInfo + "&units=metric&format=jsonp",
            dataType: "jsonp",
            success: renderWeather
        });
    });
});

function renderWeather(weather) {
    var weatherOutputList = $("#weatherInfo");
    weatherOutputList.empty();
    $("<li>").append("<b>City Name: </b>" + weather.name).appendTo(weatherOutputList);
    $("<li>").append("<b>Country: </b>" + weather.sys.country).appendTo(weatherOutputList);
    $("<li>").append("<b>Weather Description: </b>" + weather.weather[0].description).appendTo(weatherOutputList);
    $("<li>").append("<b>Temperature Current: </b>" + weather.main.temp + " degrees celsius").appendTo(weatherOutputList);
    $("<li>").append("<b>Wind Speed: </b>" + weather.wind.speed + " km/hr").appendTo(weatherOutputList);

}