import Vue from 'vue';
import Router from 'vue-router';
import page from '@/components/page/page/page';
import unitEditor from '@/components/unit/unit_editor/unit_editor';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/editor',
      name: 'editor',
      component: unitEditor
    },
    {
      path: '/unit/:unitIndex/page/:pageIndex',
      name: 'page',
      component: page
    }
  ]
});
