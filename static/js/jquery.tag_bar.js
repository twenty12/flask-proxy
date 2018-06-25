$.get( "/api/tags", function( data ) {
    console.log(data)
    var existingTags = []
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]['name   '])
        existingTags.push(data[i]['name'])
    }
    $('#tagFeild')
        .tagify( {
            whitelist: existingTags
        }
            )

});
