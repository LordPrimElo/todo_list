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

        projectsList.appendChild(projectElement)
    })
}

const addProject = (project) => {
    projects.push(project)
    displayProjects()
}

form.onreset = () => {
    addForm.classList.remove("hidden")
    addBtn.setAttribute("type", "submit")
}

form.onsubmit = e => {
    e.preventDefault()

    addForm.classList.add("hidden")
    addBtn.setAttribute("type", "reset")

    addProject(Project(form.elements["projectName"].value))

}