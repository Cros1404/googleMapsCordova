function geocode() {
  plugin.google.maps.Geocoder.geocode({
    "address": inputField.value
  }, function (results) {
    document.getElementById("geocode").innerHTML =
      "Latitude " + results[0].position.lat +
      ", Longitude " + results[0].position.lng;
  });

  var mapDiv = document.getElementById("map_canvas1");
  var map = plugin.google.maps.Map.getMap(mapDiv);
}

var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    document.getElementsByTagName("button")[0].onclick = function () { geocode() };
  }
};

app.initialize();