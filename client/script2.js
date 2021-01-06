$(document).ready(() => {
    console.log('reload')

    // $('#test2').text('hello')

    $('#hide-btn').click(() => {
        console.log('klik')
        // $('#test1').hide()

        let textData = $('#test1').text()
        console.log(textData)
    })

    $('#show-btn').click(() => {
        console.log('klik')
        // $('#test1').show()

        $('#test1').text('Set Content')
    })

    $('#set-attr-btn').click(() => {
        $('#test1').attr('style', 'color:red')
    })
});