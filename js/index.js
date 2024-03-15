//Get reference to the div element
let divList = document.querySelector('body');
//get reference to input element
let inputElement = document.querySelector('input');
//create new un ordered list element
let unOrderedList = document.createElement('ul');
unOrderedList.className = "list-group";
//append un ordered list to div element
divList.appendChild(unOrderedList);

//add event listener to input elemnt
inputElement.addEventListener("keypress",function(event){
    
    //check the pressed key id "enter" key or not
    if(event.key === "Enter"){
        //prevent reloding the page
        event.preventDefault();
        //get the text content of input field to a variable
        let text = inputElement.value.trim();
        //clear the content of input field
        inputElement.value = "";
        //check wether the provided input is empty or not
        if(text != ''){
            //call "createList" function and assign value to a variable
            let ulContent = createList(text);
            //append list to unordered list
            unOrderedList.appendChild(ulContent);
        }
        
    }
});

//create a function for list element
function createList(content){
    let list = document.createElement('li');
    list.setAttribute("class","list-group-item");
    //list.className = "list-group-item";
    list.innerText = content;
    return list;
}