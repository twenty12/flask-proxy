var getOrgangePin = function () {
    var svg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="60px" height="60px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve"> <path style="fill:#FF7600;stroke:#000000;stroke-miterlimit:10;" d="M15,17.9c0.1,5.2,3.4,9.5,8.4,17.8c3.5,5.9,6,13.3,6.6,17.5l0,0 l0,0c0.6-4.2,3.1-11.6,6.6-17.5c5-8.4,8.3-12.6,8.4-17.8c0-8.3-6.7-15-15-15s-15,6.7-15,15"/> <circle style="fill:#020100;" cx="30" cy="17.9" r="5"/> </svg>'
    var encoded = window.btoa(svg);
    return ('data:image/svg+xml;base64,' + encoded);
};

function addAndGetMarker(map, input_lat, input_lng, input, input_id, geocoder) {
    var marker = new google.maps.Marker({
        map: map,
        icon: getOrgangePin(),
        anchorPoint: new google.maps.Point(0, -29),
        draggable: true
    });
    google.maps.event.addListener(marker, 'dragend', function() {
        var lat = marker.getPosition().lat();
        var lng = marker.getPosition().lng();
        input_lng.value = lng
        input_lat.value = lat
        geocoder.geocode({
            'location': marker.getPosition()
        }, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    input.value = results[0].formatted_address
                    input_id.value = results[0].place_id
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    })
    return marker
}
function loadPolys(map) {
    var bermudaTriangle = new google.maps.Polygon({
        paths: polyData,
        strokeColor: '#ffffff',
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: '#ffffff',
        fillOpacity: 1
    });
    bermudaTriangle.setMap(map);
}

function initMap(preopulateAddress) {
    var geocoder = new google.maps.Geocoder;
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.730610,
            lng: -73.935242
        },
        styles: map_style,
        streetViewControl: false,
        fullscreenControl: false,
        zoom: 12,
        mapTypeControl: false,
    });
    loadPolys(map)
    var input = document.getElementById('pac-input');
    var input_lat = document.getElementById('lat');
    var input_lng = document.getElementById('lng');
    var input_id = document.getElementById('address_id');
    var types = document.getElementById('type-selector');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    var infoWindow = new google.maps.InfoWindow();

    var marker = addAndGetMarker(map, input_lat, input_lng, input, input_id, geocoder)

    autocomplete.addListener('place_changed', function() {
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(15);
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        var lat = marker.getPosition().lat();
        var lng = marker.getPosition().lng();
        input_lng.value = lng
        input_lat.value = lat
        input_id.value = place.place_id
    });
    // Try HTML5 geolocation.
    if (preopulateAddress == true) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                marker.setPosition(pos);
                geocoder.geocode({
                    'location': marker.getPosition()
                }, function(results, status) {
                    if (status === 'OK') {
                        if (results[0]) {
                            input.value = results[0].formatted_address
                            input_id.value = results[0].place_id
                            input_lat.value = pos.lat
                            input_lng.value = pos.lng
                        } else {
                            window.alert('No results found');
                        }
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
                map.setCenter(pos);
            }, function() {
                var pos = {
                    lat: 40.7127753,
                    lng: -74.0059728,
                };
                marker.setPosition(pos);
                input.value = 'New York, NY'    
            });
        } else {
            // Browser doesn't support Geolocation
            var pos = {
                lat: 40.7127753,
                lng: -74.0059728,
            };
            marker.setPosition(pos);
            input.value = 'New York, NY'
        }
    } else {
        console.log(input_lng.value)
       var pos = {
            lat: parseFloat(input_lat.value),
            lng: parseFloat(input_lng.value),
        };
        marker.setPosition(pos); 
    }
}
var map_style =   [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.country","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.locality","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"saturation":-100},{"lightness":-10},{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.attraction","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","stylers":[{"saturation":-100},{"lightness":-5},{"visibility":"simplified"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]}]

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
