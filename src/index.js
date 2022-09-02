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
    main = document.getElementById("main")
 

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

        const cross = document.createElement("p")
        cross.innerText = "X"

        cross.onclick = () => {
            projects.splice(projects.indexOf(project), 1)
            displayProjects()
        }

        projectElement.appendChild(cross)
        projectElement.classList.add("project")

        projectElement.onclick = () => {
            displayTodos(project)
            activeProject = project
        }

        projectsList.appendChild(projectElement)
    })
}

const addProject = (project) => {
    projects.push(project)
    displayProjects()
}

const displayTodos = project => {
    main.childNodes.forEach(child => {

        if (child === todoList) {
            todoList.innerHTML = ""
        } else if (child !== addTodoForm) {
            main.removeChild(child)
        } 
    })

    const projectTitle = document.createElement("h1")
    projectTitle.innerText = project._name

    main.appendChild(projectTitle)

    project.todos.forEach(todo => {
        const todoElement = document.createElement("div")
        todoElement.classList.add("todo")

        const todoTitle = document.createElement("p")
        todoTitle.innerText = todo.title

        todoElement.appendChild(todoTitle)


        todoList.appendChild(todoElement)

    })
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

    console.log("Form opened")
}

addTodoForm.onsubmit = e => {
    e.preventDefault()

    addTodoInput.classList.add("hidden")
    addTodoDesc.classList.add("hidden")
    addTodoDue.classList.add("hidden")
    addTodo.setAttribute("type", "reset")

    const { todoName, todoDesc, todoDue } = addTodoForm.elements

    activeProject.addTodo(todoName.value, todoDesc.value, todoDue.value)

    displayTodos(activeProject)
}