function addTextCenter() {
    var clientWidth = $(window).width();
    if (clientWidth < 768) {
        $(".finally").addClass('text-center');
    } else {
        $(".finally").removeClass('text-center');
    }
}
$(window).resize(function() {
    addTextCenter();
})
addTextCenter();