// DOM Element Declarations
const projectsList = document.getElementById("projects-list")
const addBtn = document.getElementById("add-todo")
const addForm = document.getElementById("add-form")
const form = document.getElementById("add-form-main")

// Constants
const projects = new Array

// Project Factory Function
const Project = (name) => {
    const _name = name

    const todos = []

    const addTodo = (toDo) => {
        todos.push(toDo)
    }

    const removeTodo = (toDo) => {
        todos.splice(todos.indexOf(toDo), 1)
    }

    return { addTodo, removeTodo, _name }
}

// Helper Functions

const displayProjects = () => {
    projects.forEach(project => {

        const projectElement = document.createElement("div")
        projectElement.innerText = project._name

        projectElement.classList.add("project")
        projectsList.appendChild(projectElement)
    })
}

const addProject = (project) => {
    projects.push(project)
    displayProjects()
}


addBtn.onclick = () => {
    if (addForm.classList.contains("hidden")) {
        addForm.classList.remove("hidden")

    } else {
        addForm.classList.add("hidden")

        console.log("fdhh")
    }
}