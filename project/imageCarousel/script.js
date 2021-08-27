let index = 0;

function showImage(i) {
	index += i;

	const images = document.querySelectorAll('.image'),
			dots = document.querySelectorAll('.dot');

	images.forEach(item => {
		item.style.display = 'none';
	});
	dots.forEach(item => {
		item.className = item.className.replace(' active', '');
	});

	if (index > images.length - 1) {
		index = 0;
	}
	if (index < 0) {
		index = images.length - 1;
	}

	images[index].style.display = 'block';

	dots[index].className += ' active';
}

showImage(index);
