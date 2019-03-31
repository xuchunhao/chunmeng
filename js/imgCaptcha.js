function imgCaptcha() {
    var baseObj = {};
    var base = "";
    $.ajax({
        type: "POST",
        url: "/api/external/captcha",
        contentType: 'application/json',
        data: JSON.stringify({
            "id": 1,
            "status": 0,
            "type": "img",
            "subtype": "generate",
            "data": {}
        }),
        success: function(response) {
            baseObj = $.parseJSON(response);
            base = baseObj.data.imgdata;
            var $captcha = $('.img-captcha');
            $captcha.find('img').attr('src', 'data:image/png;base64,' + base);
            $captcha.css({ display: 'block' });
            rand = baseObj.data.rand;
        },
        error: function(error) {
            console.log(error.status, error.statusText);
        }
    })
}