var registerClick = document.getElementsByClassName('register-click'),
    register = document.getElementsByClassName('register')[0],
    loginClick = document.getElementsByClassName('login-click'),
    login = document.getElementsByClassName('login')[0];

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
        $('.big1').animate({ fontSize: "20px", opacity: "1" }, 500, 'swing', function() {
            $('.big2').animate({ fontSize: "20px", opacity: "1" }, 500, 'swing', function() {
                $('.big3').animate({ fontSize: "20px", opacity: "1" }, 500, 'swing', function() {
                    $('.big4').animate({ fontSize: "20px", opacity: "1" }, 500, 'swing')
                })
            })
        })
    }
});

$('button').click(function(e) {
    e.preventDefault();
})
$(document).ready(function() {
    $(".login-btn").click(function(e) {
        e.preventDefault();
        var loginForm = document.getElementById('login-form');
        var id = loginForm.id.value;
        var password = loginForm.password.value;
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
                            window.location.href = "./secondpage.html?txt=" + id;
                        }
                    })
                } else if (status == -1) {
                    alert("未知错误");
                } else if (status == 1) {
                    alert("账号或密码错误");
                }
            }
        })
    })
})