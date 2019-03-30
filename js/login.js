var countData = 0,
    count = getLocalStorage('count') || 0;

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
            var $captcha = $('.captcha');
            $captcha.find('img').attr('src', 'data:image/png;base64,' + base);
            $captcha.css({ display: 'block' });
        },
        error: function(error) {
            console.log(error.status, error.statusText);
        }
    })
}

function login(x, y) {
    $.ajax({
        type: "POST",
        url: "/api/user/login",
        contentType: 'application/json',
        data: JSON.stringify({
            'credential': x,
            'password': y
        }),
        dataType: 'json',
        success: function(response) {
            var tok = response.token;
            var status = response.status;
            localStorage.setItem('myCat', tok);
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
            var responseObj = response.responseJSON;
            var status = $.parseJSON(responseObj.status);
            if (status == -1) {
                alert("未知错误");
            } else if (status == 1) {
                alert("账号或密码错误");
                count++;
                setLocalStorage('count', count);
            }
        }
    })
}

$(document).ready(function() {
        $(".login-btn").click(function(e) {
            e.preventDefault();
            var id = $("#id").val();
            var password = $("#password").val();
            if (id == "" || password == "") {
                alert("请输入账号密码");
                return
            }
            if (count >= 2) {
                imgCaptcha();
            }
            login(id, password);
        })
    })
    // TODO 验证码改成小写