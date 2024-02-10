
// SCROLLBAR 
function scrollIndicator() {
	var windowScroll = $(window).scrollTop();
	var height = $(document).height() - $(window).height();
  var scrolled = (windowScroll / height) * 100;
	$('#scrollBar').css('width', scrolled + '%');
}

$(window).scroll(function() {
	scrollIndicator();
});

// LIGHTBOX
// create element
function lightbox() {
	alert('test');
var $overlay = $('<div id="overlay"></div>');
var $wrap = $('<div class="wrap"></div>');
var $image = $('<img>');
var $caption = $('<p></p>');
var $close = $('<a href="#" class="close">&times;</a>');

// append method
$overlay.append($wrap);
$wrap.append($image);
$wrap.append($caption);
$wrap.append($close);
$('body').append($overlay);
 
}
 
	lightbox();
 
// click on each images
$('#photogallery').on('click', 'a', function (event) {
    event.preventDefault();

    var imageSrc = $(this).attr('href');
    $image.attr('src', imageSrc);

    var captionText = $(this).children().attr('alt');
    $caption.text(captionText);

    $overlay.show();
});

// click on close icon
$close.click(function () {
    $overlay.hide();
    return false;
});