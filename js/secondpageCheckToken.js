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
        $(".portrait-index").attr('src', "./api/external/get/portrait/" + personID);
        console.log(personObj)
        userinfoBasic();
    })
} else if (!token) {
    window.location.href = "./login.html";
}