var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', function () {
      var markers = [];
      var mapDiv = document.getElementById("map_canvas1");
      var map = plugin.google.maps.Map.getMap(mapDiv);
      map.addEventListener(plugin.google.maps.event.MAP_READY, function () {
        // Move to the position
        map.animateCamera({
          'target': {"lat": 64.995330, "lng": 25.510372},
          'zoom': 13
        });
        map.addEventListener(plugin.google.maps.event.MAP_CLICK, function (latLng) {
          if (markers.length != 2)
            map.addMarker({
              position: latLng,
              title: latLng,
              animation: plugin.google.maps.Animation.DROP
            },
              function (marker) {
                markers.push(marker);
                if (markers.length == 2) {
                  document.getElementById("distance").innerHTML =
                    plugin.google.maps.geometry.spherical.computeDistanceBetween(
                      markers[0].getPosition(), markers[1].getPosition())
                    + " meters";
                  calcRoute(markers[0].getPosition(), markers[1].getPosition());
                }
              });
        });
      });
    }, false);
  }
};
var directionsService;
var directionsDisplay;

function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setPanel(document.getElementById('directions'));
}

function calcRoute(start, end) {
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function (result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
}


app.initialize();