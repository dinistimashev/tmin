$(document).ready(function(){

	$('input[name="phone"]').inputmask('+7(999) 999-99-99');

	$('form').each(function(){
		var $form = $(this);
		var $input = $('input[type="text"]', this);
		var $name = $form.find('input[name="name"]', this);
		var $phone = $form.find('input[name="phone"]', this);
		var $mes = $form.find('textarea[name="mes"]', this);
		var $btn = $form.find('button[type="button"]', this); 
		var $textarea = $form.find('textarea', this); 


		$input.focus(function(){
			var place = $(this).attr('placeholder');
			$(this).removeAttr('placeholder');

			$(this).blur(function(){
				$(this).attr('placeholder', place);
			});        
		});

		$textarea.focus(function(){
			var place = $(this).attr('placeholder');
			$(this).removeAttr('placeholder');

			$(this).blur(function(){
				$(this).attr('placeholder', place);
			});        
		});

		$btn.click(function(){
			var name =  $name.val();
			var phone = $phone.val();
			var mes = $mes.val();

			$input.removeClass('error');

			var f = 0;
			if(phone==''){
				f = 1;
				$phone.addClass('error');
				$name.focus();
			}

			if(name==''){
				f = 1;
				$name.addClass('error');
			}

			if(f==0){
				$.ajax({
					type: "POST",
					url: "js/php.php",
					data: {name: name, phone:phone, mes:mes},
					success :function (data) {
						yaCounter26985786.reachGoal('send');
						$input.val('');
						$('textarea').val('');
						$('.popup').fadeOut();
						$('.thankyou').fadeIn();
						$('.bg_popup').fadeIn();

						setTimeout(function(){
							$('.thankyou').fadeOut();
							$('.bg_popup').fadeOut();
						}, 6000);
					},

					dataType : 'text'
				});
			}

		});
	});


	$('.sertifikat a').each(function(){
		$(this).fancybox();
	});

	$(".menu a").click(function () { 
	    elementClick = $(this).attr("href");
	    destination = $(elementClick).offset().top;
        $('body').animate( { scrollTop: destination }, 1100 );
        $('html').animate( { scrollTop: destination }, 1100 );
	    return false;
    });

    $('.scroll_goods').click(function(){
    	$('body').animate( { scrollTop: $('#id3').offset().top }, 1100 );
        $('html').animate( { scrollTop: $('#id3').offset().top }, 1100 );
    });

	var $menu = $('.menu');
	var $menuWrap = $('.menu_wrap');
	$(window).scroll(function(){

		if($(window).scrollTop() >= $menuWrap.offset().top ){
			$menu.addClass('active');
		}
		else{
			$menu.removeClass('active');
		}
	});

	$('.slider').rubberCarousel({
		visible: 1,
		buttons: true,
		buttons_style: false,
		wrap: 'circular'
	});

	$('.slider_doc').rubberCarousel({
		visible: 1,
		buttons: true,
		buttons_style: false,
		wrap: 'circular'
	});

	$('.open_popup_u').click(function(){

		$('.universal h6').text($(this).data('h'));

		$('.universal').fadeIn();
		$('.bg_popup').fadeIn();

		$('.bg_popup').click(function(){
			$('.universal').fadeOut();
			$('.bg_popup').fadeOut();
		});
	});

	$('.open_popup_k').click(function(){

		$('.kons').fadeIn();
		$('.bg_popup').fadeIn();

		$('.bg_popup').click(function(){
			$('.kons').fadeOut();
			$('.bg_popup').fadeOut();
		});
	});

	$('.conf').click(function(){
		$('.confid_popup').show().css('top', ($(window).height() - $('.confid_popup').height()) / 2 + $(window).scrollTop() + 'px');
		$('.bg_popup').show();

		$('.bg_popup, .krest').click(function(){
			$('.confid_popup').hide();
			$('.bg_popup').hide();
		});
	});

	var date = new Date(), 
    day = date.getDate() +1, 
	month = date.getMonth(), 
	year = date.getFullYear();

	$('#timer1').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer2').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer3').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer4').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer5').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer6').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer7').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer8').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer9').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer10').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer11').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer12').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer13').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer14').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer15').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });

    $('#timer16').countdown({
	    timestamp : (new Date(year, month, day)).getTime() + 01*01*01*60*1000
    });
});


























