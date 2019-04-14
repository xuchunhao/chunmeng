var imgKind = "";
$('dd').click(function() {
    $('dd').removeClass('active');
    $(this).addClass('active');
    $('.right-content div').removeClass('show');
    var dataId = $(this).attr('data-id');
    $("." + dataId).addClass('show');
});

// $(document).ready(function() {
$('.portrait-select').one("click", function(e) {
    $('#portrait-input').click();
});
// });
var imgBase64 = "";
$('#portrait-input').on('change', function() {
    var xxx = document.getElementById('portrait-input').value;
    var f = document.getElementById('portrait-input').files[0];
    imgKind = xxx.substring((f.type.lastIndexOf(".")) + 1);
    var reader = new FileReader();
    var obj = reader.readAsDataURL(f);
    reader.onload = function(e) {
        // e.target.result就是该文件的完整Base64 Data-URI
        imgBase64 = e.target.result;
        $('.portrait-basic').attr('src', imgBase64)
            .cropper({
                aspectRatio: 1 / 1,
                autoCropArea: .9
                    // crop: function(data) {
                    //     console.log(data);
                    //}
            });
    }
})

$('.portrait-basic').on(
    // 'cropend',
    // function(e) {
    //     var cropCanvas = $('.portrait-basic').cropper('getCroppedCanvas');
    //     var cropUrl = cropCanvas.toDataURL('image/jpeg', 0.4);
    //     $('.portrait-example').attr("src", cropUrl);
    // },
    // 'cropmove',
    // function(e) {
    //     var cropCanvas = $('.portrait-basic').cropper('getCroppedCanvas');
    //     var cropUrl = cropCanvas.toDataURL('image/jpeg', 0.4);
    //     $('.portrait-example').attr("src", cropUrl);
    // },
    'cropstart cropmove cropend ready',
    function(e) {
        var cropCanvas = $('.portrait-basic').cropper('getCroppedCanvas');
        var cropUrl = cropCanvas.toDataURL('image/jpeg', 0.4);
        $('.portrait-example').attr("src", cropUrl);
    }
)
$('.rotate_l').click(function() {
    $('.portrait-basic').cropper('rotate', -90).trigger('cropend');
})

$('.rotate_r').click(function() {
    $('.portrait-basic').cropper('rotate', 90).trigger('cropend');
})
$('.portrait-btn').click(function(e) {
    e.preventDefault();
    console.log(111);
    var sr = $('.portrait-example').attr("src");
    var img = new Image();
    img.src = sr;
    var newimgBase64 = getBase64Image(img);
    console.log(newimgBase64);

    $.ajax({
        type: "POST",
        url: "/api/external/portrait",
        contentType: 'application/json',
        data: JSON.stringify({
            id: 1,
            type: "portrait",
            subtype: "upload",
            status: 0,
            data: {
                id: "1180230024",
                name: "许淳皓",
                base64: newimgBase64,
                type: "png"
                    // imgKind
            }
        }),
        success: function(response) {
            var responseObj = $.parseJSON(response);
            var portraitURL = responseObj.data.url;
            console.log(portraitURL);
            $('.portrait-index').attr('src', portraitURL);
            console.log(222);
            window.location.href = "./userinfo.html";
        },
        error: function(error) {
            console.log(error.status, error.statusText);
        }
    })
})