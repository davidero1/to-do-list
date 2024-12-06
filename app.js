// Variables

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo"); // for the filter
const items = todoList.children;
const numOfItems = document.querySelector(".num-items");

// Add event listeners
todoButton.addEventListener("click", addTodo);

// add functionalities to the plus and trash container
todoList.addEventListener("click", plusTrash); // find the function in line 66

//  add event listeners for the filter
filterOption.addEventListener("click", filterTodo);

// Functions

// FUNCTION 1 - ADD TO DO
function addTodo(e) {
  e.preventDefault(); // prevents page refreshing and event form submitting

  // prevents an empty input from adding
  if (todoInput.value === "") return;

  // a container for the list
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; // so the typed text can show the as the true value
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // create button (check button)
  const completeButton = document.createElement("button"); // button
  completeButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fa-solid fa-rectangle-xmark"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // append the todoDiv to the todoList
  todoList.appendChild(todoDiv);

  todoInput.value = ""; // so after submitting the input clears

  numOfItems.innerText = `Hi, you have ${items.length} task(s)`;
}

// FUNCTION 2 - CHECK AND DELETE TASKS
//  add functionalities to the plus and trash container (see line 29 for eventListener)
function plusTrash(e) {
  const item = e.target;
  // delete todo logic
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement; // get hold of the parent container
    todo.classList.toggle("fall"); // this adds the style of the class
    // todo.remove(); // this removes the element entirely and clears the space it held but loses the css effect
    todo.addEventListener("transitionend", () => {
      todo.remove();
    }); // w this the css effect is maintained while its removing
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed"); // toggle goes from o to 1 and repeats so it the complete effect can be reverted to clear the line through and hover css effects
  }
}

// filter the tasks btwn all, done & undone
// first add a select dropdown in the html then come back here to give it its functionalities

// FUNCTION 3 - FILTER TO DO
// add filter functionalities to the dropdown
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (
      e.target.value // the values of the options are all, done and undone
    ) {
      case "all":
        todo.style.display = "flex";
        break;

      case "done":
        // pass a condition
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "undone":
        // pass a condition
        // does NOT ! contain completed
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
