const form = document.querySelector("form");
const input = document.getElementById("input");
const addBtn = document.querySelector(".add-btn");
const taskUl = document.querySelector(".task-ul");
const tasks = document.querySelector(".tasks");
const clear = document.querySelector(".clearall-btn");

form.addEventListener("submit", (e)=> {
    e.preventDefault();
})

//? ----- when user click add button >> add a new tasks -----
addBtn.addEventListener("click", ()=> {

    //* ---- create Li -------

    let Li = document.createElement("li");
    taskUl.appendChild(Li);
    Li.innerText = input.value.trim();
    Li.classList.add("task-li")
    input.value = "";

    //* ----- create Div ------

    let div = document.createElement("div");
    div.classList.add("task-btn");
    Li.appendChild(div);

    //* ------ create complete button & delete button -----

    let completeBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fas fa-check-circle"></i>'
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    completeBtn.classList.add("complete-btn");
    deleteBtn.classList.add("delete-btn");
    div.appendChild(completeBtn);
    div.appendChild(deleteBtn);

    //* create span

    let completeSpan = document.createElement("span");
    let deleteSpan = document.createElement("span");
    completeSpan.classList.add("complete-hover");
    deleteSpan.classList.add("remove-hover");
    completeSpan.innerText = "complete";
    deleteSpan.innerText = "remove";
    completeBtn.appendChild(completeSpan);
    deleteBtn.appendChild(deleteSpan);

    //? ------ when user click Complete button -----
    completeBtn.addEventListener('click' , (e)=> {
        console.log(e.target)
        if(completeBtn.classList.contains("complete-btn")) {
            Li.classList.toggle("completed");
            
        }
    })

    //? ------ when user click Delete button ------
    deleteBtn.addEventListener("click", (e)=> {
        console.log(e.target);
        if(deleteBtn.classList.contains("delete-btn")) {
            Li.remove()
        }
    })

    //? -----when user click Clear All button --------
    clear.addEventListener("click", ()=> {
    Li.remove();
    });
});
