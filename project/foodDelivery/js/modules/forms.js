function forms() {

	//* делаем доп.модальное окно

//! JSON Server

	//* Fetch - JSON-Server - POST данных

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся.',
		failure: 'Что-то пошло не так...'
	};
	// подвязываем взаимодействие отправка к формам
	forms.forEach(item => {
		bindPostData(item);
	});

	//todod. функция настройки запроса POST на сервер JSON 
	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});
		// обрабатываем как json формат
		return await res.json();
	};

	// функция по ПРИИВЯЗКЕ POST отправка данных
	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
	display: block;
	margin: 0 auto;
`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			// 2-вариант перебира данных formData и преобразуем formData (оптимальный)
			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		// скрываем предыдущий контент
		prevModalDialog.classList.add('hide');
		openModal();
		// создаем блок
		const thaksModal = document.createElement('div');
		thaksModal.classList.add('modal__dialog');
		thaksModal.innerHTML = `
	<div class="modal__content">
		<div data-close class="modal__close">&times;</div>
		<div class="modal__title">${message}</div>
	</div>
	`;
		document.querySelector('.modal').append(thaksModal);
		// повторное использование формы
		setTimeout(() => {
			thaksModal.remove();
			// показываем контент
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

}

module.exports = forms;