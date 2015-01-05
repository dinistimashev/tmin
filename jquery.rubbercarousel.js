/* rubberCarousel v0.1 | http://github.com/codefucker/rubberCarousel
 * © Anatoly Lunev | toliklunev.ru | toliklunev@gmail.com
 * Licensed under the MIT License */

(function($){
	jQuery.fn.rubberCarousel = function(options){

		var configuration = {
			visible          : 1,
			scroll           : 1,
			start            : 0,
			duration         : 500,
			easing           : 'swing',
			wrap             : 'normal',
			prefix           : false,
			keybind          : false,
			buttons          : false,
			buttons_style    : true,
			pagination       : false,
			pagination_style : true,
			abort_on_error   : true,
			min_item_width   : false,
			disable_buttons  : true,
			before: function(){}
		};

		configuration = $.extend(configuration, options);

		function make(){
			var $carousel  = $(this);
			var $items     = $carousel.children('div');
			var $list      = $items.wrapAll('<div></div>').parent();
			var $wrap      = $list.wrap('<div></div>').parent();
			var $wrapper   = $wrap.wrap('<div></div>').parent();

			var $btn_prev  = $carousel.children('.prev');
			var $btn_next  = $carousel.children('.next');
			var $buttons   = $btn_prev.add($btn_next);

			var $visibles;
			var visible;

			if(configuration.min_item_width){
				visible = Math.min(Math.floor($list.width() / configuration.min_item_width), configuration.visible);
			}

			else{
				visible = configuration.visible;
			}

			var left        = 0;
			var frame_width = 100;
			var items_size  = $items.size();
			var current     = configuration.start;
			var max_current = items_size - visible;
			var max_left    = frame_width;

			var prefix      = configuration.prefix ? 'rubber_сarousel__' : '';

			$wrap.addClass(prefix + 'wrap');
			$items.addClass(prefix + 'item');

			if(configuration.pagination){
				var $pagination, $pagination_items;
				var pages = Math.ceil(items_size / configuration.scroll);
				var page  = Math.ceil(configuration.start / configuration.scroll);
			}

			if(visible > 1){
				frame_width = Math.floor(100 / visible);
				max_left    = (-1) * max_current * frame_width;
				$wrap.css('margin-right', (-1) * (100 % frame_width) + '%');
			}

			$wrapper.css({'overflow': 'hidden'});

			$carousel.css({
				'position': 'relative'
			});

			$list.css({
				'white-space': 'nowrap',
				'position'   : 'relative',

				/*'-webkit-transition': '.5s all ease',
				   '-moz-transition': '.5s all ease',
				    '-ms-transition': '.5s all ease',
				     '-o-transition': '.5s all ease',
				        'transition': '.5s all ease'*/
			});

			$list.contents().filter(function(){
				return this.nodeType == 3;
			}).remove();

			$items.css({
				'display'       : 'inline-block',
				'vertical-align': 'top',
				'white-space'   : 'normal',
				'width'         : frame_width + '%'
			});

			/* Если элементов недостаточно, ничего не делаем */
			if(items_size <= visible && configuration.abort_on_error){
				$buttons.hide();
				return false;
			}

			/* Кнопки */
			if(configuration.buttons){
				$btn_prev = $('<button></button>').addClass(prefix + 'prev').text('prev');
				$btn_next = $('<button></button>').addClass(prefix + 'next').text('next');

				$buttons = $btn_prev.add($btn_next);
				$carousel.append($buttons);


			};

			/* Добавлять ли css кнопкам */
			if(configuration.buttons_style){
				$buttons.css({
					'position': 'absolute',
					'top'     : '50%'
				});

				$btn_prev.css({
					'left':  (-1) * $btn_prev.outerWidth()
				});

				$btn_next.css({
					'right': (-1) * $btn_next.outerWidth()
				});
			}

			if(configuration.pagination){
				$pagination = $('<div></div>').addClass(prefix + 'pagination');

				var $ul = $('<ul></ul>').appendTo($pagination);

				$.map(Array(pages), function(item, i){
					var $link = $('<a href="#'+(i + 1)+'">'+(i + 1)+'</a>');
					var $page = $('<li></li>').append($link).appendTo($ul);

					$link.click(function(){
						$carousel.trigger('spin', (i * configuration.scroll));
						return false;
					});
				});

				$pagination_items = $ul.children();

				if(configuration.pagination_style){

					$ul.css({
						'text-align': 'center'
					});

					$pagination_items.css({
						'display': 'inline-block'
					});
				}

				$carousel.append($pagination);
			}

			$buttons.bind('disable', function(){
				$(this).addClass(prefix + 'disable').attr('disabled', true);
			});

			$buttons.bind('enable', function(){
				$(this).removeClass(prefix + 'disable').attr('disabled', false)
			});

			if(configuration.keybind){
				$(window).keydown(function(e){
					switch(e.keyCode){
						case 37:
							$btn_prev.addClass('active');
							$carousel.trigger('spin', 'prev');
							break;
						case 39:
							$btn_next.addClass('active');
							$carousel.trigger('spin', 'next');
							break;
					}
				});

				$(window).keyup(function(e){
					switch(e.keyCode){
						case 37:
							$btn_prev.removeClass('active');
							break;
						case 39:
							$btn_next.removeClass('active');
							break;
					}
				});
			}

			/*$carousel.bind('carousel.resize', function(){
				$list.width($carousel.width());

				$wrap.width(function(){
					var width = 0;
					$visibles.each(function(){
						width += $(this).width();
					});
					return width;
				});

			}).trigger('carousel.resize');*/


			switch(configuration.wrap){

				/* Карусель обычная */
				case 'normal':
					var spin = function(to){
						
						to = Math.min(Math.max(0, to), max_current);

						current = to;

						/* Отключение/включение кнопок */
						if(configuration.disable_buttons){
							current == 0 ? $btn_prev.trigger('disable') : $btn_prev.trigger('enable');
							current == items_size - visible ? $btn_next.trigger('disable') : $btn_next.trigger('enable');
						}

						left = (-1) * to * frame_width;

						return true;
					}

					break;

				/* Карусель туда-сюда */
				case 'both':
					var spin = function(to){
						if(to < 0){
							to = max_current;
						}

						if(to > max_current){
							to = 0;
						}

						left = (-1) * to * frame_width;
						current = to;

						return true;
					}

					break;

				/* Карусель цикличиская */
				case 'circular':

					var spin = function(to){
						to %= items_size;

						left    = (-1) * (to) * frame_width;
						current = to;

						if(to < 0 || to > max_current){

							if(to < 0){

								var $citem = $items.slice((-1) * configuration.scroll);
								/*var $citem_clone = $citem.clone().insertAfter($citem);*/
								$citem.prependTo($list);

								$list.css({
									left: (-1) * left + '%'
								});

								left        = 0;
								current     = 0;
							}

							else{
								var offset_left  = frame_width * configuration.scroll;

								var $citem       = $items.slice(0, configuration.scroll);
								/*var $citem_clone = $citem.clone().insertBefore($citem);*/
									$citem.appendTo($list);

								$list.css({
									left: max_left + offset_left + '%'
								});

								left        = max_left;
								current     = max_current;

							}

							setTimeout(function(){
								/*$citem_clone.remove();*/
								$items = $list.children('li');
							}, configuration.duration)

						}

						return true;
					}
					
					break;
			}

			/* Крутилка */
			$carousel.bind('spin', function(e, to, noanim){

				if($list.is(':animated')){
					return false;
				}

				var method = noanim ? 'css' : 'animate';

				if(typeof to == 'string'){
					if(to == 'prev') to = current - configuration.scroll;
					if(to == 'next') to = current + configuration.scroll;
				}

				/*$visibles = $items.slice(configuration.start, configuration.start + configuration.visible).addClass('visible');*/

				if(spin(to)){
					configuration.before(current, $items.eq(current));
				}

				if(configuration.pagination){
					page  = Math.ceil(current / configuration.scroll);

					$pagination_items.eq(page)
					.addClass('active').siblings()
					.removeClass('active');
				}

				$list[method]({
					left    : left + '%'
				}, {
					duration: configuration.duration,
					easing  : configuration.easing
				});
			});

			$carousel.bind('destroy', function(){
				// TODO
			});

			$carousel.trigger('spin', [configuration.start, true]);

			$carousel.bind('prev', function(){
				$carousel.trigger('spin', 'prev');
			});

			$carousel.bind('next', function(){
				$carousel.trigger('spin', 'next');
			});

			$btn_prev.click(function(){
				$carousel.trigger('spin', 'prev');
			});

			$btn_next.click(function(){
				$carousel.trigger('spin', 'next');
			});

			$(window).resize(function(){
				$carousel.trigger('carousel.resize');
			});
		};

		return this.each(make);
	};
})(jQuery);