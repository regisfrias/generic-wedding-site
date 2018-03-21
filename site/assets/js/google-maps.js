// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var venueMarker = [];
var touristMarker = [];
var shoppingMarker = [];
var hotelMarker = [];

var mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a2e193"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#dccfc2"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#dccfc2"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#dccfc2"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#94e5e9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

function initMap() {
    var mapCenter = {lat: 60.1659078, lng: 24.9418588}
    console.log('initMap');

    var styledMapType = new google.maps.StyledMapType(mapStyle,{name: 'Styled Map'})
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: mapCenter,
        mapTypeId: 'terrain',
        scrollwheel: false
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    // placeId: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
    addMarker('venue', {name: 'Venue Name', position: {lat: 60.1562879, lng: 24.9453322}}); // Teatteri Toivo

    addMarker('shopping', {name: 'Kamppi', position: {lat: 60.16758, lng: 24.930226}}); // Kamppi
    addMarker('shopping', {name: 'Stockmann', position: {lat: 60.1683033, lng: 24.9421923}}); // Stockmann
    addMarker('shopping', {name: 'Vanha Kauppahalli', namePt: 'Antigo Mercado Municipal', position: {lat: 60.1664596, lng: 24.952798}}); // Vanha Kauppahalli
    addMarker('shopping', {name: 'Hakaniemen Kauppahalli', namePt: 'Mercado Municipal de Hakaniemi', position: {lat: 60.1800368, lng: 24.9513352}}); // Hakaniemen Kauppahalli
    addMarker('shopping', {name: 'Design District', position: {lat: 60.1613911, lng: 24.9382062}}); // Design District

    addMarker('tourist', {name: 'Rautatieasema', namePt: 'Estação Central', position: {lat: 60.17038, lng: 24.940636}}); // Rautatieasema
    addMarker('tourist', {name: 'Helsingin Tuomiokirkko', namePt: 'Catedral de Helsinque', position: {lat: 60.1704191, lng: 24.9521651}}); // Cathedral
    addMarker('tourist', {name: 'Kiasma', position: {lat: 60.1720037, lng: 24.9366797}}); // Kiasma
    addMarker('tourist', {name: 'Ateneum', position: {lat: 60.1701774, lng: 24.9440924}}); // Ateneum

    addMarker('hotel', {name: 'Original Sokos Helsinki', position: {lat: 60.169689, lng: 24.946756}}); // Sokos
    addMarker('hotel', {name: 'Hotel Anna', position: {lat: 60.1628933, lng: 24.9426808}}); // Anna
    addMarker('hotel', {name: 'Klaus K', position: {lat: 60.166046, lng: 24.9427721}}); // Klaus K
}

// Adds a marker to the map and push to the array.
function addMarker(layer, place) {
    var image

    if (layer == 'venue')
        image = 'assets/img/map-venue.png';
    else if (layer == 'tourist')
        image = 'assets/img/map-tourist.png';
    else if (layer == 'shopping')
        image = 'assets/img/map-shopping.png';
    else if (layer == 'hotel')
        image = 'assets/img/map-hotel.png';

    var marker

    if (layer == 'venue') {
        venueMarker.push(marker);
    } else if (layer == 'tourist') {
        touristMarker.push(marker);
    } else if (layer == 'shopping') {
        shoppingMarker.push(marker)
    } else if (layer == 'hotel') {
        hotelMarker.push(marker)
    }

    marker = new google.maps.Marker({
        map: map,
        // position: place.geometry.location,
        position: place.position,
        icon: image
    });


    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    google.maps.event.addListener(marker, 'click', function() {
        var windowContent

        if (place.namePt) {
            windowContent = '<div><strong>' + place.name + '</strong><br>' + place.namePt + '</div>'
        } else {
            windowContent = '<div><strong>' + place.name + '</strong></div>'
        }

        infowindow.setContent(windowContent);
            infowindow.open(map, this);
        });
}

// Sets the map on all markers in the array.
function setMapOnAll(map, layer, show) {
    if (layer == 'venue' && show) {
        for (var i = 0; i < venueMarker.length; i++) {
            venueMarker[i].setMap(map);
        }
    } else if (layer == 'tourist' && show) {
        for (var i = 0; i < touristMarker.length; i++) {
            touristMarker[i].setMap(map);
        }
    } else if (layer == 'shopping' && show) {
        for (var i = 0; i < shoppingMarker.length; i++) {
            shoppingMarker[i].setMap(map);
        }
    } else if (layer == 'hotel' && show) {
        for (var i = 0; i < hotelMarker.length; i++) {
            hotelMarker[i].setMap(map);
        }
    } else {
        for (var i = 0; i < venueMarker.length; i++) {
            venueMarker[i].setMap(map);
        }
        for (var i = 0; i < touristMarker.length; i++) {
            touristMarker[i].setMap(map);
        }
        for (var i = 0; i < shoppingMarker.length; i++) {
            shoppingMarker[i].setMap(map);
        }
        for (var i = 0; i < hotelMarker.length; i++) {
            hotelMarker[i].setMap(map);
        }
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers(layer) {
    setMapOnAll(map, layer);
}
