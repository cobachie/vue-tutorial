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
    todos: [],
    options: [
      { value: -1, label: 'すべて' },
      { value:  0, label: '作業中' },
      { value:  1, label: '完了' },
    ],
    current: -1
  },
  created() {
    this.todos = todoStorage.fetch()
  },
  computed: {
    computedTodos() {
      return this.todos.filter(el => {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    }
  },
  methods: {
    add(event, value) {
      const comment = this.$refs.comment

      if (!comment.value.length) return

      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })

      comment.value = ""
    },
    changeState: function(item) {
      item.state = item.state ? 0 : 1
    },
    remove: function(item) {
      const index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  },
  watch: {
    // ref: https://jp.vuejs.org/v2/api/#watch
    todos: {
      // 深い階層のwatchを行う場合はhandlerとdeepオプションが必要
      handler: function(todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  }
})