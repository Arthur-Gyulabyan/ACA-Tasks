let taskArr = [
    {
        task: 'Task 1',
        completed: false,
        id: 1,
    },

    {
        task: 'Task 2',
        completed: true,
        id: 2,
    },

    {
        task: 'Task 3',
        completed: false,
        id: 3,
    },
];

const input = document.getElementById('task-input');
const ul = document.querySelector('ul');
const addButton = document.querySelector('button');
const itemCount = document.querySelector('.item-count');

const liArr = [];
const selectElements = [];
const removeButtons = [];

const filterAll = document.getElementById('filter-button-all');
const filterActive = document.getElementById('filter-button-active');
const filterCompleted = document.getElementById('filter-button-completed');

function drawElement(elem) {
    const li = document.createElement('li');
    const icon1 = document.createElement('i');
    const icon2 = document.createElement('i');
    const input = document.createElement('input');

    // input.type = 'text';
    // input.readOnly = true;
    // input.value = elem.task;
    [input.type, input.readOnly, input.value] = ['text', true, elem.task];
    input.classList.add('fields', 'task-field');
    if (elem.completed) {
        icon1.setAttribute('class', 'fal fa-check-circle');
        input.style.textDecoration = 'line-through';
    } else {
        icon1.setAttribute('class', 'fal fa-circle');
    }
    icon2.setAttribute('class', 'fal fa-times');
    li.id = elem.id;
    li.append(...[icon1, input, icon2]);

    itemCount.innerText = `${taskArr.length} items left`;

    selectElements.push(li.firstChild);
    selectElements[selectElements.length - 1].addEventListener('click', (e) => {
        changeIcon(e);
    });

    removeButtons.push(li.lastChild);
    removeButtons[removeButtons.length - 1].addEventListener('click', (e) => {
        removeTask(e);
    });

    input.addEventListener('click', () => {
        let description = input.value;

        input.readOnly = false;

        if (input.value === '') {
            input.innerText = description;
        }
    });

    liArr.push(li);

    return li;
}

function init() {
    taskArr.forEach(el => {
        ul.append(drawElement(el));
    });
}

init();


function addTask() {
    if (input.value !== '') {
        let newTask = {
            task: `${input.value}`,
            completed: false,
            id: taskArr.length + 1,
        };
        taskArr.push(newTask);

    }
    itemCount.innerText = `${taskArr.length} items left`;
}

function reorderIDs(handlerID) {
    liArr.splice(handlerID - 1, 1);

    liArr.forEach((el, index) => el.id = taskArr[index].id);
}

function removeTask(event) {
    taskArr.splice(taskArr[event.target.parentNode.id], 1);
    taskArr.forEach(el => el.id--);

    reorderIDs(event.target.parentNode.id);

    event.target.parentNode.remove();

    itemCount.innerText = `${taskArr.length} items left`;
}


function changeIcon(event) {
    const parent = event.target.parentNode;

    if (event.target.className === 'fal fa-circle') {
        event.target.setAttribute('class', 'fal fa-check-circle');
        parent.childNodes[1].style.textDecoration = 'line-through';
        taskArr[parent.id - 1].completed = true;
    } else if (event.target.className === 'fal fa-check-circle') {
        event.target.setAttribute('class', 'fal fa-circle');
        parent.childNodes[1].style.textDecoration = 'none';
        taskArr[parent.id - 1].completed = false;
    }
}


// Listeners
// Add element on click.
addButton.addEventListener('click', () => {
    if (input.value !== '') {
        addTask();
        ul.append(drawElement(taskArr[taskArr.length - 1]));
        input.value = '';

    } else {
        alert('Please, add description of task');
    }
});

// Add element on 'ENTER' keypress.
input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        if (input.value !== '') {
            addTask();
            ul.append(drawElement(taskArr[taskArr.length - 1]));
            input.value = '';
        } else {
            alert('Please, add description of task');
        }
    }
});

filterAll.addEventListener('click', (e) => {
    filterAll.classList.add('selected');
    filterActive.classList.remove('selected');
    filterCompleted.classList.remove('selected');

    liArr.forEach(el => el.style.display = 'flex');
});

filterActive.addEventListener('click', () => {
    filterActive.classList.add('selected');
    filterAll.classList.remove('selected');
    filterCompleted.classList.remove('selected');

    liArr.forEach(el => {
        if (taskArr[el.id - 1].completed) {
            el.style.display = 'none';
        } else {
            el.style.display = 'flex';
        }
    });
});

filterCompleted.addEventListener('click', (e) => {
    filterCompleted.classList.add('selected');
    filterAll.classList.remove('selected');
    filterActive.classList.remove('selected');

    liArr.forEach(el => {
        if (taskArr[el.id - 1].completed === false) {
            el.style.display = 'none';
        } else {
            el.style.display = 'flex';
        }
    });
});




