// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

axios.defaults.baseURL='http://127.0.0.1:8080/'
//添加请求拦截器
// axios.interceptors.request.use(config=>{
//   config.headers.Authorization=window.sessionStorage.getItem('token')
//   //在最后必须返回config
//   return config
// })



Vue.config.productionTip = false
// post请求是格式化数据
import qs from 'qs';
Vue.prototype.$qs = qs;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//组件
// import Classify from './components/classify.vue'
// const Loading={
//   install:function(Vue){
//     Vue.component('Classify',Classify)
//   }
// }
// export default Classify
