'user strict';

window.addEventListener('DOMContentLoaded', () => {

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

	// tabs

	const tabParent = document.querySelector('.tabheader__items'),
		tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent');

	const hideTabsContent = () => {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		tabs.forEach(item => {
			item.classList.remove('tabheader__item-active');
		});
	};

	const showTabsContent = (i = 0) => {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item-active');
	};

	hideTabsContent();
	showTabsContent();

	tabParent.addEventListener('click', (e) => {
		const target = e.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (item === target) {
					hideTabsContent();
					showTabsContent(i);
				}
			});
		}
	});

	// modal windows
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalCloseBtn = modal.querySelector('.modal__close');


	const openModal = () => {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';

	};

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	const closeModal = () => {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
		clearInterval(modalTimerID);
	};

	modalCloseBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		if (modal === e.target) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerID = setTimeout(openModal, 50000);

	const showModalByScroll = () => {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	};

	window.addEventListener('scroll', showModalByScroll);

	// scroll
	$(window).scroll(function () {
		if ($(this).scrollTop() > 700) {
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
				servise: {
					required: true
				},
				description: {
					required: true,
					maxlength: 1000
				},
				agree: {
					required: true
				}
			},
			messages: {
				name: {
					required: "Enter the data !",
					minlength: jQuery.validator.format("Please enter more than {0} characters !")
				},
				email: {
					required: "Enter the data !",
					email: "Invalid email address !"
				},
				phone: {
					required: "Enter the data !",
				},
				servise: {
					required: "Enter the data !"
				},
				description: {
					required: "Enter the data !",
					maxlength: jQuery.validator.format("Please enter less {0} characters !")
				},
				agree: {
					required: "You must read and agree !",
				},
			}
		});
	}
	valideForms('#appointment');
	valideForms('#feedback');

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
	$('input[name=phone]').click(function () {
		$(this).setCursorPosition(3);
	}).mask("+7(999) 999-99-99");
	$('input[name=phone]').mask("+7(999) 999-99-99", { autoclear: true });


});
