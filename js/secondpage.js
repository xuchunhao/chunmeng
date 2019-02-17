var loc = location.href;
var n1 = loc.length;
var n2 = loc.indexOf('=');
var txt = decodeURI(loc.substr(n2 + 1, n1 - n2));
var box = document.getElementsByTagName('dt')[0];
box.innerHTML = txt;


$('dd').click(function() {
    $('dd').removeClass('active');
    $(this).addClass('active');
    $('.right-content div').removeClass('show');
    var dataId = $(this).attr('data-id');
    $("." + dataId).addClass('show');
});