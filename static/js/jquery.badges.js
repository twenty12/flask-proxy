function setupUserBadges (badges) {
    $.each(badges, function( index, value ) {
        var item = $('#' + value.title)
        item.removeClass('grayscale')
        console.log(value)
        var html = '<br><span class="font-weight-bold">Awarded</span><br><span class="font-italic">' + value.created + '</span>'
        item.find('div').append(html)
        $('#userBadges').prepend(item)
    });
}

$(document).ready(function() {
    setupUserBadges(badges)    
})