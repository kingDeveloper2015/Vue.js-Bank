
import BalanceSheet from 'components/credit/revCredits/revBalanceSheet.vue'
import CashFlow from 'components/credit/revCredits/revCashFlow.vue'
import IncomeStmt from 'components/credit/revCredits/revIncStmt.vue'
import CreditSearch from 'components/credit/revCredits/revSearch.vue'
import RatingModel from 'components/credit/revCredits/revRatingModel.vue'
import CreditDesc from 'components/credit/revCredits/revDesc.vue'
import Ratios from 'components/credit/revCredits/rev_ratios.vue'
export default [
	{
		path: '/rev-search',
		name: 'rev-search',
		components: {
			'rev-search': CreditSearch
		}
	},
	{
		path: '/rev-description',
		name: 'rev-description',
		components: {
			'rev-description': CreditDesc
		} 		
	},
	{
		path: '/rev-ratios',
		name: 'rev-ratios',
		components: {
			'rev-ratios': Ratios
		} 		
	},
	{
		path: '/balance-sheet',
		name: 'balance-sheet',
		components: {
			'balance-sheet': BalanceSheet
		} 

	},
	{
		path: '/income-statement',
		name: 'income-statement',
		components: {
			'income-statement': IncomeStmt
		} 
	},
	{
		path: '/cash-flow',
		name: 'cash-flow',
		components: {
			'cash-flow': CashFlow
		} 
	},
	{
		path: '/rev-rating-model',
		name: 'rev-rating-model',
		components: {
			'rev-rating-model': RatingModel
		}
	}
	
];