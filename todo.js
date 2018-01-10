document.addEventListener("DOMContentLoaded", () => {
  // function addADoItem () {
  //   let todoList = $("#todo-item").val();
  //   console.log(todoList);
  // }

  document.querySelector(".add-todo-button").addEventListener("click", (e) => {
    console.log('clicked');
      let todoList = $l("#todo-item").val();
      console.log(todoList);
  });
});
