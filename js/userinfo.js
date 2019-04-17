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
$('.portrait-repeat').on("click", function() {
        $('#portrait-input').click();
    })
    // });
var imgBase64 = "";
var filePortrait = 0;
$('#portrait-input').on('change', function() {
    //改这的xxx
    var xxx = document.getElementById('portrait-input').value;
    var f = document.getElementById('portrait-input').files[0];
    imgKind = xxx.substring((f.type.lastIndexOf(".")) + 1);
    var reader = new FileReader();
    var obj = reader.readAsDataURL(f);
    reader.onload = function(e) {
        // e.target.result就是该文件的完整Base64 Data-URI
        imgBase64 = e.target.result;
        if (filePortrait == 0) {
            $('.portrait-basic').attr('src', imgBase64)
                .cropper({
                    aspectRatio: 1 / 1,
                    autoCropArea: .9
                        // crop: function(data) {
                        //     console.log(data);
                        //}
                });
            filePortrait++;
        } else if (filePortrait > 0) {
            $('.portrait-basic').attr('src', imgBase64)
            $('.cropper-canvas img').attr('src', imgBase64);
            // .cropper({
            //     aspectRatio: 1 / 1,
            //     autoCropArea: .9
            //         // crop: function(data) {
            //         //     console.log(data);
            //         //}
            // });
            // $('.cropper-view-box img').attr('src', imgBase64);
            // var sr = $('.cropper-canvas img').attr("src");
            // var img = new Image();
            // console.log(sr, img)
            // img.src = sr;
            // console.log(img)
            // var newimgBase64 = getBase64Image(img);
            // console.log(newimgBase64);
            // $('.portrait-example').attr("src", sr)
            // var cropCanvas = $('.cropper-canvas img').cropper('getCroppedCanvas');
            // var cropUrl = cropCanvas.toDataURL('image/jpeg', 0.4);
            // console.log(cropCanvas, cropUrl);
            // $('.portrait-example').attr("src", cropUrl);
        }
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
    'cropstart cropmove cropend ready crop zoomend',
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
                id: personObj.id,
                name: personObj.name,
                base64: newimgBase64,
                type: "png"
                    // imgKind
            }
        }),
        success: function(response) {
            var responseObj = $.parseJSON(response);
            var portraitURL = responseObj.data.url;
            $('.portrait-index').attr('src', portraitURL);
            window.location.href = "./userinfo.html";
        },
        error: function(error) {
            console.log(error.status, error.statusText);
        }
    })
})