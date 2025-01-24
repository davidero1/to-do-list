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

// add event listener to the entire documnt
document.addEventListener("DOMContentLoaded", getTodos); // the function is written in line 202

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

  // Add to local storage
  saveLocalTodos(todoInput.value); // argument invoked w function @ line 186

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

    removeLocalTodo(todo); // argument

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

// TASK 58
// local storage & session storage

// they're basically written the same way

// syntax:- localStorage.setItem("key", "value");
// syntax:- sessionStorage.setItem("key", "value");

// .setItem is used to set keys n values
// whatever is passed into the bracket is a string
// it can only accept strings
// the key is written first, then the value

// localStorage.setItem("todo", "write some code");

// "write some code" shows in the Application tab of the browser terminal
// local storage always persists until it is cleared

// sessionStorage.setItem("todoList", "Take a nap");
// session only lasts for that session, clears upon close

// .clear is used to clear the storage
// localStorage.clear();

// localStorage.setItem("user", "Peter");

// localStorage.clear("todo1", "todo2", "todo3"); // clear is used to clear the entire data

// localStorage.setItem("user", "David");
// localStorage.setItem("user", "Swim");
// localStorage.setItem("user", "Greg");
//  when the same key is used w multiple different values,
// the most recent value will overide the earlier values

// we can have multiple values with a single key using stringify

// retrieving data from the local storage using .getItem

// const todo = localStorage.getItem("todo");
// console.log(todo);

// how to pass an array into a localStorage


// const todoItems = ["write some code", "play basketball", "get milk"];
// console.log(todoItems); // change to [] and remove the todo1:-3

// localStorage.clear(); // to clear the storage

// localStorage.setItem("todo", todoItems);
// when an array is passed into a local storage it changes it to a string

// const retrieveItem = localStorage.getItem("todo");
// console.log(retrieveItem); // even if it is retrived, it still shows as a string


// the stringify and parse method is used to maintain the passed array

// the stringify turns it to a string and the .parse is sued to convert it to its original form as an array

// localStorage.setItem("todo", JSON.stringify(todoItems));
// it appears as a string now

// now lets retrieve w .parse
// const retrieveItem = JSON.parse(localStorage.getItem("todo"));
// console.log(retrieveItem, typeof retrieveItem);
// this returns it as an array ['object'] (check line :173 on the console tab)

// TASK 59 - Lesson 7



// Add todos to the local storage
saveLocalTodos(todoInput.value);

// function to save input into the local storage
// this function is invoked @ line 42
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos)); // this saves the todo to the local storage as an array using stringify
}

// retrieving the todos from local storage
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // loop
  todos.forEach((todo) => {
    // a container for the todos
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; // todo
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
  });
}

// local storage functions
// functionality to delete todo from the local storage entirely
function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText; // this helps us access the text the user inputs and stored it in the variable
  todos.splice(todos.indexOf(todoIndex), 1); // w splice we can remove any element in any position from an array
  localStorage.setItem("todos", JSON.stringify(todos));
}

// example of splice
// const numbers = [1,2,3,4,5,6,7,8,9];
// numbers.splice(1, 3); // the first value is the starting point, while the 2nd is the number of elements to be removed
// splice method alters the original array

// const numbers = ["code", "swim", "eat", "nap"];
// numbers.splice(0, 2); // result will show only nap coz it starts w 0(code) and 3 values are removed
// console.log(numbers);



// ctrl+shift+l to select all the same text within the code
// use it to change the local storage to session storage

// repeat
// read string, array methods: map, filter, reduce, sort, find, etc
