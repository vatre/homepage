// http://openweathermap.org/
$(document).ready(function() {
  var cityIds = {
    "Montpellier": "2992165",
    "Paris": "2988507"
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function updateCityInfo(city) {
    var prefix = "#" + city.id + " ";
    $(prefix + ".weather-descr").text(city.weather.description);
    $(prefix + ".illustr img").attr("src", city.weather.img);
    $(prefix + ".temp").text(city.weather.temperature + " C");
    $(prefix + ".humidity").text("Humidity : " + city.weather.humidity + "%");
    $(prefix + ".wind").text("Wind : " + city.weather.windSpeed + " km/h");
    $(prefix + ".sunrise").text("Sunrise : " + city.sunrise);
    $(prefix + ".sunset").text("Sunset : " + city.sunset);
  }

  $("#weather .wth-city-container").each(function() {
    var city = {
      id: $(this).attr('id'),
      owid: $(this).data('owid'), //openweather Id
      weather: {}
    }

    var url = "http://api.openweathermap.org/data/2.5/weather?units=metric&id=";
    url += city.owid;
    url += "&appid=e1207fbad2dd5e5c60006fec2bd2f6ed";

    $.get(url, function(data, status) {
      city.weather.temperature = Math.round(data.main.temp * 10) / 10;
      city.weather.description = capitalizeFirstLetter(data.weather[0].description);
      city.weather.group = data.weather[0].main;
      city.weather.humidity = data.main.humidity;
      city.weather.windSpeed = Math.round(data.wind.speed * 3.6);
      var sunrise = new Date(data.sys.sunrise * 1000);
      var sunset = new Date(data.sys.sunset * 1000);
      city.sunrise = sunrise.getHours() + "h" + sunrise.getMinutes();
      city.sunset = sunset.getHours() + "h" + sunset.getMinutes();
      
      // Weather groups : http://openweathermap.org/weather-conditions
      // Image pack : http://www.flaticon.com/packs/weather-2
      switch (city.weather.group) {
        case "Thunderstorm":
          city.weather.img = "img/sky.png";
          break;
        case "Rain":
          city.weather.img = "img/storm.png";
          break;
        case "Drizzle":
          city.weather.img = "img/storm.png";
          break;
        case "Snow":
          city.weather.img = "img/snow.png";
          break;
        case "Atmosphere":
          city.weather.img = "img/fog.png";
          break;
        case "Clear":
          city.weather.img = "img/sun.png";
          break;
        case "Clouds":
          city.weather.img = "img/cloud.png";
          break;
        case "Extreme":
          city.weather.img = "img/exclamation.png";
          break;
        case "Additional":
          city.weather.img = "img/question.png";
          break;
        default:
          city.weather.img = "img/question.png";
      }

      updateCityInfo(city);
    });
  });

});