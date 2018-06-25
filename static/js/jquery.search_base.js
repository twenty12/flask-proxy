function handleMarker(markers, div, hide) {
    for (var i = 0; i < markers.length; i++) {
        if (div.attr("id") == markers[i].get("id")) {
            markers[i].setVisible(hide)
        }
    }
}
function displayFilteredArtwork(checkBoxInput, markers) {
    var ischecked = checkBoxInput.is(':checked');
    var typeOfSave = "." + checkBoxInput.attr("data");
    $(typeOfSave).each( function() {
        var div = $(this).parent().parent()
        if(!ischecked) {
            var hide = true
            handleMarker(markers, div, hide)
            div.hide()
        } else {
            var hide = false
            handleMarker(markers, div, hide)
            div.show()
        }

    })
}
function addFilterDropDown(markers) {
    $("#filterArtwork input:checkbox").each(function () {
        $(this).prop( "checked", true )
        $(this).change(function() {
            displayFilteredArtwork($(this), markers)
        }); 
    })
}

function addHtmlToDiv(id, data) {
    var html = '<div class="savedArtwork">'    
    var div = $('#' + id)
    for (var i = 0; i < data.length; i++) {
        if (data[i]['art'] == id) {
            var type_of_save = data[i]['type_of_save']
            if (type_of_save == 'want-to-visit') {
                html += '<svg class="want-to-visit" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"> <style type="text/css"> .svgHeart{fill:white;stroke:#ff390d;stroke-miterlimit:10;} </style> <path class="svgHeart" d="M10,18.3L10,18.3c1-1,2-2,3-3c1.7-1.7,3-3,4.3-4.6c1.3-2,2-4,1.3-5.6s-2-3-3.6-3.3c-2.3-0.3-4,1-5,2l0,0 c-1-1-2.7-2.3-4.6-2S2,3.4,1.4,5s0,3.6,1.3,5.6C4,12.3,5.7,14,7,15.3C8,16.3,9,17.3,10,18.3L10,18.3L10,18.3z"/> </svg>'
            }
            if (type_of_save == 'visited'){
                html += '<svg class="visited" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"> <style type="text/css"> .st0{fill:white;stroke:black;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:none;stroke:#57c1e4;stroke-width:3;stroke-miterlimit:10;} </style> <rect x="2.9" y="3.2" class="st0" width="14.2" height="13.6"/> <path class="st1" d="M3.2,9.7c2.1,0.6,5.8,1.8,7.2,6.3C10.7,16.9,10,6,19.6,2.1"/> </svg></span>'
            }
            if (type_of_save == 'added-art') {
                html += '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" owneryle="enable-background:new 0 0 20 20;" xml:space="preserve"> <owneryle type="text/css"> .owner0{fill:#FF7600;} .owner1{fill:#010101;} </owneryle> <polygon class="owner0" points="16.3,5.4 11.6,5.4 11.6,1.8 16.3,1.8 16.3,3.6 "/> <rect x="16.1" y="1.7" class="owner0" width="0.9" height="0.7"/> <rect style="background-color:#ff7600" x="16.1" y="4.4" class="owner0" width="0.8" height="1.1"/> <g> <g> <ellipse class="owner1" cx="6.3" cy="6" rx="1.6" ry="1.5"/> <path class="owner1" d="M16.6,3.6l1-2c0.1-0.1,0.1-0.2,0-0.4c-0.1-0.1-0.2-0.2-0.3-0.2h-5.7V0.5c0-0.2-0.2-0.4-0.4-0.4 s-0.4,0.2-0.4,0.4v7.7c-0.1,0-0.1,0.1-0.2,0.2c-0.4,0.5-0.9,1.1-1.2,1.3C9.3,9.6,9.2,9.4,9.1,9.3C8.6,8.7,8.1,8,7.2,8H5.3 C4,8,3.3,9.7,3.1,10.3c-0.1,0.2-0.6,1.9-0.7,2.5c-0.1,0.4,0.1,0.7,0.5,0.8c0.1,0,0.1,0,0.2,0c0.3,0,0.6-0.2,0.7-0.5 c0-0.1,0.7-2.3,0.8-2.6c0.1-0.2,0.2-0.4,0.3-0.6l0.1,3.1L4,19c-0.1,0.4,0.3,0.8,0.7,0.9c0.4,0,0.9-0.2,0.9-0.7l0.7-5.4L7,19.2 c0,0.4,0.4,0.7,0.8,0.7c0,0,0.1,0,0.1,0c0.4-0.1,0.8-0.4,0.7-0.9l-0.8-5.9l0.1-3.2C7.9,10,7.9,10,8,10c0.4,0.5,0.7,0.9,1.2,1 c0,0,0.1,0,0.1,0c0.5,0,1-0.3,1.5-0.8v9.3c0,0.2,0.2,0.4,0.4,0.4c0.2,0,0.4-0.2,0.4-0.4V9.4c0.1-0.1,0.1-0.2,0.2-0.2 c0.2-0.3,0.1-0.7-0.2-0.9l0,0V6.1h5.7c0.1,0,0.3-0.1,0.3-0.2c0.1-0.1,0.1-0.2,0-0.4L16.6,3.6z M11.6,5.4V1.8h5.1l-0.9,1.6 c-0.1,0.1-0.1,0.2,0,0.3l0.9,1.6H11.6z"/> </g> </g> <g> <g> <ellipse class="owner1" cx="6.3" cy="6" rx="1.6" ry="1.5"/> <path class="owner1" d="M16.6,3.6l1-2c0.1-0.1,0.1-0.2,0-0.4c-0.1-0.1-0.2-0.2-0.3-0.2h-5.7V0.5c0-0.2-0.2-0.4-0.4-0.4 s-0.4,0.2-0.4,0.4v7.7c-0.1,0-0.1,0.1-0.2,0.2c-0.4,0.5-0.9,1.1-1.2,1.3C9.3,9.6,9.2,9.4,9.1,9.3C8.6,8.7,8.1,8,7.2,8H5.3 C4,8,3.3,9.7,3.1,10.3c-0.1,0.2-0.6,1.9-0.7,2.5c-0.1,0.4,0.1,0.7,0.5,0.8c0.1,0,0.1,0,0.2,0c0.3,0,0.6-0.2,0.7-0.5 c0-0.1,0.7-2.3,0.8-2.6c0.1-0.2,0.2-0.4,0.3-0.6l0.1,3.1L4,19c-0.1,0.4,0.3,0.8,0.7,0.9c0.4,0,0.9-0.2,0.9-0.7l0.7-5.4L7,19.2 c0,0.4,0.4,0.7,0.8,0.7c0,0,0.1,0,0.1,0c0.4-0.1,0.8-0.4,0.7-0.9l-0.8-5.9l0.1-3.2C7.9,10,7.9,10,8,10c0.4,0.5,0.7,0.9,1.2,1 c0,0,0.1,0,0.1,0c0.5,0,1-0.3,1.5-0.8v9.3c0,0.2,0.2,0.4,0.4,0.4c0.2,0,0.4-0.2,0.4-0.4V9.4c0.1-0.1,0.1-0.2,0.2-0.2 c0.2-0.3,0.1-0.7-0.2-0.9l0,0V6.1h5.7c0.1,0,0.3-0.1,0.3-0.2c0.1-0.1,0.1-0.2,0-0.4L16.6,3.6z M11.6,5.4V1.8h5.1l-0.9,1.6 c-0.1,0.1-0.1,0.2,0,0.3l0.9,1.6H11.6z"/> </g> </g> </svg>'
            }
        }
    }
    div.append(html + '</div>')
}

