import Vue from 'vue';
import VueRouter from 'vue-router';
import FeedbackForm from './components/FeedbackForm.vue';
import FeedbackList from './components/FeedbackList.vue';

Vue.use(VueRouter);

const routes = [
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
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
