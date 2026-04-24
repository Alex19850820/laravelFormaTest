import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
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
