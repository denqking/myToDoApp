//переменные
const form = document.querySelector('.add');
const input = form.querySelector('.input');
const list = document.querySelector('.list');
const reset = document.querySelector('.reset');
let toDoList ;
let id ;

//переменные классы
const check = 'fa-check-square';
const unckeck = 'fa-square';
const lineThrough = 'line-through'

//Добавляем дату
const date = document.querySelector('.date')
const today = new Date();
const options = {
	weekday: 'short',
	month: 'long',
	day: 'numeric'
}
date.innerHTML = today.toLocaleDateString('ru', options)


//localStorage
let data = localStorage.getItem('TODO');
if (data) {
	toDoList = JSON.parse(data);
	id = toDoList.length;
	loadList(toDoList)
} else {
	toDoList = [];
	id = 0;
}
function loadList(array) {
	array.forEach((item) => {
		addToDoList(item.name, item.id, item.done, item.trash)
	});
}

//reset localSorage
reset.addEventListener('click', e => {
	localStorage.clear();
	location.reload();
})

function addToDoList(newToDo,id,done,trash) {
	if(trash){return}
	const DONE = done ? check : unckeck;
	const LINE = done ? lineThrough : '';
	const position = 'beforeend'
	const text = `<li class="item">
						<i class="far ${DONE}" job='complete' id='${id}'></i>
						<p class="text ${LINE} ">${newToDo}</p>
						<i class="fas fa-trash" job='delete' id='${id}'></i>
					</li>`
	if (newToDo == '') {
		console.log('пусто')
	} else {list.insertAdjacentHTML(position, text)}
	
}


form.addEventListener('submit',(e)=> {
	e.preventDefault();
	let newToDo = input.value;
	if (newToDo) {
		addToDoList(newToDo, id, false, false)
		toDoList.push({
			name: newToDo,
			id: id,
			done: false,
			trash: false
		});
		localStorage.setItem('TODO', JSON.stringify(toDoList));
		id++
	}
	console.log(toDoList);
	
	e.target.reset()
	
})

function completeToDo(element) {
	element.classList.toggle(check);
	element.classList.toggle(unckeck);
	element.parentNode.querySelector('.text').classList.toggle(lineThrough)
	toDoList[element.id].done = toDoList[element.id].done ? true : false;
	
}

function removeToDo(element) {
	element.parentNode.parentNode.removeChild(element.parentNode)
	toDoList[element.id].trash = true;
}

list.addEventListener('click', (event) => {
	const element = event.target
	const elementJob = element.attributes.job.value
	if (elementJob == 'complete') {
		completeToDo(element)
	} else if (elementJob == 'delete') {
		removeToDo(element)
	};
	localStorage.setItem('TODO', JSON.stringify(toDoList));
})

//localStorage
//localStorage.setItem('TODO', JSON.stringify(toDoList));

