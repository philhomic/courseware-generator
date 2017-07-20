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
    var toolbar = document.getElementsByClassName('toolbar')[0];
    el.addEventListener('focus', function (ev) {
      var editor = ev.target;
      var editorPos = editor.getBoundingClientRect();
      toolbar.style.display = 'block';
      toolbar.style.top = editorPos.bottom + window.scrollY + 'px';
      toolbar.style.left = editorPos.left + window.scrollX + 'px';
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
