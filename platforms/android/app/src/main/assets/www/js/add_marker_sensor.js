var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', function () {
      var mapDiv = document.getElementById("map_canvas1");
      var map = plugin.google.maps.Map.getMap(mapDiv);
      map.addEventListener(plugin.google.maps.event.MAP_READY, function () {
        var isRunning = false;
        document.getElementsByTagName("button")[0].onclick = function () {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              if (isRunning) {
                return;
              }
              isRunning = true;
      
              var myLatLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
      
              // Add a marker
              map.addMarker({
                'position': myLatLng
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
            }, function (error) {
              alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
            }, { timeout: 20000 });
        };
      });
    }, false);
  }
};



app.initialize();