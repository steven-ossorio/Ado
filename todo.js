document.addEventListener("DOMContentLoaded", () => {
  // function addADoItem () {
  //   let todoList = $("#todo-item").val();
  //   console.log(todoList);
  // }

  document.querySelector(".add-todo-button").addEventListener("click", (e) => {
    console.log('clicked');
    let todoList = $l("#todo-item").arr[0].value;
    console.log(todoList);

    $l("#ul-list").append(`<li>${todoList}</li>`);
    $l("#todo-item").arr[0].value = "";
  });
});
