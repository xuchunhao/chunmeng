var rand = "";
var hash = "";
var imgCaptchaStatus = 10;
var phone = 0;
var phonehash = "";
var phoneRand = "";
imgCaptcha();

function imgCaptchaOnblur() {
    var imgCaptchaInput = $('.img-captcha-input').val().toLowerCase();
    hash = hex_md5(imgCaptchaInput + rand);
    $.ajax({
        type: "POST",
        url: "/api/external/captcha",
        contentType: 'application/json',
        data: JSON.stringify({
            "id": 1,
            "status": 0,
            "type": "img",
            "subtype": "validate",
            "data": { "hash": hash }
        }),
        success: function(response) {
            alert('验证码正确')
            var responseObj = $.parseJSON(response);
            imgCaptchaStatus = responseObj.status;
        },
        error: function(error) {
            console.log(error.status, error.statusText);
        }
    })
}
$(document).ready(function() {
    $('.img-captcha-input').blur(function() {
        imgCaptchaOnblur();
    })
})
$('.get').on('click', function(e) {
    console.log(111);
    e.preventDefault();
    if (imgCaptchaStatus == 0) {
        phone = $('#phone').val();
        $.ajax({
            type: "POST",
            url: "/api/external/captcha",
            contentType: 'application/json',
            data: JSON.stringify({
                "id": 1,
                "status": 0,
                "type": "sms",
                "subtype": "generate",
                "data": {
                    "phone": phone,
                    "hash": hash
                }
            }),
            success: function(response) {
                var responseObj = $.parseJSON(response);
                phoneRand = responseObj.data.rand;
            },
            error: function(error) {
                console.log(error.status, error.statusText);
            }
        })
    }
})
$('.register-btn').on('click', function(e) {
    e.preventDefault();
    var phoneCaptcha = $('#phone-captcha').val();
    phonehash = hex_md5(phoneCaptcha + phoneRand);
    console.log(hash, phonehash);
    var id = $('#id').val();
    var password = $('#password').val();
    var name = $('#name').val();
    console.log(id, password, name, phone);
    $.ajax({
        type: "POST",
        url: "/api/user/register",
        contentType: 'application/json',
        data: JSON.stringify({
            "id": id,
            "password": password,
            "name": name,
            "phone": phone,
            "captchaImage": hash,
            "captchaSms": phonehash
        }),
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.log(error.status, error.statusText);
        }
    })
})