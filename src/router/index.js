import Vue from 'vue';
import Router from 'vue-router';
import page from '@/components/page/page';
import unitEditor from '@/components/unit_editor/unit_editor';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/editor',
      name: 'editor',
      component: unitEditor
    },
    {
      path: '/page/:pageIndex',
      name: 'page',
      component: page
    }
  ]
});
