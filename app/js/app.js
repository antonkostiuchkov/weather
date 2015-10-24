$(function () {

  toggleMenu ();
  updateCity ();

});



// Open / close navigation bar

function toggleMenu () {
  $('.nav-toggle').on('click', function (){
    $('.main-navigation').toggleClass('open');
  });
};


// Building associative arrays

var icons = { 'clear-day' : 'icon-sun',
              'clear-night' : 'icon-moon',
              'rain' : 'icon-rain',
              'snow' : 'icon-snow',
              'sleet' : 'icon-hail',
              'wind' : 'icon-windy',
              'fog' : 'icon-cloud',
              'cloudy' : 'icon-clouds',
              'partly-cloudy-day' : 'icon-cloud-sun',
              'partly-cloudy-night' : 'icon-cloud-moor'
            };

var cities = {
              'kiev'    : {coords : {latitude: 50.4501, longitude: 30.5234}},
              'wroclaw' : {coords : {latitude: 51.1079, longitude: 17.0385}},
              'chicago' : {coords : {latitude: 41.8369, longitude: -87.6847}},
              'current location' : ''
            };



// Loading  weather info from the API
// Grab city name from the slideout nav and execute loadCity function

function updateCity () {
  var $city = $('a.city');

  $city.on('click', function() {
    loadCity($(this).html());
  });
};


// Update city name in the main panel and execute load weather function

function loadCity (city) {
  $('#location').html(city);

  if (city.toLowerCase() == 'current location') {
    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(loadWeather, loadDefaultCity);
    } else {
      loadDefaultCity();
    }
  } else {
    loadWeather(cities[city.toLowerCase()]);
  }
};

function loadDefaultCity () {
  loadCity("Kiev");
};


function loadWeather (cityCoords) {

  var latlng = cityCoords.coords.latitude + ',' + cityCoords.coords.longitude;

  var forecastURL = 'https://api.forecast.io/forecast/be1c586691314d260648274cb1519ea3/' + latlng;

  $.ajax({
    url: forecastURL,
    jsonpCallback: 'jsonCallback',
    contentType: 'application/json',
    dataType: 'jsonp',
    success: function (json) {

      $('#temp').html(Math.round((json.currently.temperature - 32) * 5 / 9) + '°C');
      $('#temp').attr('class', icons[json.currently.icon]);
      $('#summary').html(json.currently.summary);

    },
    error: function (e) {
      console.log(e.message);
    }
  });
};
