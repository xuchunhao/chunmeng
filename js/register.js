// var imgRand = "";
// var imgHash = "";
// var imgCaptchaStatus = 10;
var phone = 0;
var phonehash = "";
var phoneRand = "";

imgCaptcha();
getPhoneCaptchaBtn();
registerBtn();
var num = 180;

function clock() {
    num > 0 ? num-- : clearInterval(int);
    $('p').text('请在' + num + '秒内输入手机验证码');
}

$('.img-captcha').find('img').on('click', function() {
    imgCaptcha();
})

function getPhoneCaptchaBtn() {
    // 获取手机验证码
    $('.get').on('click', function(e) {
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
                        "hash": imgHash
                    }
                }),
                success: function(response) {
                    var responseObj = $.parseJSON(response);
                    phoneRand = responseObj.data.rand;
                    var int = setInterval("clock()", 1000);
                },
                error: function(error) {
                    console.log(error.status, error.statusText);
                }
            })
        }
    })
}


function registerBtn() {
    $('.register-btn').on('click', function(e) {
        // 注册
        e.preventDefault();
        var phoneCaptcha = $('#phone-captcha').val();
        phonehash = hex_md5(phoneCaptcha + phoneRand);
        var id = $('#id').val();
        var password = $('#password').val();
        var name = $('#name').val();
        $.ajax({
            type: "POST",
            url: "/api/user/register",
            contentType: 'application/json',
            data: JSON.stringify({
                "id": id,
                "password": password,
                "name": name,
                "phone": phone,
                "captchaImage": imgHash,
                "captchaSms": phonehash
            }),
            success: function(response) {
                // var responseObj = $.parseJSON(response);
                // var status = responseObj.status;
                console.log(response);
                var status = response.status;
                // console.log(response, status, responseObj);
                if (status == "success") {
                    alert('注册成功');


                    $.ajax({
                        type: "POST",
                        url: "/api/user/login",
                        contentType: 'application/json',
                        data: JSON.stringify({
                            'credential': id,
                            'password': password,
                        }),
                        dataType: 'json',
                        success: function(response) {
                            var tok = response.data.token;
                            // var status = response.status;
                            localStorage.setItem('tok', tok);
                            window.location.href = "./secondpage.html";
                            // if (status == 0) {
                            //     $.ajax({
                            //         type: "GET",
                            //         url: "/api/user/info",
                            //         contentType: 'application/json',
                            //         data: {
                            //             'token': tok
                            //         },
                            //         dataType: 'json',
                            //         success: function(res) {
                            //             var id = res.info.id;
                            //             window.location.href = "./secondpage.html";
                            //             localStorage.setItem('myCat', id)
                            //                 // window.location.href = "./secondpage.html?txt=" + id;
                            //         }
                            //     })
                            // }
                        },
                        error: function(response) {
                            // var responseObj = response.responseJSON;
                            // var status = $.parseJSON(responseObj.status);
                            // if (status == -1) {
                            //     alert("未知错误");
                            // } else if (status == 1) {
                            //     alert("账号或密码错误");
                            //     count++;
                            //     setLocalStorage('count', count);
                            // }
                        }
                    })




                }
            },
            error: function(error) {
                var responseObj = error.responseJSON;
                var status = responseObj.status;
                // if (status == 1) {
                //     alert('学号已注册');
                // } else if (status == 2) {
                //     alert('图片验证码错误');
                // } else if (status == 3) {
                //     alert('短信验证码错误');
                // }
                switch (status) {
                    case "error_id_existed":
                        alert('学号或者手机已被注册');
                        break;
                    case "error_invalid_image_captcha":
                        alert('图片验证码不正确');
                        break;
                    case "error_invalid_sms_captcha":
                        alert('短信验证码不正确');
                        break;
                    case "error_id_name_not_matches":
                        alert('	学号和名字不匹配');
                        break;
                }
            }
        })
    })
}

// function CountDown() {
//     if (maxtime >= 0) {
//         minutes = Math.floor(maxtime / 60);
//         seconds = Math.floor(maxtime % 60);
//         msg = "距离结束还有" + minutes + "分" + seconds + "秒";
//         document.all["timer"].innerHTML = msg;
//         if (maxtime == 5 * 60) alert("还剩5分钟");
//         --maxtime;
//     } else {
//         clearInterval(timer);
//         alert("时间到，结束!");
//     }
// }
// timer = setInterval("CountDown()", 1000);