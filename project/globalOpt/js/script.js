// menu hamburger

const hamburger = document.querySelector('.hamburger'),
		menu = document.querySelector('.menu'),
		menuClose = document.querySelector('.menu__close'),
		overlay = document.querySelector('.menu__overlay');

const openMenu = () => {
	menu.classList.add('active');
	document.body.style.overflow = 'hidden';
};

hamburger.addEventListener('click', openMenu);

const closeMenu = () => {
	menu.classList.remove('active');
	document.body.style.overflow = '';
};

menuClose.addEventListener('click', closeMenu);

menu.addEventListener('click', (e) => {
	if (e.target === overlay) {
		closeMenu();
	}
});

document.addEventListener('keydown', (e) => {
	if (e.code === 'Escape' && menu.classList.contains('active')) {
		closeMenu();
	}
});

// slider

let slider = tns({
	container: '.slider__inner',
	center: true,
	items: 1,
	slideBy: 'page',
	gutter: 50,
	controls: false,
	controlsPosition: 'bottom',
	speed: 1200,
	autoplay: true,
	autoplayButtonOutput: false,
});

document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');
});

// Smoth scroll and padeup

$(window).scroll(function () {
	if ($(this).scrollTop() > 1100) {
		$('.pageup').fadeIn();
	} else {
		$('.pageup').fadeOut();
	}
});

// для плавности

$("a[href^='#up']").click(function () {
	const _href = $(this).attr("href");
	$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
	return false;
});

// maskedinput
$.fn.setCursorPosition = function (pos) {
	if ($(this).get(0).setSelectionRange) {
		$(this).get(0).setSelectionRange(pos, pos);
	} else if ($(this).get(0).createTextRange) {
		var range = $(this).get(0).createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
};
$('input[name=phone]').click(function(){
	$(this).setCursorPosition(3);
}).mask("+7(999) 999-99-99");
$('input[name=phone]').mask("+7(999) 999-99-99", { autoclear: true });

// validation form

function valideForms(form) {
	$(form).validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},

			email: {
				required: true,
				email: true
			},

			phone: {
				required: true
			},
			text: {
				required: true,
				maxlength: 1000
			},
			agree: {
				required: true,
				maxlength: 5
			}
		},
		messages: {
			name: {
				required: "Заполните поле!!!",
				minlength: jQuery.validator.format("Введите больше {0} символов!")
			},

			email: {
				required: "Заполните поле!!!",
				email: "Неправильный адрес почты!!!"
			},

			phone: {
				required: "Заполните поле!!!",
			},
			text: {
				required: "Заполните поле!!!",
				maxlength: jQuery.validator.format("Введите меньше {0} символов!")
			},
			agree: {
				required: "Необходимо согласиться с Политикой конфиденциальности!!!",
			},

		}
	});
}

valideForms('#consultation');
valideForms('#consultation-modal form');
valideForms('#questions');

// posts form data to email

$('form').submit(function (e) {
	e.preventDefault();

	if (!$(this).valid()) {
		return;
	}

	$.ajax({
		type: 'POST',
		url: 'mailer/smart.php',
		data: $(this).serialize()
	}).done(function () {
		$(this).find('input').val('');
		$('#consultation-modal').fadeOut();
		$('.overlay, #thanks').fadeIn('slow');
		$('form').trigger('reset');
	});
	return false;
});

// WOW animated

new WOW().init();

// Modal

$('[data-modal="consultation-modal"]').on('click', function () {
	$('.overlay, #consultation-modal').fadeIn('slow');
});
$('.modal__close').on('click', function () {
	$('.overlay, #consultation-modal, #thahks').fadeOut('slow');
});