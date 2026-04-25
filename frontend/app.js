// app.js — без import! Все библиотеки уже глобальные

// Компоненты определяем как глобальные переменные
window.FeedbackForm = {
  template: `
    <div>
      <h2>Форма обратной связи</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label>Имя:</label>
          <input v-model="name" type="text" required>
        </div>
        <div>
          <label>Обращение:</label>
          <textarea v-model="message" required></textarea>
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  `,
  data() {
    return {
      name: '',
      message: ''
    };
  },
  methods: {
    async submitForm() {
      const feedback = {
        id: Date.now(),
        name: this.name,
        message: this.message,
        timestamp: new Date().toISOString()
      };

      try {
        await axios.post('/backend/public/api/feedback', feedback);
        this.$store.dispatch('addFeedback', feedback);
        alert('Обращение отправлено!');
        this.name = '';
        this.message = '';
      } catch (error) {
        console.error('Ошибка отправки:', error);
        alert('Ошибка отправки обращения');
      }
    }
  }
};

window.FeedbackList = {
  template: `
    <div>
      <h2>Список обращений</h2>
      <div v-if="feedbackList.length === 0">
        Обращений пока нет
      </div>
      <div v-else v-for="feedback in feedbackList" :key="feedback.id">
        <h3>{{ feedback.name }}</h3>
        <p>{{ feedback.message }}</p>
        <small>{{ new Date(feedback.timestamp).toLocaleString() }}</small>
        <hr>
      </div>
    </div>
  `,
  computed: {
    feedbackList() {
      return this.$store.state.feedbackList;
    }
  }
};

// Создаём роутер
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'FeedbackForm',
      component: FeedbackForm
    },
    {
      path: '/list',
      name: 'FeedbackList',
      component: FeedbackList
    }
  ]
});

// Создаём store
const store = new Vuex.Store({
  state: {
    feedbackList: []
  },
  mutations: {
    ADD_FEEDBACK(state, feedback) {
      state.feedbackList.push(feedback);
    }
  },
  actions: {
    addFeedback({ commit }, feedback) {
      commit('ADD_FEEDBACK', feedback);
    }
  }
});

// Монтируем приложение
new Vue({
  router,
  store,
  render: h => h({
    template: `
      <div id="app">
        <nav>
          <router-link to="/">Форма обратной связи</router-link> |
          <router-link to="/list">Список обращений</router-link>
        </nav>
        <router-view/>
      </div>
    `
  })
}).$mount('#app');
