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
            oCloneDom.find('div').find('p')
                .text("姓名:" + ele.loser_name)
                .next()
                .text("联系方式:" + ele.loser_phone)
                .next()
                .text("丢失物介绍:" + ele.lab)
                .next()
                .text("备注:" + ele.title);

            oCloneDom.appendTo($('.lost-content'));
        });
    },
    error: function(error) {
        console.log(error.status, error.statusText);
    }
}).then(function() {
    bindLostContentGroupBtn();
})