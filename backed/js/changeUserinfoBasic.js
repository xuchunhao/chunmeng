$('.change-info-basic-btn').on('click', function() {
    var personName = $('#info-basic-name').val();
    var personNickname = $('#info-basic-nickname').val();
    var personEmail = $('#info-basic-email').val();
    $.ajax({
        type: "POST",
        url: "/api/user/info/update?token=" + token,
        contentType: 'application/json',
        data: JSON.stringify({
            name: personName,
            email: personEmail,
            nickname: personNickname,
            "token": token
        }),
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.log(error.status, error.statusText);
        }
    })
})