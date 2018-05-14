//
// NOTE:  here's an example of 2 independent vue instances using a simple
//        vuex store to manage the shared data...
//
//

const store = new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    newTodo: function(state, data) {
      state.todos = [ ...state.todos, data ]
    },
    completed: function(state, data) {
      state.todos[data.indx].completed = data.completed
    }
  }
})

const app = new Vue({
  el: "#app",
  data: {
    header: "ToDo's"
  },
  methods: {
    classFor: function(item) {
      return item.completed ? ['alert-success'] : ['alert-primary']
    },
    toggle: function(item, indx) {
      store.commit('completed', { indx, completed: !item.completed })
    }
  },
  computed: {
    todos: function() {
      return store.state.todos
    }
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

        store.commit('newTodo', obj)
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
