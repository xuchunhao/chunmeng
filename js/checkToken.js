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
            personObj = res.info;
            personID = personObj.id;
            // window.location.href = "./secondpage.html";
            // var id = res.info.id;
            // window.location.href = "./secondpage.html";
            // localStorage.setItem('myCat', id)
            // window.location.href = "./secondpage.html?txt=" + id;
        }
    }).then(function() {
        $(".portrait-index").attr('src', "./api/external/get/portrait/" + personID);
    })
}