function createSVG(ratingVal) {
    return '<svg class="circleDisplay" viewbox="0 0 36 36">' +
    '<path d="M18 2.0845' + 
    'a 15.9155 15.9155 0 0 1 0 31.831' + 
    'a 15.9155 15.9155 0 0 1 0 -31.831"' + 
    'fill="none" stroke="#444"; stroke-width="1"; data="graphic"; stroke-dasharray="100, 100" />' +
    '<path d="M18 2.0845' + 
    'a 15.9155 15.9155 0 0 1 0 31.831' + 
    'a 15.9155 15.9155 0 0 1 0 -31.831"' + 
    'fill="none" stroke="#FF7900"; stroke-width="2"; data="graphic"; stroke-dasharray="' + ratingVal * 10 + ', 100" /> </svg>'
}

function wrapInCard(innerContent, activity) {
    var url = activity.art.default_image.replace('upload/', 'upload/c_crop,h_100,w_920/')
    if (activity.activity_type == 'rating') {
        var prefix = 'Rated - '
    } else {
        var prefix = 'Discussed - '
    }
    return '' +
        '<div class="activity">' +
            '<div class="artPreview">' +
                    '<h3 class="">' + prefix + activity.art.title + '</h3>' +
                    '<a href=/art/' + activity.art.slug + '><img src="' + url + '" /></a>' +
            '</div>' +
            '<div class="activityContent">' +
                innerContent + 
            '</div>' +
        '</div>'
}

function makeReactionCard(reaction) {
    var innerContent = '<div>' + reaction.content + '</div>'
    return wrapInCard(innerContent, reaction)
}

function createRatingContent(rating_name, rating) {
    var var_name_to_display_name = {
        'overall_rating': 'OVERALL ',
        'originality_rating': 'ORIGANALITY ',
        'craftsmanship_rating': 'CRAFTSMANSHIP ',
        'message_rating': 'MESSAGE '
    }
    return createSVG(rating[rating_name]) + 
                '<h6 class="ratingVal text-center">' + var_name_to_display_name[rating_name] + ' ' + rating[rating_name] + '</h6>'

}

function makeRatingCard(rating) {
    var innerContent = 
        '<div class="row ratingMetrics">' +
            '<div class="col-xxs-3 col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">' + createRatingContent('overall_rating', rating) + '</div>' +
            // '<li class="border list-inline-item"></li>' +
            '<div class="col-xxs-3 col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">' + createRatingContent('craftsmanship_rating', rating) + '</div>' +
            // '<li class="border list-inline-item"></li>' +
            '<div class="col-xxs-3 col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">' + createRatingContent('message_rating', rating) + '</div>' +
            // '<li class="border list-inline-item"></li>' +
            '<div class="col-xxs-3 col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">' + createRatingContent('originality_rating', rating) + '</div>' +
        '</div>'
    return wrapInCard(innerContent, rating)
}
function loadActivity(){
    var activityHtml = ""
    $.get(api_url, function(data) {
        for (var i = 0; i < data.length; i++) {
            var activity = data[i]
            // console.log(activity)
            if (activity.activity_type == 'reaction') {
                activityHtml += makeReactionCard(activity)
            }
            if (activity.activity_type == 'rating') {
                activityHtml += makeRatingCard(activity)
            }
        }

    $("#activity").html(activityHtml)
    })
    setUpActivityToggle()
}

function setUpActivityToggle() {
    $('#activityToggler').click(function() {
        $( ".activityToggle" ).toggle();
    })
}

