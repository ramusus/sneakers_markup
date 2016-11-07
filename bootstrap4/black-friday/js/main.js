jQuery(document).ready(function($){
	var $panelToggle = $('.js-panel-toggle'),
        $page = $('.page'),
        $panelClass = '',
        $panel = '';

	//open-close panel
	$panelToggle.on('click', function(event){
		event.preventDefault();
        
		$(this).toggleClass('is-clicked');
        if($(this).hasClass('panel-toggle_left')) {
            $panelClass = 'panel-left-is-open';
    		$panel = $('.panel_left');
        } else if($(this).hasClass('panel-toggle_right')) {
            $panelClass = 'panel-right-is-open';
    		$panel = $('.panel_right');
        }
		$page.toggleClass($panelClass);
		$panel.toggleClass($panelClass);
	});

	//close panel clicking outside the menu itself
	$page.on('click', function(event){
		if( !$(event.target).is('.js-panel-toggle, .js-panel-toggle span') ) {
			$panelToggle.removeClass('is-clicked');
			$page.removeClass('panel-left-is-open');
			$page.removeClass('panel-right-is-open');
			$('.panel_left').removeClass('panel-left-is-open');
			$('.panel_right').removeClass('panel-right-is-open');
		}
	});
    
    // Scroll for Rules
    $('.panel').perfectScrollbar({suppressScrollX:true});
    
    // Fade in animation for text
    function fadeInText(element) {
      //get the welcome msg element
      var $all_msg = $(element);
      //get a list of letters from the welcome text
      var $wordList = $(element).text().split("");
      //clear the welcome text msg
      $(element).html("");
      //loop through the letters in the $wordList array
      var tagGoing = "";
      $.each($wordList, function(idx, elem) {
        if (elem == "<") {
          //if we encountered this symbol it means a tag started
          tagGoing += elem;
        } else if (elem == ">") {
          //if we encountered this symbol it means a tag closed
          tagGoing += elem;
          //create the tag from the collected parts and append it
          //to the output html:
          var $foundTag = $(tagGoing).appendTo($all_msg);
          $foundTag.css({
            opacity: 0
          });
          $foundTag.delay(idx * 70);
          $foundTag.animate({
            opacity: 1
          }, 600);

          //reset the tag collector:
          tagGoing = "";
        } else {
          //if we are inside a tag
          if (tagGoing != "") {
            //if we are inside a tag, then just append the
            //current character to the output html
            tagGoing += elem;
          } else {

            //create a span for the letter and set opacity to 0
            var newEL = $("<span/>").text(elem).css({
              opacity: 0
            });
            //append it to the welcome message
            newEL.appendTo($all_msg);
            //set the delay on the animation for this element
            newEL.delay(idx * 70);
            //animate the opacity back to full 1
            newEL.animate({
              opacity: 1
            }, 600);
          }
        }
      });

    }  
    
    fadeInText('.js-fade-in-1');
    
    $(".js-fade-in-2, .js-fade-in-3").css("opacity","0");

    setTimeout(function() {
        $('.js-counter').css("opacity","0.0").countdown("2016/11/11", function(event) {
            var totalHours = event.offset.totalDays * 24 + event.offset.hours;
            $(this).html(event.strftime(totalHours + 'h %Mm %Ss'));
        }).animate({opacity: "1"},1000);
     }, 3500);
    
    setTimeout(function() {
        $('.js-fade-in-2').css("opacity","1");
        fadeInText('.js-fade-in-2');  
    }, 4000);
    
    setTimeout(function() {
        $('.js-fade-in-3').css("opacity","1");
        fadeInText('.js-fade-in-3');  
    }, 7000);

    // Audio Controls
	$('.js-play').on('click', function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });
	$('.js-pause').on('click', function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });
    
    // Copy to clipboard
    function copyToClipboard($text) {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val($text).select();
      document.execCommand("copy");
      $temp.remove();
    }
    
	$('.js-copy-link').on('click touchstart', function(){
        var $copyText = $(this).attr('href'); 
        copyToClipboard($copyText);
        $(this).addClass('copied');
        return false;
    });
    
	$('.js-copy-link').on('mouseleave touchend', function(){
        $(this).removeClass('copied');
    });    

 });