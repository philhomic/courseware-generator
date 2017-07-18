// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './assets/stylus/index.styl';

Vue.config.productionTip = false;
Vue.directive('edit', {
  inserted: function (el) {
    let editorPos = el.getBoundingClientRect();
    let toolbar = document.getElementsByClassName('toolbar')[0];
    el.addEventListener('focus', function (ev) {
      toolbar.style.top = editorPos.bottom + 'px';
      toolbar.style.left = editorPos.left + 'px';
      toolbar.style.display = 'block';
    });
    el.addEventListener('blur', function (ev) {
      toolbar.style.display = 'none';
    });
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