function addSavedArtMarkers (data, results, SavedArtIdArray) {
    for (var i = 0; i < results.length; i++) {
        if ($.inArray(results[i]['id'], SavedArtIdArray) !== -1) {
            addHtmlToDiv(results[i]['id'], data)
        }
    }
}
function markSavedArt(results, username) {
    if ($('#mapRow').data('SavedArt') == undefined) {
        $.ajax({
            type: "GET",
            url: "/api/usersave/" + username,
            success: function(data){
                var data = data
                var SavedArtIdArray = []
                for (var i = 0; i < data.length; i++){
                    SavedArtIdArray.push(data[i]['art'])
                }
                addSavedArtMarkers(data, results, SavedArtIdArray)
                $('.mapRow').data('SavedArt', data)
                $('.mapRow').data('SavedArtIdArray', SavedArtIdArray)
            },
        });
    } else {
        var data =  $('.mapRow').data('SavedArt')
        var SavedArtIdArray = $('.mapRow').data('SavedArtIdArray')
        addSavedArtMarkers(data, results, SavedArtIdArray)
    } 
}

function moveScroller() {
    var $anchor = $("#scroller-anchor");
    var $scroller = $('#scroller');
    var $map = $('#map-div');

    var move = function() {
        var st = $(window).scrollTop();
        var ot = $anchor.offset().top;
        var width = $(window).width();

        if(st > ot) {
            $scroller.addClass('fixedNav');
            $scroller.removeClass('relativeNav');
            if (width > 770) {
                $map.addClass('fixedMap');
                $map.removeClass('relativeMap');
            }
        } else {
            $scroller.removeClass('fixedNav');
            $scroller.addClass('relativeNav');
            if (width > 770) {
                $map.removeClass('fixedMap');
                $map.addClass('relativeMap');
            }
        }
    };
    $(window).scroll(move);
    move();
}

