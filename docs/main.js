const app = new Vue({
  el: "#app",
  data: {
    todos: [],
    title: '',
    description: '',
    header: "ToDo's:"
  },
  methods: {
    classFor: function(item) {
      return item.completed ? ['alert-danger'] : ['alert-primary']
    },
    complete: function(item) {
      item.completed = true
    },
    submit: function() {
      const title = this.title
      const description = this.description
      const completed = false

      if (title !== '') {
        const obj = { title, description, completed }

        this.todos.push(obj)
      }

      this.title = ''
      this.description = ''
    }
  }
})
