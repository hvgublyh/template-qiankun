import Vue from 'vue'
import App from './App.vue'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

const instance = new Vue({
  render: h => h(App)
}).$mount('#app')
console.log('instance', instance)
