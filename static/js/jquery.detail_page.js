
function loadRatings(){
    $.get(api_url + 'rating', function(data) {
        console.log(data)
        $('.rating_val').each(function() {
            key = $(this).attr('data')
            $(this).text(data[key])
            });
    $('#numberOfRatings').text('From ' + data['number_of_ratings'] + ' critiques')
    $('#overall_rating_val').text(data['overall_rating'])
    $('path[data="graphic"]').attr("stroke-dasharray", data.overall_rating * 10 + ", 100")
    })
}


function loadComments(){
    var reactionHtml = ""
    $.get(api_url, function(data) {
        for (var i = 0; i < data.results.length; i++) {
            var reaction = data.results[i]
            var contentString = getContentReactionCard(reaction, true)
            reactionHtml += contentString
        }
    $("#reactions").html(reactionHtml)
    })
}


function getContentReactionCard(reaction, isFirstReaction) {
    if (isFirstReaction == true) {
        replyButton = makeColDiv(3) + getReplyButton(reaction.id) + '</div>' + makeColDiv(6) + '</div>'
        reactionLing = 'firstReaction'
    } else {
        replyButton = ''
        reactionLing = 'secondReactions'
    }
    return '' + 
    '<div id="' + reaction.id + '"class="row ' + reactionLing + '">' +
        makeColDiv(2) + '<a href="/user/@' + reaction.auther.username + '" ><img class="mx-auto d-block image-cropper" src="https://res.cloudinary.com/artpigeon/' + reaction.auther.profile.avatar + '" alt="Profile Pic"/></a></div>' +
        makeColDiv(10) + 
            '<div class="row reactionDetials"> ' +
                makeColDiv(12, ['username']) + reaction.auther.username  + '</div>' + 
                makeColDiv(12, ['content']) + reaction.content + '</div>' + 
                makeColDiv(3, ['ballot'], reaction.id) + makeBallet(reaction.vote_score) + '</div>' +
                replyButton +
                makeColDiv(12, ['showReply']) + getShowReply(reaction) + '</div>' +
            '</div>' +
        '</div>' +
    '</div>'
}


function getReplyButton(id){
    if (is_authenticated == true) {
        return '<div class="hover replyButton"  role="btn btn-outline-primary" id="' + id + '">REPLY</div>'
    } else {
        var buttonHtml = '<div class="hover" role="btn btn-outline-primary" id="' + id + '"> <p>REPLY</p></div>'
        return '<div type="button" class="" data-toggle="modal" data-target="#registerModal">' + buttonHtml + '</div>'
    }
}
    
function makeColDiv(val, classes, id) {
    classes = classes || ['']
    id = id || ''
    var classesStr = classes.join(' ');
    return '<div id="' + id + '" class="' + classesStr + ' col-' + val + ' col-sm-' + val + ' col-md-' + val + ' col-lg-' + val + ' col-xl-' + val +  '" >'
}


function makeBallet(numVotes) {
    return '' +
        '<ul class="ballet list-inline">' +
        '<li class="list-inline-item"><span data="up" class="oi oi-thumb-up vote"></span></li>' +
        '<li class="list-inline-item"><span>' + numVotes + '</span></li>' +
        '<li class="list-inline-item"><span data="down" class="oi oi-thumb-down vote"></span></li>' +
        '</ul>'
}


function getReplyInput() {
    return '' +
        makeColDiv(2) + loggedinUserAvitar + '</div>' +
        makeColDiv(10) +
            '<div class="form-group">' +
                '<textarea class="form-control" rows="1" id="" rows="3"></textarea>' +
            '</div>' +
            '<button class="reactionReply btn btn-outline-primary">Reply</button>' +
        '</div>'
}


function getShowReply(reaction) {
    if (reaction.children_exist == true) {
        var showReply = '<span class="hover">View replies   <span class="oi oi-arrow-bottom"></span></span>'
    } else {
        var showReply = ''
    }
    return showReply
}


function addReplys(reactionId, card) {
    var url = '/api/reaction/' + reactionId + '/'
    function replyDatatoHtml(data) {
        var replyHtml = ''
        for (var i = 0; i < data.length; i++) {
                var reaction = data[i]
                var contentString = getContentReactionCard(reaction, false)
                replyHtml += contentString
            }
        return replyHtml
    }
    $.ajax({
        url: url,
        type: 'get',
        success: function(data) {
            var replyCards = replyDatatoHtml(data)
            card.children().last().append(replyCards)
        }
    });
}

