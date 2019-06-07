import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import axios from 'axios'

Vue.prototype.axios = axios;

// "http://p0.meituan.net/w.h/movie/47af2656af6cd0110057bc527b862c665484423.jpg"
//是吧 w.h 替换成自定的宽高
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg);
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
