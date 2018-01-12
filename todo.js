document.addEventListener("DOMContentLoaded", () => {
  // function addADoItem () {
  //   let todoList = $("#todo-item").val();
  //   console.log(todoList);
  // }

  document.querySelector(".add-todo-button").addEventListener("click", (e) => {
    let todoList = $l("#todo-item").arr[0].value;

    if (todoList === "") {
        todoList = "I will not allow this list to be empty";
    }
    function setRandomBGColor () {
      let letters = "123456789ABCDEF";
      let color = "#";

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 15)];
      }

      return color;
    }

    let color = setRandomBGColor();

    $l("#ul-list").append(`<li style="background: ${color}">${todoList}</li>`);
    $l("#todo-item").arr[0].value = "";
  });

  document.querySelector(".delete-todo-button").addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e);

  });
});
