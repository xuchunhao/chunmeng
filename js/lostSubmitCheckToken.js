var token = localStorage.getItem('tok');
var personObj = {};
var personID = "0";
if (token) {
    $.ajax({
        type: "GET",
        url: "/api/user/info",
        contentType: 'application/json',
        data: {
            "token": token
        },
        dataType: 'json',
        success: function(res) {
            personObj = res.data;
            personID = personObj.id;
            // var id = res.info.id;
            // window.location.href = "./secondpage.html";
            // localStorage.setItem('myCat', id)
            // window.location.href = "./secondpage.html?txt=" + id;
        },
        error: function() {
            window.location.href = "./login.html";
        }
    }).then(function() {
        lostSubmitClick();
    })
} else if (!token) {
    window.location.href = "./login.html";
}
var id = localStorage.getItem('lostID')
console.log(id);

function lostSubmitClick() {
    $('.lost-submit').on('click', function() {

        $.ajax({
            type: "POST",
            url: "api/external/property?token=" + token + "&type=1",
            contentType: 'application/json',
            data: JSON.stringify({
                "type": "property",
                "subtype": "add",
                "data": {
                    "type": 1,
                    "lab": "测试",
                    "title": "测试标题",
                    "content": "我找到一件东西",
                    "occurrence_time": "2019-04-22 16:17:42",
                    "user_name": "王凌超",
                    "user_phone": "123456",
                    "user_qq": "893721708",
                    "publish_time": "",

                }
            }),
            success: function(response) {
                var lostArr = $.parseJSON(response).data;
                console.log(response, lostArr)
            },
            error: function(error) {
                console.log(error.status, error.statusText);
            }
        })
    })
}