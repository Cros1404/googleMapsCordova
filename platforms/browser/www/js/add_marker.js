// code used from documentation of google maps plugin for cordova
// https://github.com/mapsplugin/cordova-plugin-googlemaps-doc/blob/master/v2.0.0/class/Geocoder/geocoding/README.md
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
    console.log("HELLO");
    var mapDiv = document.getElementById("map_canvas1");
    var map = plugin.google.maps.Map.getMap(mapDiv); 
    map.addEventListener(plugin.google.maps.event.MAP_READY, function () {
      var isRunning = false;
      document.getElementById("addAdressMarker").addEventListener("click", function () {
        if (isRunning) {
          return;
        }
        isRunning = true;

        // Address -> latitude,longitude
        plugin.google.maps.Geocoder.geocode({
          "address": document.getElementById("address").value
        }, function (results) {

          if (results.length) {

            // Add a marker
            map.addMarker({
              'position': results[0].position,
              'icon': window.localStorage.getItem("icon")
            }, function (marker) {

              // Move to the position
              map.animateCamera({
                'target': results[0].position,
                'zoom': 17
              }, function () {
                marker.showInfoWindow();
                isRunning = false;
              });

            });

          } else {
            isRunning = false;
          }

        });
      });
      document.getElementById("addGeocodeMarker").addEventListener("click", function () {
        if (isRunning) {
          return;
        }
        isRunning = true;

        var myLatLng = {
          lat: parseFloat(document.getElementById("lat").value),
          lng: parseFloat(document.getElementById("lng").value)
        };

        // Add a marker
        map.addMarker({
          'position': myLatLng,
          'icon': window.localStorage.getItem("icon")
        }, function (marker) {

          // Move to the position
          map.animateCamera({
            'target': myLatLng,
            'zoom': 17
          }, function () {
            marker.showInfoWindow();
            isRunning = false;
          });
        });

      });
    });
  }
};

app.initialize();
