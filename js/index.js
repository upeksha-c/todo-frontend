//const BACKEND_ROOT_URL = 'http://localhost:3001'
const BACKEND_ROOT_URL = 'https://server-8aak.onrender.com'

import { Todos } from "./class/Todos.js";
const todos = new Todos(BACKEND_ROOT_URL)

//Get reference to the div element
let divList = document.querySelector('body');
//get reference to input element
let input = document.querySelector('input');
//create new un ordered list element
let list = document.createElement('ul');
list.className = "list-group";
//append un ordered list to div element
divList.appendChild(list);

input.disabled = true;

const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class','list-group-item')
    li.setAttribute('data-key',task.getId().toString())
    //li.innerHTML = task.getText()
    renderSpan(li,task.getText())
    renderLink(li,task.getId())
    list.append(li)
}

const renderSpan = (li,text) => {
    const span = li.appendChild(document.createElement('span'))
    span.innerHTML = text
}

const renderLink = (li,id) => {
    const a = li.appendChild(document.createElement('a'))
    a.innerHTML = '<i class="bi bi-trash"></i>'
    a.setAttribute('style','float: right')
    a.addEventListener('click',(event) => {
        todos.removeTask(id).then((removed_id) => {
            const li_to_remove = document.querySelector(`[data-key='${removed_id}']`)
            if(li_to_remove){
                list.removeChild(li_to_remove)
            }
        }).catch((error) => {
            alert(error)
        })
    })
}

const getTasks = () => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task)
        })
        input.disabled = false;
    }).catch((error) => {
        alert(error)
    })
}

//define function for saving task
const saveTask = async(task) => {
    try{
        const json = JSON.stringify({description: task})
        const response = await fetch(BACKEND_ROOT_URL + '/new',{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
        return response.json()
    } catch (error) {
        alert("Error saving task " + error.message)
    }
}

//add event listener to input elemnt
input.addEventListener("keypress",(event) => {
    
    //check the pressed key id "enter" key or not
    if(event.key === "Enter"){
        //prevent reloding the page
        event.preventDefault();
        //get the text content of input field to a variable
        const task = input.value.trim();
        //check wether the provided input is empty or not
        if(task !== ''){
            todos.addTask(task).then((task) => {
                renderTask(task)
                input.value = ''
                input.focus()
            })
            
        }        
    }
});

getTasks()