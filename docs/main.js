//
// NOTE:  here's an example of 2 independent vue instances on a single page
//        that are talking to each other thru a third vue instance that's
//        surving purely as an eventBus for the elements on the page...
//
//
const eventBus = new Vue()

const app = new Vue({
  el: "#app",
  data: {
    todos: []
  },
  methods: {
    classFor: function(item) {
      return item.completed ? ['alert-success'] : ['alert-primary']
    },
    newTodo: function(data) {
      this.todos.push(data)
    },
    toggle: function(item) {
      item.completed = !item.completed
    }
  },
  created() {
    eventBus.$on('new:todo', this.newTodo)
  }
})

const form = new Vue({
  el: "#form",
  data: {
    title: '',
    description: '',
  },
  methods: {
    submit: function() {
      const title = this.title
      const description = this.description
      const completed = false

      if (title !== '') {
        const obj = { title, description, completed }

        eventBus.$emit('new:todo', obj)
      }

      this.title = ''
      this.description = ''
      //
      // NOTE: reset the focus...
      //
      this.$refs.description.blur()
      this.$refs.title.focus()
    }
  }
})
