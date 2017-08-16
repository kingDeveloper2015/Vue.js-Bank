/*
	Routes for Page Sidebar
 */
import Credit_Data from 'components/credit/dataReports/mainDataReports.vue'

import Credit_Rev from 'components/credit/revCredits/revMain.vue'

import Credit_Go from 'components/credit/goCredits/goMain.vue'

//Credit Child Routes - Tabs
import credit_go_routes  from './goRoutes.js'

import credit_rev_routes from './revRoutes.js'



export default [
	{
		path: '/credit-data',
		name: 'credit-data',
		components: {
			'credit-data': Credit_Data
		}
	},
	{
		path: '/credit-go',
		name: 'credit-go',
		components: {
			'credit-go': Credit_Go
		}, 
		children: credit_go_routes

	},
	{
		path: '/credit-revenue',
		name: 'credit-revenue',
		components: {
			'credit-revenue': Credit_Rev
		},
		children: credit_rev_routes
	},
	{
		path: '*',
		component: Credit_Data
	}

]



