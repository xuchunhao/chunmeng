var token = localStorage.getItem('tok');
var personObj = {};
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
            personObj = res.info;
            window.location.href = "./secondpage.html";
            // var id = res.info.id;
            // window.location.href = "./secondpage.html";
            // localStorage.setItem('myCat', id)
            // window.location.href = "./secondpage.html?txt=" + id;
        }
    })
}