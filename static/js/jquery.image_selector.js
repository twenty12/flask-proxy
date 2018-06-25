function addImageToArt(result) {
    results = {'numb_results': result.length}
    for (var i = 0; i < result.length; i++) {
        results[i] = result[i]
    }
    $.ajax({
        url: api_url + 'images',
        type: 'post',
        data: results,
        success: function() {
            console.log('uploaded! to artpigeon')
            location.reload();
        }
    });
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function openCloudinaryModal() {
    cloudinary.openUploadWidget({
        cloud_name: 'artpigeon',
        upload_preset: 'x9dtj86z',
        theme: 'minimal',
        stylesheet: stylesheetUrl,
        },
        function(error, result) {
            addImageToArt(result)
        });
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setUpCheckBoxes(type) {
    var span = '.' + type + ' .selector'
    var spanIs = '.' + type + ' .selector .is'
    var spanMake = '.' + type + ' .selector .make'
    var input = '.' + type + ' input'
    $(span).click(function() {
        $(span).removeClass('selected-' + type)
        $(spanIs).hide()
        $(spanMake).show()
        $(input).each(function() {
            $(this).prop('checked', false);
        })
        $(this).find('.is').show()
        $(this).find('.make').hide()
        $(this).find('input').prop('checked', true)
        $(this).addClass('selected-' + type)
    });
}
function setupComplete() {
    $("#complete").click(function() {
        var nextPage = '/art/' + artSlug
        submitUpdate(nextPage)
    });
}
function submitUpdate(nextPage) {
    $.ajax({
        type: 'POST',
        url: $('#imageForm').attr('action'),
        data: $('#imageForm').serialize(),
        success: function(data){
            window.location.href = nextPage;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error: " + textStatus);
            window.location.href = nextPage; 
      }
    });
}
function addImages() {
    $('.image').each(function(index) {
        var img_url = $(this).children('a').attr('href').replace('upload/', 'upload/c_fit,w_340/')
        $(this).html('<img  alt="image" src="' + img_url +'" >')
    })
}
function setupDetailsButton () {
    $("#submitArtMobile").click(function() {
        var nextPage = '/add_art_3/' + artSlug
        submitUpdate(nextPage)
    });
}