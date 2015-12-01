$(document).ready(function() {

	// записываем значение цены по умолчанию (без опций)
	var PRICE_TOTAL_DEFAULT = +$(".price_total").html();

	// заказать звонок в шапке
	$(".callback-btn").on("click", function() {
		$("#callback-popup").slideToggle();
	});

	// Выбор типа съемки (hover)
	$(".item").on("mouseover", function() {
		var label = $(this).find(".label");
		if ( label.hasClass("active") ) {
			return false;
		} else {
			label.stop();
			label.animate({
				height: "100%",
				paddingTop: "95px"
			}, 300 );
		}
	});
	$(".item").on("mouseout", function() {
		var label = $(this).find(".label");
		if ( label.hasClass("active") ) {
			return false;
		} else {
			label.stop();
			label.animate({
				height: "50px",
				paddingTop: "13px"
			}, 300, function(){
						label.removeAttr("style");
					} );
		}
	});

	// Выбор типа съемки (click)
	$(".item").on("click", function() {

		// показываем к каждому типу съемки уникальный (свой) блок с чекбоксами
		$(".option").hide();
		var n = $("#order").find(".item").length;
		for (var i=1; i<=n; i++) {
			if ( $(this).hasClass("item"+i) ) {
				$(".option_item"+i).show();
			}
		}

		// анимация клика
		if ( !$(this).find(".label").hasClass("active") ) { // Если this НЕ active
			$(".item .label.active").animate({
					height: "50px",
					paddingTop: "13px"
				}, 300, function(){
							$(".item .label").removeAttr("style");
						} );
			$(".item .label").removeClass("active");
			$(this).find(".label").addClass("active"); //подсветка типа съемки

			$(".item").children("input.rb").prop("checked", false); //обуляем все радиобаттоны
			$(this).children("input.rb").prop("checked", true); //выбераем радиобаттон, выбранного типа съемки

			$("#order input.cb").prop("checked", false); //обуляем все чекбоксы тоже
			$("#order .checkbox").removeClass("checked"); //обуляем все чекбоксы тоже

			$("#order .checkbox.default_checked").addClass("checked"); //Выбераем чекбокс -Свои пожелания- по умолчанию
			$("#order .checkbox.default_checked input.cb").prop("checked", true);

			$(".price_total").html(PRICE_TOTAL_DEFAULT); //сбрасываем значение суммы на начальную
			
			var image = $(this).css("background-image"); //в блоке result меняем фоновую картинку на фоновую картинку this
			$(".result").css("background-image", image);
		}

	});

	// клик по чекбоксу (выбор опции)
	$(".checkbox").on("click", function() {
		var isCheked = $(this).find("input.cb").prop("checked");
		var summ = +$(".price_total").html();
		if (isCheked) {
			$(this).find("input.cb").prop("checked", false);
			$(this).removeClass("checked");
			summ -= +$(this).find("input.cb").val();
		} else {
			$(this).find("input.cb").prop("checked", true);
			$(this).addClass("checked");
			summ += +$(this).find("input.cb").val();
		}
		$(".price_total").html(summ);
	});

	// подсказка tooltip
	$(".btn-help").on("mouseover", function() {
		$(this).parent().find(".help-info").toggle();
	});
	$(".btn-help").on("mouseout", function() {
		$(this).parent().find(".help-info").toggle();
	});

	// ЗАКАЗАТЬ
	$(".btn-order").on("click", function() {
		var height = $(".order-finish").outerHeight(true);
		var position = $("body").scrollTop();
		if ( $(".order-finish").css("display") == "none" ) {
			$("body").animate({ scrollTop: position + height }, 400);
		} else {
			$("body").animate({ scrollTop: position - height }, 400);
		}
		$(".order-finish").stop();
		$(".order-finish").slideToggle();
	});

	// Placeholder: https://github.com/mathiasbynens/jquery-placeholder
	$('input, textarea').placeholder();

	//Parallax (Stellar)
	//Документация: http://markdalgleish.com/projects/stellar.js/docs/
	$.stellar({
		horizontalScrolling: false,
		verticalOffset: 0
	});

	//Попап менеджер FancyBox
	//Документация: http://fancyapps.com/fancybox/
	// $(".fancybox").fancybox();

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	//см. переменную topMenuHeight в navigation.js для отступа к блоку
	$(".top_mnu").navigation();

	//Добавляет классы дочерним блокам .block для анимации
	//Документация: http://imakewebthings.com/jquery-waypoints/
	// $(".block").waypoint(function(direction) {
	// 	if (direction === "down") {
	// 		$(".class").addClass("active");
	// 	} else if (direction === "up") {
	// 		$(".class").removeClass("deactive");
	// 	};
	// }, {offset: 100});

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	$(".btn-sure").click(function() {
		$.scrollTo($("#sure"), 1000, {
			offset: -80
		});
	});

	//Каруселька
	//Документация: http://www.owlcarousel.owlgraphic.com/docs/started-welcome.html
	$(".owl-carousel").owlCarousel({
		items: 1,
		nav: true,
		navText: ['<i class="prev"></i>','<i class="next"></i>']
	});

	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	// $("#top").click(function () {
	// 	$("body, html").animate({
	// 		scrollTop: 0
	// 	}, 800);
	// 	return false;
	// });
	
	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("form#callback-header").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail-callback-header.php",
			data: $("form").serialize(),
			success: function(data) {
				//$('#order_status').html(data);
				//$('#order_status').html('Спасибо, Ваша заявка отправлена!');
			},
			error:  function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$("#callback-popup").slideUp();
			}, 1000);
		});
		return false;
	});
	$("form#order-calc").submit(function() {
		$("#summ-order").val( $("span.price_total").html() ); //записываем значение суммы заказа в скрытый интуп перед отправкой
		$.ajax({
			type: "POST",
			url: "mail-order.php",
			data: $("form").serialize(),
			success: function(data) {
				//$('#order_status').html(data);
				//$('#order_status').html('Спасибо, Ваша заявка отправлена!');
			},
			error:  function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});
	$("form#callback-footer").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail-callback-footer.php",
			data: $("form").serialize(),
			success: function(data) {
				//$('#order_status').html(data);
				//$('#order_status').html('Спасибо, Ваша заявка отправлена!');
			},
			error:  function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});

});