function bindLostContentGroupBtn() {
    $('.lost-content-group').click(function() {
        window.location.href = "./lostDetailed.html"
    })
}

$.ajax({
    type: "GET",
    url: "/api/external/get/property/find?token=9763393e42ef2b8f051caefbec8a522f31a38663a7180d69d1a9cb1addaa76ac", //+ token,
    contentType: 'application/json',
    // data: JSON.stringify({

    // }),
    success: function(response) {
        var lostArr = $.parseJSON(response).data;
        lostArr.forEach(function(ele, index) {
            var oCloneDom = $('.lost-content-group-tpl').clone().removeClass('lost-content-group-tpl').addClass('lost-content-group');
            // div jquery cache
            var contact = "";
            if (ele.loser_phone) {
                contact = ele.loser_phone;
            } else if (ele.loser_qq) {
                contact = ele.loser_qq;
            }
            oCloneDom.find('div').find('h3')
                .text("【失物招领】" + ele.title)
                .next()
                .text("详情介绍:" + ele.content)
                .next()
                .text("丢失者姓名 :" + ele.loser_name)
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