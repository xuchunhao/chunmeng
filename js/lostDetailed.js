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