// DOM Element Declarations
const projectsList = document.getElementById("projects-list"),
    addBtn = document.getElementById("add-project"),
    addInput = document.getElementById("add-form"),
    addForm = document.getElementById("add-form-main"),
    todoList = document.getElementById("todo-list"),
    addTodoForm = document.getElementById("add-todo-form"),
    addTodoInput = document.getElementById("add-todo-input-name"),
    addTodoDesc = document.getElementById("add-todo-input-desc"),
    addTodoDue = document.getElementById("add-todo-input-due"),
    addTodo = document.getElementById("add-todo"),
    main = document.getElementById("main"),
    projectTitle = document.getElementById("project-title")


// Constants
const projects = new Array()
let activeProject = new Object()


// Project Factory Function
const Todo = (title, description, dueDate) => {
    return { title, description, dueDate }
}

const Project = (name) => {
    const _name = name

    const todos = []

    const addTodo = (title, description, dueDate) => {
        todos.push(Todo(title, description, dueDate))
    }

    const removeTodo = (toDo) => {
        todos.splice(todos.indexOf(toDo), 1)
    }

    return { addTodo, removeTodo, todos, _name }
}

// Helper Functions
const displayProjects = () => {
    projectsList.innerHTML = ""  
    projects.forEach(project => {

        const projectElement = document.createElement("div")
        projectElement.innerHTML = `<p>${project._name}</p>`

        projectElement.classList.add("project")

        projectElement.querySelector("p").onclick = () => {
            todoList.innerHTML = ""
            projectTitle.innerText = ""

            displayTodos(project)
            activeProject = project
        }

        const cross = document.createElement("p")
        cross.innerText = "X"

        cross.onclick = () => {
            activeProject = new Object()

            projects.splice(projects.indexOf(project), 1)

            displayProjects()
            todoList.innerHTML = ""
            projectTitle.innerText = ""         
        }

        projectElement.appendChild(cross)
        projectsList.appendChild(projectElement)
    })
}

const addProject = (project) => {
    projects.push(project)
    displayProjects()
}

const displayTodos = project => {
    
    todoList.innerHTML = ""

    projectTitle.innerText = project._name

    project.todos.forEach(todo => {
        const todoElement = document.createElement("div")
        todoElement.classList.add("todo")

        const todoTitle = document.createElement("p")
        todoTitle.innerText = todo.title

        const todoDesc = document.createElement("p")
        todoDesc.innerText = todo.description

        const todoDate = document.createElement("p")
        todoDate.innerText = 
            `${makeAReadableDate(
                todo.dueDate.getDay(), 
                todo.dueDate.getDate(), 
                todo.dueDate.getMonth()
            )} ${todo.dueDate.getFullYear()}`

        const textDiv = document.createElement("div")

        textDiv.appendChild(todoTitle)
        textDiv.appendChild(todoDesc)

        const cross = document.createElement("p")
        cross.innerText = "X"

        cross.onclick = () => {

            project.removeTodo(todo)

            displayTodos(project)        
        }

        todoElement.appendChild(textDiv)
        todoElement.appendChild(todoDate)
        todoElement.appendChild(cross)

        todoList.appendChild(todoElement)

    })
}

const makeAReadableDate = (day, date, month)=> {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]

    return `${days[day]}, ${date} ${months[month]}`

}


// Add Projects
addForm.onreset = () => {
    addInput.classList.remove("hidden")
    addBtn.setAttribute("type", "submit")
}

addForm.onsubmit = e => {
    e.preventDefault()

    addInput.classList.add("hidden")
    addBtn.setAttribute("type", "reset")

    addProject(Project(addForm.elements["projectName"].value))

}



addTodoForm.onreset = () => {
    addTodoInput.classList.remove("hidden")
    addTodoDesc.classList.remove("hidden")
    addTodoDue.classList.remove("hidden")

    addTodo.setAttribute("type", "submit")
}

addTodoForm.onsubmit = e => {
    e.preventDefault()

    addTodoInput.classList.add("hidden")
    addTodoDesc.classList.add("hidden")
    addTodoDue.classList.add("hidden")
    addTodo.setAttribute("type", "reset")

    const { todoName, todoDesc, todoDue } = addTodoForm.elements

    activeProject.addTodo(todoName.value, todoDesc.value, todoDue.valueAsDate)

    displayTodos(activeProject)
}