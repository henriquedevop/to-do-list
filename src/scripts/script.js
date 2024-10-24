const inputTask = document.querySelector('#inputTask')
const addTaskBtn = document.querySelector('#addTaskBtn')
const elementsList = document.querySelector('#elementsList')

let arrayTasksList = JSON.parse(localStorage.getItem('@tasksList')) || []

renderTasks()

function deleteTask(index) {
    arrayTasksList.splice(index, 1)
    renderTasks()
    saveLocalStorage()
}

function renderTasks() {
    elementsList.innerHTML = ''

    arrayTasksList.forEach((task, index) => {
        const li = createTaskElement(task, index)
        elementsList.appendChild(li)
    });
}

function createTaskElement(task, index) {
    const li = document.createElement('li')
    li.textContent = task 
    li.classList.add('item-task-li')

    const btnDelete = createDeleteButton(index)
    li.appendChild(btnDelete)

    return li
}

function createDeleteButton(index) {
    const button = document.createElement('button')
    button.textContent = 'Excluir'
    button.classList.add('btn-delete')

    button.addEventListener('click', () => deleteTask(index))
    
    return button
}

function saveLocalStorage() {
    localStorage.setItem('@tasksList', JSON.stringify(arrayTasksList))
}

function isInputValid() {
    return inputTask.value.trim() !== ''
}

addTaskBtn.addEventListener('click', () => {
    if(!isInputValid()) {
        alert("Insira algo")
        return false
    } 

    const newTask = inputTask.value.trim()
    arrayTasksList.push(newTask)
    inputTask.value = ''
    renderTasks()
    saveLocalStorage()
})