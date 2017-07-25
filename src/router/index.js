import Vue from 'vue';
import Router from 'vue-router';
 import page from '@/components/page/page';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/page/:pageIndex',
      name: 'page',
      component: page
    }
  ]
});
