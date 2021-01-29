// localStorage persistence
const STORAGE_KEY = "todo-vuejs-2.0";
const todoStorage = {
  fetch: function() {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach(function(todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

const app = new Vue({
  el: "#app",
  data: {

  },
  methods: {

  }
})