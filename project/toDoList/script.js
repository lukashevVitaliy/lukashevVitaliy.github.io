const toDoItems = document.querySelector('.to-do-items'),
	input = document.querySelector('#input'),
	trachIcon = document.querySelector('#trash');

input.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		addItem();
	}
});

function addItem() {
	const divParent = document.createElement('div');
	const divChild = document.createElement('div');
	const checkIcon = document.createElement('i');
	const trashIcon = document.createElement('i');

	divParent.className = 'item';
	divParent.innerHTML = `<div>${input.value}</div>`;

	checkIcon.className = 'far fa-check-square';
	checkIcon.style.color = 'lighgray';
	checkIcon.addEventListener('click', () => {
		checkIcon.style.color = 'limegreen';
	})

	divChild.appendChild(checkIcon);

	trashIcon.className = 'fas fa-trash';
	trashIcon.style.color = 'darckgrey';
	trashIcon.addEventListener('click', () => {
		divParent.remove();
	})

	divChild.appendChild(trashIcon);

	divParent.appendChild(divChild);

	toDoItems.appendChild(divParent);

	input.value = '';
}