function hideAllInfoWindows(markers) {
    markers.forEach(function(marker) {
        marker.infowindow.close(map, marker);
    }); 
}
function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function normalIcon() {
    var circle = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#FF7600',
        fillOpacity: 1,
        scale: 3,
        // strokeColor: ,
        strokeOpacity: 0,
        strokeWeight: 20
    };
    return circle
}
function getArtistHtml(result) {
    if (result.artist != null) {
        var artistSlug = getSlug(result['artist']['display_name'])
        return '' +
            '<a class="artistName" href="/artist/' + artistSlug + '" >' +
                '<span class="artist">' + result['artist']['display_name'] + '</span>' +
            '</a>'
    } else {
        return ''
    }
}
function jsonToTemplate(results){
    var allArtHtml = ''
    for (var i = 0; i < results.length; i++){
        var imgUrl = results[i]['default_image'].replace('upload/', 'upload/c_lfill,h_326,w_580/').replace('http://', 'https://')
        var artPieceHtml = 
            '<div id="' + results[i]['id'] + '" data="' + i + '" class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 art effect">' +
                '<a title="" href="/art/' + results[i]['slug'] + '" >' +
                    '<img class="" class="img-fluid" alt="Responsive image" src="' + imgUrl + '" />' +
                '</a>' +
                getArtistHtml(results[i]) +
            '</div>'
        allArtHtml += artPieceHtml
    }
    return allArtHtml
}

function AddHover2(markers) {
    $('.art').hover(
        function () {
            var index = $('.art').index(this);
            markers[index].setIcon(highlightedIcon());
            markers[index].infoTitleWindow.open(map, markers[index])
            var latLng = markers[index].getPosition();
            map.setCenter(latLng);
            // hideAllInfoWindows(markers)
        },
        function () {
            var index = $('.art').index(this);
            markers[index].setIcon(normalIcon());
            markers[index].setAnimation(null);
            markers[index].infoTitleWindow.close(map, markers[index])

        }

    );
}
function addMarkersToMap (markers, loadNumber, highestIndex, data){
    $('.art').waypoint(function() {
        var indexInCurrentesult = parseInt(this['element'].attributes['data']['value'])
        var indexSinceFirstResults = indexInCurrentesult + (10 * loadNumber)
        if ( indexSinceFirstResults > highestIndex) {
            highestIndex += 1
            if (data.results.length > 0) {
                var new_marker = loadAndGetMarkersOneMarker(indexInCurrentesult, data.results, markers)
                markers.push(new_marker)
                $('#numberOfResultsShowing').text(highestIndex + 1)
            }
        }
    }, {
   offset: '100%'
 })
};

function loadThumbnails(query, markers, username) {
    var loadNextPage = true
    var $container = $('.imageRow').infiniteScroll({
        path: function() {
            if ( loadNextPage == true ) {
                var offset = this.pageIndex * 10 - 10
                var url = '/api/search/art/' + query + '&offset=' + offset
                return url
              }
        },
        responseType: 'text',
        history: false,
        checkLastPage: true,
    });
    var highestIndex = -1
    var loadNumber = -1
    $container.on('load.infiniteScroll', function( event, response ) {
        var data = JSON.parse(response);
        if (data.results.length < 10) {
            loadNextPage = false        
        }
        $('#numberOfTotalResults').text(data['count'])
        var itemsHtml = jsonToTemplate(data.results, loadNumber);
        loadNumber += 1
        var $items = $(itemsHtml);
        $container.infiniteScroll('appendItems', $items );
        if (loadSmallMap == true) {
            addMarkersToMap(markers, loadNumber, highestIndex, data)
            AddHover2(markers)
            markSavedArt(data.results, username)
        }
    });
    $container.infiniteScroll('loadNextPage')
}

function setLinksForSortBy (query) {
    $("#sort a").each( function() {
        var order = $(this).attr('data')
        query_s = query.replace(/[&amp;]*ordering=[\w\-]*/g, '').replace(/\$/g, '').replace(/\?/g, '')
        if (query_s.length >1){
            query_s += '&'
        }
        $(this).attr('href', '/search/' + query_s + 'ordering=' + order)
    })
}
function setUpSortDropDown () {
    if (isHomePage == false){
        $(".navbar")[0].scrollIntoView(true);
    }
}
function setUpMobileMapControls() {
    if (loadSmallMap == false) {
         $('#mapControl').hide()
    }
    $('#mapControl').click( function () {
        $('#hideMap').toggle()
        $('#showMap').toggle()
        $('.art').toggle()
        $('#map-div').toggle()
    })
}
$(document).ready(function() {
    // setUpMobileMapControls()
    // setUpSortDropDown()
    // moveScroller()
    // var markers = []
    // loadThumbnails(query, markers)
    // setLinksForSortBy(query)
});
