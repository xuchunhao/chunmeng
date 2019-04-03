var imgHash = "";
var imgCaptchaStatus = 10;

function imgCaptchaOnblur() {
    // 输入焦点时验证图片验证码
    var imgCaptchaInput = $('.img-captcha-input').val().toLowerCase();
    imgHash = hex_md5(imgCaptchaInput + imgRand);
    $.ajax({
        type: "POST",
        url: "/api/external/captcha",
        contentType: 'application/json',
        data: JSON.stringify({
            "id": 1,
            "status": 0,
            "type": "img",
            "subtype": "validate",
            "data": { "hash": imgHash }
        }),
        success: function(response) {
            var responseObj = $.parseJSON(response);
            imgCaptchaStatus = responseObj.status;
            if (imgCaptchaStatus == 0) {
                $('.ico').removeClass('glyphicon-remove').addClass('glyphicon-ok').css({ color: 'green' });
                lock = null;
            } else if (imgCaptchaStatus == -1) {
                $('.ico').removeClass('glyphicon-ok').addClass('glyphicon-remove').css({ color: 'red' });
                lock = true;
            }
        },
        error: function(error) {
            console.log(error.status, error.statusText);
        }
    })
}
$(document).ready(function() {
    $('.img-captcha-input').on('blur', function() {
        imgCaptchaOnblur();
    })
})