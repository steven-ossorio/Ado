const $l = require("./lib/main.js");

$l(() => {
  function deleteItem(e) {
    console.log(e);
    e.target.parentNode.remove();
  }

  function addItem() {
    let inputValue = $l("#todo-input").htmlElements[0].value;

    if (inputValue === "") {
      inputValue = "I will not allow this list to be empty";
    }

    function setRandomBGColor () {
      let letters = "123456789ABCDEF";
      let color = "#";

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 15)];
      }

      return `background-color: ${color}`;
    }

    const color = setRandomBGColor();

    const length = $l("li").htmlElements.length - 1;

    const listItem = $l("<li>");
    listItem.append(inputValue);
    listItem.attr("style", color);

    const button = $l("<button>");
    button.attr("id", `button-${length}`);
    button.append("x");

    listItem.append(button);
    const buttons = listItem.children();
    buttons.on('click', listItem.remove);

    $l("#ul-list").append(listItem);
    $l("#todo-input").htmlElements[0].value = "";
  }

  $l(".add-todo-button").on("click", addItem);
  $l(".delete-todo-button").on("click", deleteItem);
});


// document.addEventListener("DOMContentLoaded", () => {
//   // function addADoItem () {
//   //   let todoList = $("#todo-item").val();
//   //   console.log(todoList);
//   // }
//
  // document.querySelector(".add-todo-button").addEventListener("click", (e) => {
  //   let liLength = document.querySelectorAll("#ul-list")[0].children.length + 1;
  //   let todoList = $l("#todo-input").arr[0].value;
  //
  //   if (todoList === "") {
  //       todoList = "I will not allow this list to be empty";
  //   }
  //   function setRandomBGColor () {
  //     let letters = "123456789ABCDEF";
  //     let color = "#";
  //
  //     for (let i = 0; i < 6; i++) {
  //       color += letters[Math.floor(Math.random() * 15)];
  //     }
  //
  //     return color;
  //   }
  //
  //   let color = setRandomBGColor();
  //
  //   $l("#ul-list").append(`<li class="${liLength}" style="background: ${color}">${todoList}  <button class="delete-todo-button" type="submit" name="button">X</button></li>`);
  //   $l("#todo-item").arr[0].value = "";
  // });
//
//   document.querySelector(".delete-todo-button").addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log(e.target.parentNode.classList.value);
//
//   });
// });
