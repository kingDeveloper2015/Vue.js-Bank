import Socio_Econ from 'components/credit/goCredits/goSocioEcon.vue'
import Debt_Profile from 'components/credit/goCredits/goDebtProfile.vue'
import General_Fund from 'components/credit/goCredits/goGenFund.vue'
import Govt_Act from 'components/credit/goCredits/goGovtAct.vue'
import Net_Position from 'components/credit/goCredits/goNetPosition.vue'
import CreditSearch from 'components/credit/goCredits/goSearch.vue'
import RatingModel from 'components/credit/goCredits/goRatingModel.vue'
import CreditDesc from 'components/credit/goCredits/goDesc.vue'

export default [
	{
		path: '/go-search',
		name: 'go-search',
		components: {
			'go-search': CreditSearch
		}
	},
	{
		path: '/go-description',
		name: 'go-description',
		components: {
			'go-description': CreditDesc
		} 		
	},
	{
		path: '/socio-economics',
		name: 'socio-economics',
		components: {
			'socio-economics': Socio_Econ
		} 

	},
	{
		path: '/debt-profile',
		name: 'debt-profile',
		components: {
			'debt-profile': Debt_Profile
		} 
	},
	{
		path: '/general-fund',
		name: 'general-fund',
		components: {
			'general-fund': General_Fund
		} 
	},
	{
		path: '/govt-act',
		name: 'govt-act',
		components: {
			'govt-act': Govt_Act
		} 
	},
	{
		path: '/net-position',
		name: 'net-position',
		components: {
			'net-position': Net_Position
		}
	},
	{
		path: '/go-rating-model',
		name: 'go-rating-model',
		components: {
			'go-rating-model': RatingModel
		}
	}
	
];