function makeIndexActive(index, inverse) {
            var children = $("#detNav ul").children()
            children.css({'font-weight': '200'})
            var numChildren = children.length
            if (inverse == true) {
                var currentNavItem = $("#detNav ul").children().eq(numChildren - index)
            } else {
                var currentNavItem = $("#detNav ul").children().eq(index)
            }
            currentNavItem.css({'font-weight': '600'})
}
function makeMenuNavWork() {
    $("#detNav ul").on("click", "li", function (event) {
        var numChildren = $("#detNav ul").children().length
        makeIndexActive($(this).index(), false)
        $.fn.fullpage.moveTo(numChildren - $(this).index());
    });
}
function setUpFavoriteButton() {
    $('#favorite').click( function () {
        $.ajax({
            url: '/api/usersave/',
            type: 'post',
            data: {
                'art': art_id,
                'type_of_save': 'want-to-visit'},
            success: function() {
                $('#favorite').toggleClass('redHeart')
            }
        });
    })
}
function setUpVisitedButton() {
    $('#visited').click( function () {
        $.ajax({
            url: '/api/usersave/',
            type: 'post',
            data: {
                'art': art_id,
                'type_of_save': 'visited'},
            success: function() {
                $('#visited').toggleClass('checkBox')
            }
        });
    })
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function setUpEditButton(){
    $('#editButton').click(function () {
        setCookie('firstUploadOf' + art_id, true, 1)
    })
}
$(document).ready(function() {
    setUpFavoriteButton()
    setUpVisitedButton()
    makeMenuNavWork()
    setUpEditButton()
    $('body').on('click', '.replyButton', function (){
        $(this).hide()
        var card = $(this).parent().parent()
        var reactionId = card.attr('id')
        card.append(getReplyInput())
    })

    $('body').on('click', '.reactionReply', function (){
        var card = $(this).parent()
        var content = $(this).parent().find('textarea').val()
        var reactionId = $(this).closest('.firstReaction').attr('id')
            $.ajax({
                url: '/api/reaction/' + reactionId + '/',
                type: 'post',
                data: {
                    'art': art_id,
                    'content': content},
                success: function() {
                    loadComments()
                }
            });
    })

    $('body').on('click', '.toggleReply', function (){
        $(this).parent().parent().find('.secondReactions').toggle()
        if ($(this).children('span').children('span').attr('class') == 'oi oi-arrow-top') {
        $(this).children('span').children('span').addClass('oi-arrow-bottom')
        $(this).children('span').children('span').removeClass('oi-arrow-top')
        } else {
            $(this).children('span').children('span').removeClass('oi-arrow-bottom')
            $(this).children('span').children('span').addClass('oi-arrow-top')
        }
    })

    $('body').on('click', '.showReply', function (){
        // $(this).toggle()
        // console.log($(this).parent().parent().parent().children('.secondReactions'))
        $(this).children('span').children('span').removeClass('oi-arrow-bottom')
        $(this).children('span').children('span').addClass('oi-arrow-top')
        var card = $(this).parent().parent().parent()
        var reactionId = card.attr('id')
        addReplys(reactionId, card)
        $(this).removeClass('showReply')
        $(this).addClass('toggleReply')

    })
    $('body').on('click', '.reaction-content', function (){
        $(this).children(".complete").show();
        $(this).children(".dots").hide();
    });

    $('body').on('click', '#reaction_form', function (){
        $(this).removeClass('one-line')
    });

    $('body').on('click', '.vote', function (){
        if (is_authenticated == true) {
            var reaction_id = $(this).parent().parent().parent().attr('id')
            var direction = $(this).attr('data')
            api_reaction_url = '/api/reaction/' + reaction_id + '/'
            $.ajax({
                url: api_reaction_url,
                type: 'put',
                data: {'direction': direction},
                success: function() {
                    loadComments()
                }
            });
        } else {
            $("#registerModal").modal()
        }

    });
    loadComments()
    loadRatings()
    makeIndexActive(1, true)
    $('#fullpage').fullpage({
        scrollOverflow: true,
        verticalCentered: false,
        // scrollBar: true,
        // anchors: ['firstPage', 'aboutPage', 'critiquePage'],
        // menu: '#artMenu',
        afterLoad: function(anchorLink, index){
                makeIndexActive(index, true)
                if (index == 1){
                } else {

                }
            }
        });
    $('.artGallery').lightGallery({
        selector: '.artImg'
    });


    if (is_authenticated == true ) {
        document.getElementById("upload_widget_opener").addEventListener("click", function() {
            cloudinary.openUploadWidget({
                cloud_name: 'artpigeon',
                upload_preset: 'x9dtj86z',
                theme: 'minimal'
                },
                function(error, result) {
                    addImageToArt(result)
                });
            },
            false);
    }
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
})