function bindLostContentGroupBtn() {
    $('.lost-content-group').click(function() {
        window.open("./lostDetailed.html", "_blank");
    })
}

$.ajax({
    type: "GET",
    url: "api/external/get/property?token=" + token + "&type=1",
    contentType: 'application/json',
    // data: JSON.stringify({

    // }),
    success: function(response) {
        var lostArr = $.parseJSON(response).data;
        var lostID = lostArr[0].id;
        localStorage.setItem('lostID', lostID);
        lostArr.forEach(function(ele, index) {
            var oCloneDom = $('.lost-content-group-tpl').clone().removeClass('lost-content-group-tpl').addClass('lost-content-group');
            var contact = "";
            if (ele.user_phone) {
                contact = "【手机】" + ele.user_phone;
            } else if (ele.user_qq) {
                contact = "【QQ】" + ele.user_qq;
            }
            oCloneDom.find('div').find('h3')
                .text("【失物招领】" + ele.title)
                .next()
                .text("详情介绍:" + ele.content)
                .next()
                .text("丢失者姓名 :" + ele.user_name)
                .next()
                .text("联系方式:" + contact);

            oCloneDom.appendTo($('.lost-content'));
        });
    },
    error: function(error) {
        console.log(error.status, error.statusText);
    }
}).then(function() {
    bindLostContentGroupBtn();
})