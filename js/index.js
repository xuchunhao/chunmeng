var registerClick = document.getElementsByClassName('register-click'),
    register = document.getElementsByClassName('register')[0],
    loginClick = document.getElementsByClassName('login-click'),
    login = document.getElementsByClassName('login')[0],
    countData = 0,
    count = getLocalStorage('count') || 0;

function registerClickEvent() {
    for (var i = 0; i < registerClick.length; i++) {
        registerClick[i].onclick = function() {
            register.style.display = "block";
        }
    }

}

function loginClickEvent() {
    for (var i = 0; i < loginClick.length; i++) {
        loginClick[i].onclick = function() {
            login.style.display = "block";
        }
    }
}

function delRegister() {
    var del = document.getElementsByClassName('del');
    for (var i = 0; i < del.length; i++) {
        del[i].onclick = function() {
            register.style.display = "none";
            login.style.display = "none";
        }
    }
}
registerClickEvent();
loginClickEvent();
delRegister();

$(window).scroll(function() {
    var content = document.getElementsByClassName('four-rows')[0];
    if (content.offsetTop <= window.pageYOffset + window.innerHeight) {
        $('.row1').children().animate({ opacity: "1" }, 500, 'swing', function() {
            $('.row2').children().animate({ opacity: "1" }, 500, 'swing', function() {
                $('.row3').children().animate({ opacity: "1" }, 500, 'swing', function() {
                    $('.row4').children().animate({ opacity: "1" }, 500, 'swing');
                })
            })
        })
    }
});
// $(window).scroll(function() {
//     var content = document.getElementsByClassName('four-rows')[0];
//     if (content.offsetTop <= window.pageYOffset + window.innerHeight) {
//         $('.big1').animate({ fontSize: "20px", opacity: "1" }, 500, 'swing', function() {
//             $('.big2').animate({ fontSize: "20px", opacity: "1" }, 500, 'swing', function() {
//                 $('.big3').animate({ fontSize: "20px", opacity: "1" }, 500, 'swing', function() {
//                     $('.big4').animate({ fontSize: "20px", opacity: "1" }, 500, 'swing')
//                 })
//             })
//         })
//     }
// });

$('button').click(function(e) {
    e.preventDefault();
})
$(document).ready(function() {
        $(".login-btn").click(function(e) {
            e.preventDefault();
            var loginForm = document.getElementById('login-form');
            var id = loginForm.id.value;
            var password = loginForm.password.value;
            if (id == "" || password == "") {
                alert("请输入账号密码");
                return
            }
            if (count >= 3) {
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
                        $('.captcha').attr('src', 'data:image/png;base64,' + base);
                    },
                    error: function(error) {
                        console.log(error.status, error.statusText);
                    }
                })
            }
            $.ajax({
                type: "POST",
                url: "/api/user/login",
                contentType: 'application/json',
                data: JSON.stringify({
                    'credential': id,
                    'password': password
                }),
                dataType: 'json',
                success: function(response) {
                    var tok = response.token;
                    var status = response.status;
                    if (status == 0) {
                        $.ajax({
                            type: "GET",
                            url: "/api/user/info",
                            contentType: 'application/json',
                            data: {
                                'token': tok
                            },
                            dataType: 'json',
                            success: function(res) {
                                var id = res.info.id;
                                window.location.href = "./secondpage.html";
                                localStorage.setItem('myCat', id)
                                    // window.location.href = "./secondpage.html?txt=" + id;
                            }
                        })
                    }
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
        })
    })
    // TODO 验证码改成小写