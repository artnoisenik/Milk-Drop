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
    var link = listingArray[i].link;
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
        "url": link,
        "marker-color": "#63b6e5",
        "marker-size": "medium",
        "marker-symbol": "water"
      }
    };
    geojson.push(newJson);
  }

  locations.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    var popupContent =  '<a class="popup" href="' + feature.properties.url + '"><h3>' + feature.properties.title + '</h3></a>' + '<p>' + feature.properties.description + '</p>';

    marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 150
    });
});

  locations.setGeoJSON(geojson);
}//end success

function showMap(err, data) {
  map.setView([data.latlng[0], data.latlng[1]], 11);
}

function geocodeThis() {
  var text = document.getElementById('search').value;
  if (text.length >= 5) {
      geocoder.query(text, showMap);
  }
  console.log(text);
}
