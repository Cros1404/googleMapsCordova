var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', function () {
      // onSuccess Callback
      // This method accepts a Position object, which contains the
      // current GPS coordinates
      //
      document.getElementsByTagName("button")[0].onclick = function () {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            document.getElementById("geocode").innerHTML = "Latitude: " +
              position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
          }, function (error) {
            alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
          }, { timeout: 6000 });
      };
    }, false);
  }
};



app.initialize();