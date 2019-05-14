// $.ajax({
//     type: "POST",
//     url: "/api/external/get/property/find?token=" + token,
//     contentType: 'application/json',
//     data: JSON.stringify({

//     }),
//     success: function(response) {
//         console.log(response);
//     },
//     error: function(error) {
//         console.log(error.status, error.statusText);
//     }
// })

// shopArr.forEach(function (ele, index) {
//     var oCloneDom = $('.tpl').clone().removeClass('tpl');
//     // div jquery cache
//     oCloneDom.data({
//         id: ele.id,
//         shopName: ele.shopName,
//         price: ele.price
//     }).find('p')
//             .text(ele.name)
//                 .next()
//                     .text(ele.price);

//    oCloneDom.insertBefore($('.show'));              
// });
var lostID = localStorage.setItem('lostID', lostID);;

$.ajax({
    type: "GET",
    url: "api/external/get/property?token=" + token + "&type=1" + "&id=" + lostID,
    contentType: 'application/json',
    // data: JSON.stringify({
    //     "id": lostID
    // }),
    success: function(response) {
        var lostArr = $.parseJSON(response).data;
        console.log(lostArr)
        lostArr.forEach(function(ele, index) {
            var contact = "";
            if (ele.user_phone) {
                contact = "【手机】" + ele.user_phone;
            } else if (ele.user_qq) {
                contact = "【QQ】" + ele.user_qq;
            }
            $('.lost-detailed-list').find('p')
                .text(ele.title)
                .next()
                .text(ele.content)
                .next()
                .text(ele.user_name)
                .next()
                .text(contact);
        });
    },
    error: function(error) {
        console.log(error.status, error.statusText);
    }
})