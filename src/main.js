import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes/routes.js'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
	history: true,
	routes
});

new Vue({
  el: '#app',
  router,
  data: {
  	go_financial_data: {},
    rev_financial_data: {},
  	alldata_rev: {},
    results_credit: [],
	all_data: {},
	start_date: '1900-01-01',
	end_date: '',
	sCreditID: -1
  },
  render: h => h(App)
})
