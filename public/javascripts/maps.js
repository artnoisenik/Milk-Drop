L.mapbox.accessToken = 'pk.eyJ1IjoiY2hlaW5yaWNocyIsImEiOiJjaW13bGQ3dW0wMzcxdW5tNDY4enhjNXp0In0.Yp48WNc-1xlHBLX9PcA5oQ';
var map = L.mapbox.map('map', 'mapbox.streets');

var geocoder = L.mapbox.geocoder('mapbox.places');

// var listingArray = {{{listingMapMarkers}}};

var locations = L.mapbox.featureLayer().addTo(map);

$('#enterALocation').on('submit', function(e){
  e.preventDefault();
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success);
} else {
  console.log("Geolocation is not supported by this browser.");
}

function success(pos) {
  var crd = pos.coords;

  map.setView([crd.latitude, crd.longitude], 10);

  var geojson = [];
  for (var i = 0; i < listingArray.length; i++) {
    var title = listingArray[i].title;
    var description = listingArray[i].description;
    var newlat = listingArray[i].latitude;
    var newlong = listingArray[i].longitude;
    var newJson = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [newlong, newlat]
      },
      "properties": {
        "title": title,
        "description": description,
        "marker-color": "#63b6e5",
        "marker-size": "medium",
        "marker-symbol": "water"
      }
    };
    geojson.push(newJson);
  }
  console.log(geojson);

  locations.setGeoJSON(geojson);
}//end success

function showMap(err, data) {
    if (data.lbounds) {
        map.fitBounds(data.lbounds);
    } else if (data.latlng) {
        map.setView([data.latlng[0], data.latlng[1]], 15);
    }
}

function geocodeThis() {
  var text = document.getElementById('search').value;
  if (text.length >= 5) {
      geocoder.query(text, showMap);
  }
  console.log(text);
}
