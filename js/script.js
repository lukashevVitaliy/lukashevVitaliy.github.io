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

// ratings-counter

const counters = document.querySelectorAll('.scills__ratings-counter'),
	lines = document.querySelectorAll('.scills__ratings-line span');

counters.forEach((item, i) => {
	lines[i].style.width = item.innerHTML;
});

// validation form

function valideForms(form) {
	$(form).validate({
		rules: {
			name: {
				required: true,
				minlength: 2,
				maxlength:25
			},
			email: {
				required: true,
				email: true
			},
			check: {
				required: true
			},
			message: {
				required: true,
				maxlength:1000
			}
		},
		messages: {
			name: {
				required: "Введите данные",
				minlength: jQuery.validator.format("Введите {0} символа!"),
				maxlength: jQuery.validator.format("Введите {0} символа!")
			},
			email: {
				required: "Введите данные",
				email: "Неправильный адрес почты!"
			},
			message: {
				required: "Введите данные",
				maxlength: jQuery.validator.format("Введите {0} символа!")
			},
			check: {
				required: "Необходимо подтвердить",
			}
		}
	});
}

valideForms('#contacts-form');

// post email

$('form').submit(function (e) {
	e.preventDefault();
	$.ajax({
		type: 'POST',
		url: 'mailer/smart.php',
		data: $(this).serialize()
	}).done(function () {
		$(this).find('input').val('');

		$('form').trigger('reset');
	});
	return false;
});

// scroll
$(window).scroll(function () {
	if ($(this).scrollTop() > 900) {
		$('.pageup').fadeIn();
	} else {
		$('.pageup').fadeOut();
	}
});

$("a[href^='#up']").click(function () {
	const _href = $(this).attr("href");
	$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
	return false;
});