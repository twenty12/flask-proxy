function addUserLocation(map){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

    var marker = new MarkerWithLabel({
        position: pos,
        // icon: getCurrentLocationMarker(),
            icon: getCurrentLocationMarker(),
        labelAnchor: new google.maps.Point(5, 20),
        map: map,
        draggable: true,
        labelClass: "label", // the CSS class for the label
     });
            // var marker = new google.maps.new MarkerWithLabel({
            //   position: pos,
            //   map: map,
            //   icon: getCurrentLocationMarker(),
            // });
            // map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
}

function getBounds () {
    var lat = 0.1
    var lng = 0.05
    var nw = new google.maps.LatLng(40.72265, -74.04635)
    var se = new google.maps.LatLng(40.77153, -73.92971)
    var bounds = new google.maps.LatLngBounds(nw, se)
    return bounds
}
function getCenter () {
    //set map center depending on aspect ratio 
    //if no text overlay, center map on manhatton
    var ratio = $(window).width()/$(window).height()
    if (ratio >= 1.5) {
        var center =  new google.maps.LatLng(40.733426, -73.98)    
    } else if (ratio >= 1 ){
        var center =  new google.maps.LatLng(40.733426, -74.016985)    
    } else if (ratio < 1) {
        var center =  new google.maps.LatLng(40.733426, -74.016985)    
    }
    if (loadTextOverlay == false) {   
        var center = new google.maps.LatLng(40.728332, -74.002912)
    }
    return center
}
function getZoom() {
    if (loadTextOverlay == false) {
        return 11
    } else {
        return 13
    }
}
function getSearchMap() {
    $("#map-div").show()
    var height = $(window).height();

    $("#map-div").css({'height': height - 70})
    map = new google.maps.Map(document.getElementById('smallMap'), {
        zoom: 12,
        maxZoom: 16,
        mapTypeId: 'terrain',
        styles: map_style,
        center: {lat: 40.730610, lng: -73.935242},
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        disableAutoPan: true,
    });
    return map
}
function getBigMap() {
    var center = getCenter()
    bigMap = new google.maps.Map(document.getElementById('bigMap'), {
            zoom: getZoom(),
            maxZoom: 16,
            mapTypeId: 'terrain',
            styles: map_style,
            center: getCenter(),
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
        });
    return bigMap
}
function initMap() {
    if (isHomePage == true) {
        var bigMap = getBigMap()
        loadPolys(bigMap);
        loadPins(bigMap);
        // var bounds = getBounds()
        // bigMap.fitBounds(bounds)
        addUserLocation(bigMap)
        if (loadTextOverlay == true) {
            loadText(bigMap)
        }
    }
    var width = $(window).width();
    if (loadSmallMap == true) {
        var map = getSearchMap()
        loadPolys(map);
        addUserLocation(map)

    }
}

function loadText (map) {
    google.maps.event.addListenerOnce(map, 'idle', function() {
        var lat = map.getBounds().getNorthEast().lat();
        var lng = map.getBounds().getSouthWest().lng();
        var corner = new google.maps.LatLng(lat, lng)
        txt = new TxtOverlay(corner, '<span id="title">Art Pigeon</span><br><span id="tagline">Explore and discuss public art</span>', "customBox", map)
      });

}
function initArtistMap() {
    map = new google.maps.Map(document.getElementById('smallMap'), {
        zoom: 10,
        mapTypeId: 'terrain',
        styles: map_style,
        center: {lat: 40.730610, lng: -73.935242},
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        disableAutoPan: true,
    });
    loadPolys(map);
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
var getCurrentLocationMarker = function () {
    var svg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve"> <circle style="opacity:0.15;fill:#0091B2;enable-background:new ;" cx="15" cy="15" r="15"/> <circle style="fill:#FFFFFF;stroke:#FFFFFF;stroke-width:0;" cx="15" cy="15" r="7.5"/> </svg>'
    var encoded = window.btoa(svg);
    return ('data:image/svg+xml;base64,' + encoded);
};
var getGoogleClusterInlineSvg = function (rad) {
    var rad = rad/2
    var hw = rad * 2
    var svg = '' + 
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="' + hw + '" width="' + hw + '">' + 
            '<circle cx="' + rad + '" cy="' + rad + '" r="' + rad + '" opacity="0.25" fill="#ff7900" />' + 
            '<circle cx="' + rad  + '" cy="' + rad + '" r="' + rad * 0.6 + '" stroke="#ffffff" stroke-width="3" fill="#ff7900" />' + 
            '</svg>'
    var encoded = window.btoa(svg);
    return ('data:image/svg+xml;base64,' + encoded);
};

function highlightedIcon() {
    var circle = {
        url: getGoogleClusterInlineSvg(25),

        height: 25,
        width: 25,
        // anchor: [16, 0],
        textColor: '#484848',
        textSize: 10
    };
    return circle
}

function isInfoWindowOpen(infoWindow){
    ///https://stackoverflow.com/questions/12410062/check-if-infowindow-is-opened-google-maps-v3
    var map = infoWindow.getMap();
    return (map !== null && typeof map !== "undefined");
}
function loadPins(map) {
        var query_bounds = {
        north: 40.791322,
        south: 40.678399,
        east: -73.737424,
        west: -74.077155
        };
      var clusterStyles = [{
        url: getGoogleClusterInlineSvg(35),
        height: 35,
        width: 35,
        textColor: '#484848',
        textSize: 10
      }, {
        url: getGoogleClusterInlineSvg(45),
        height: 45,
        width: 45,
        textColor: '#484848',
        textSize: 11
      }, {
        url: getGoogleClusterInlineSvg(55),
        height: 55,
        width: 55,
        textColor: '#484848',
        textSize: 12
      }];

    var url = '/api/maps/'
    var circle = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#FF7900',
        fillOpacity: 1,
        scale: 4,
        strokeColor: 'white',
        strokeWeight: 0.1,
    };
    function getCircle(val) {
        return {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#FF7900',
            fillOpacity: 1,
            scale: 5,
            strokeColor: 'white',
            strokeWeight: 2,
            anchor: new google.maps.Point(val*1.25, val*1.25)
        };
    }
    var markers = []
    var markerCount = {}
    $.get(url, function(data) {
        results = data
        for (var i = 0; i < results.features.length; i++) {
            var feature = results.features[i]
            var contentString = getContentStr(feature.properties);
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });                
            var coords = feature.geometry.coordinates;
            var latLng = new google.maps.LatLng(coords[0], coords[1]);
            if (!(latLng in markerCount)) {
                markerCount[latLng] = 1 
            } else {
                markerCount[latLng] = markerCount[latLng] + 1
            }
            var marker = new google.maps.Marker({
                position: latLng,
                icon: getCircle(markerCount[latLng]),
                title: feature.properties.title,
                url: '/art/' + feature.properties.slug,
                contentString: contentString,
                testData:'test',
            });

            marker.addListener('click', function(evt) {
                infowindow.setContent(this.contentString)
                    infowindow.open(map, this);
            });
            google.maps.event.addListener(marker, "dblclick", function (evt) { 
               window.location.href = this.url
            });
            map.addListener('click', function(evt) {
                infowindow.close()
            })
            removeExtraDivsFromInfoWindow(infowindow)


            markers.push(marker)
        }
        var markerCluster = new MarkerClusterer(map, markers, {
            maxZoom: 15,
            styles: clusterStyles,
            minimumClusterSize: 2
        });

    });
}

