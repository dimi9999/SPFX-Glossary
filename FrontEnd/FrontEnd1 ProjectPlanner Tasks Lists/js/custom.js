
 
 

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

 

/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2016 Twitter, Inc.
 * Licensed under the MIT license
 */

// DO NOT DELETE THIS SCRIPT enables sub-nav to trigger modal form.
$('body').on('change', '#resmenu1', function() {
	$('#myModal').modal('show');
});

// MEGA MENU    
jQuery(document).ready(function () {
    
    $(".dropdown").hover(

        function() { $('.dropdown-menu', this).fadeIn("fast");
        },
        function() { $('.dropdown-menu', this).fadeOut("fast");
    });
});



// SEARCH FORM SCRIPT.
$(document ).ready(function() {
	    $("#search-btn").unbind('click').bind('click', function (e) {
	    e.preventDefault();
	    $(".navbar-form").animate({width: 'toggle'});
	    // $(".navbar-form").show();
	    // $("#search-btn").removeClass("navbar-toggle"); // IMPORTANTE TO REMOVE CLASS
	    // $("#search-btn").addClass("search-btn-active"); // IMPORTANTE TO ADD NEW CLASS <--
	    $("#search-btn").hide();
	    $("#search-btn").css("visibility", "hidden");
	    $("#search-remove").show(); /* display "X" */
	    
	    if ($(window).width() < 481) // <--
		{
			$('.navbar-brand').hide();
			
		}
    });
});


$(document ).ready(function() {
	$('.glyphicon-remove').click(function(e) {
		e.preventDefault();
		$('#search-btn').show(); 
		$("#search-btn").css("visibility", "visible");
		$('.navbar-form').hide();
		$('#search-btn').addClass("navbar-toggle")
		$('.navbar-brand').show();
		$(window).click(function() {
			$("#search-btn").show();
			$("#search-btn").css("visibility", "visible");
		});
		
	});
});




// WHEN DOCUMENT LOAD - hide btn X and hide search form
$(document ).ready(function() {
	$("#search-remove").hide();
	if($(window).width() < 1200) {
	$("#search-remove").show();
	$(".navbar-form").hide();
	}
});

/*
$(window).resize(function(e) {
	if($(window).width() > 1200) {	
		$('#search-btn').hide();
		$("#search-remove").hide(); 
		$('.navbar-form').show();
	} 
	else {
		$('#search-btn').show();
		$("#search-remove").show(); 
		$('.navbar-form').hide();
	}
});*/

// TAGGING SYSTEM - PLUGIN
$( "#hw-btn-caret" ).click(function(e) {
		$('#tokenfield').focus();
		$("#ui-id-1").show()			
});

// ↓↓↓↓↓↓↓↓↓↓ TOOLS & SYSTEMS - LOAD MORE BTN
$(document ).ready(function() {
	$("#hw-collapse-section").hide();	
	$("#btn-slide-up").hide();
});

function btnSlideDown() {
    $("#hw-collapse-section").slideDown(200);
    $("#btn-slide-down").hide();
    $("#btn-slide-up").show();
}

function btnSlideUp() {
    $("#hw-collapse-section").slideUp(200);
    $("#btn-slide-down").show();
    $("#btn-slide-up").hide();
}

// ↓↓↓↓↓↓↓↓↓↓ YOUR PROFILE IS ... 
$('#closeProgress').click(function(){
	if (  $( this ).css( "transform" ) == 'none' ){
        $(this).css("transform","rotate(45deg)");
    } else {
        $(this).css("transform","" );
    }
});

// ↓↓↓↓↓↓↓↓↓↓ Q&A SECTION
$('.hw-ph-filter').click(function(){
	$(this).find('i').toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
});


// SHOW LESS <a>
$("#hw-show-less").click(function() {
	$(this).parents().find('i').toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
});


// ↓↓↓↓↓↓↓↓↓↓ T05 LOAD MORE LINK
$(document ).ready(function() {
	$(".hidden-area").hide();	
	$("#load-slide-up").hide();
});
function loadSlideDown() {
    $(".hidden-area").slideDown(200);
    $("#load-slide-down").hide();
    $("#load-slide-up").show();
}
function loadSlideUp() {
    $(".hidden-area").slideUp(200);
    $("#load-slide-down").show();
    $("#load-slide-up").hide();
}

// ↓↓↓↓↓↓↓↓↓↓ T06 check all and uncheck all
$(document).ready(function(){
	$('#hw-checkAll').on('click',function() {
		// alert("Hey");
		$('input:checkbox').prop('checked', true);
	})
	$('#hw-uncheckAll').on('click',function() {
		// alert("Hey");
		$('input:checkbox').prop('checked', false);
	})
});

// ↓↓↓↓↓↓↓↓↓↓ T22 tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(document).ready(function () {

    alert('filter');
});

// ↓↓↓↓↓↓↓↓↓↓ T22 tooltip

// 1) ↓↓↓↓↓↓↓↓↓↓ JAVASCRIPT CODE CHANGES 21/06/2019 START ↓↓↓↓↓↓↓↓↓↓  

// ↓↓↓↓↓↓↓↓↓↓ D.P. 14/06/2019 Sticky News Toggle Start
function btnSlideDownStickyNews() {
    $("#stickyNews-collapse-section").slideDown(400);
    $("#btnNews-slide-down").hide();
    $("#btnNews-slide-up").show();
}

function btnSlideUpStickyNews() {
    $("#stickyNews-collapse-section").slideUp(400);
    $("#btnNews-slide-down").show();
    $("#btnNews-slide-up").hide();
}
// 1) ↓↓↓↓↓↓↓↓↓↓ D.P. 14/06/2019 Sticky News Toggle End


// 2) ↓↓↓↓↓↓↓↓↓↓ D.P. 21/06/2019 MyTasks Filter Dropdowns per Status Start  ↓↓↓↓↓↓↓↓↓↓  
 
// 2) ↓↓↓↓↓↓↓↓↓↓ D.P. 21/06/2019 MyTasks Filter Dropdowns per Status End  ↓↓↓↓↓↓↓↓↓↓  

// ↓↓↓↓↓↓↓↓↓↓ JAVASCRIPT CODE CHANGES 21/06/2019 END ↓↓↓↓↓↓↓↓↓↓  







 
    
















