const BACKEND_ROOT_URL = 'http://localhost:3001'

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
    li.innerHTML = task
    list.append(li)
}

const getTasks = async() => {
    try {
        const response = await fetch(BACKEND_ROOT_URL)
        const json = await response.json()
        json.forEach(task => {
            renderTask(task.description)
        })
        input.disabled = false
    } catch (error){
        alert("Error retrieving tasks" + error.message)
    }
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
        if(task != ''){
            saveTask(task).then((json) => {
                renderTask(task)
                input.value = ''
            })
            
        }        
    }
});

getTasks()