function loadAndGetMarkersOneMarker(index, results, markers) {
    var feature = results[index]
    var coords = feature['point']['coordinates']
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var content = getContentStr(feature)
    var infowindow = new google.maps.InfoWindow({
        disableAutoPan: true
    });
    var infoTitleWindow = new google.maps.InfoWindow({
        disableAutoPan: true,
        content: getTitleContent(feature)
    });
    var marker = new google.maps.Marker({
        position: latLng,
        icon: normalIcon(),
        map: map,
        animation: google.maps.Animation.DROP,
        info: content,
        infowindow: infowindow,
        infoTitleWindow: infoTitleWindow,
    });
    marker.set("id", feature['id']);
    marker.addListener('click', function(evt) {
        hideAllInfoWindows(markers)
        infowindow.setContent(this.info);
        infowindow.open(map, this);

    });
    // map.addListener('click', function(evt) {
    //     infowindow.close()
    // })
    removeExtraDivsFromInfoWindow(infowindow)
    return marker
}


function removeExtraDivsFromInfoWindow(infoWindow) {
    google.maps.event.addListener(infoWindow, 'domready', function() {
    var iwOuter = $('.gm-style-iw');
    var iwBackground = iwOuter.prev();
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});
    iwBackground.children(':nth-child(3)').hide()
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});
    var iwCloseBtn = iwOuter.next();
    iwCloseBtn.hide()
    if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }
  });
}

function getContentStr(feature){
    var imgUrl =  feature['default_image'].replace('upload/', 'upload/q_auto:best/c_fill,h_326,w_580/').replace('http://', 'https://')
    return '' +
    '<div id="iw-container" class="mapPin">' +
        '<a title="" href="/art/' + feature['slug'] + '" >' +
            '<div class="iw-content" id="art-' + feature['title'] + '">' +
                '<img class="" class="img-fluid" alt="Responsive image" src="' + imgUrl + '" />' +
                '<div class="iw-footer" >' +
                    '<span>' + feature['title'] + '</span>' +
                '</div>' +
            '</div>' +
        '</a>' +
    '</div>';
}


function getTitleContent(feature){
    var imgUrl =  feature['default_image'].replace('upload/', 'upload/q_auto:best/c_fill,h_326,w_580/').replace('http://', 'https://')
    var artist = ''
    if (feature['artist'] != null) {
        var artist = feature['artist']['display_name']
    }
    return '' +
    '<div id="iw-title-container" class="mapPin">' +
            '<div class="iw-title-content">' +
                '<p class="title">' + feature['title'] + '</p>' +
                '<p class="artist">' + artist + '</p>' +
            '</div>' +
        '</a>' +
    '</div>';
}

var map_style = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.country","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.locality","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"saturation":-100},{"lightness":-10},{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.attraction","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.station","stylers":[{"saturation":-100},{"lightness":-5}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]}]

