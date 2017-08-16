<template>
	<div>
	<notifications position="top right" />
		<p>Search Criteria</p>

		<hr>
		<div class="center-div">
			<input class="" v-model="searchStr">
			<button>Clear Search</button>
		</div>
		<table class="search_credit_result" v-if="search_results.length > 0">
			<thead>
				<tr>
					<th>CreditID</th>
					<th>Credit Name</th>
					<th>State</th>
					<th>Date</th>
					<td>Equity Ticker</td>
					<td>Sector</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="val, key in search_results" v-on:click="active_credit(key)" v-bind:class="{ 'active': val.CreditID == selected_data.CreditID }">
					<td>
						{{ val.CreditID }}
					</td>
					<td>
						{{ val.CreditName }}
					</td>
					<td>
						{{ val.state }}
					</td>
					<td>
						{{ val.fiscal_year_end }}
					</td>
					<td>
						{{ val.bloomberg_equity_ticker }}
					</td>
					<td>
						{{ val.sector }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>	
	
</template>

	
<script>

	import Datepicker from 'vue-date'
	import VTagInput from 'v-tag-input'
	import Vue           from 'vue'
	import Notifications from 'vue-notification'
	const Icon = require('vue-icon');

	import moment from 'moment'
	Vue.use(Notifications)
	export default {
		
		name: 'goSearch',

		components: {
			Datepicker,
			VTagInput,
			'my-vue-icon': Icon,
		},

		data () {
			return {
				searchParams: {
					name: '',
					equity_ticker: ''
				},
				cusips: [],
				searchStr: '',
				start_date: '',
				end_date: moment(new Date()).format("YYYY-MM-DD"),
				selected_data: {
					id: (typeof this.$root.$data.go_financial_data.id != 'undefined') ? this.$root.$data.go_financial_data.id : 'none'
				},
			};
		},
		computed: {
			search_results: function () {
				if ( !this.$root.$data.all_data.Credits ) return [];
				var temp = [];
				for ( var i = 0 ;i< this.$root.$data.all_data.Credits.length; i++) {
					var CID = this.$root.$data.all_data.Credits[i].CreditID;
					var CName = this.$root.$data.all_data.Credits[i].CreditName;
					var sector = this.$root.$data.all_data.Credits[i].sector;
					if ( CID.toString().includes(this.searchStr) && sector == 'GO' || CName && CName.includes(this.searchStr) && sector == 'GO') {
						temp.push(this.$root.$data.all_data.Credits[i]);
					}
				}
				return temp;
	    	}
		},
		watch:{
			searchStr: function(str){
			}
		},
		position () {
			return 'top right';
		},
		methods: {
			submitSearch() {
				if (this.start_date > this.end_date) {
					this.$notify({
						title: '<strong>Invalid</strong> : ended date from started date',
						text: 'Hello, End Date must be further than Start Date',
						position: 'top center',
						type: 'warning',
						duration: 8000,
					});
					return false;
				}
				this.searchParams.start_date = this.start_date ? this.start_date : '1900-01-01';
				this.start_date = this.start_date ? this.start_date : '1900-01-01';
				this.searchParams.end_date = this.end_date ? this.end_date : '';
				this.searchParams.cusips = this.cusips;
				this.searchParams.sector = 'Go';
				this.searchParams.sector = 'Go';
				this.flag_search_params = true;
				this.$root.$data.results_credit = [];
				this.searchParams.flag_search_params = true;
				
				this.$root.$data.start_date = this.start_date;
				this.$root.$data.end_date = this.end_date;
				
				console.log(this.searchParams);
				console.log(api_go_url_post);
				for ( var i=0;i<this.$root.$data.all_data.Credits.length; i++){
					
					if ( new Date(this.$root.$data.all_data.Credits[i].fiscal_year_end) < new Date(this.end_date) && new Date(this.$root.$data.all_data.Credits[i].fiscal_year_end) > new Date(this.start_date) ) {
						this.$root.$data.results_credit.push(this.$root.$data.all_data.Credits[i]);
					}
				}
			},
			active_credit(key) {
				this.$root.$data.sCreditID = this.search_results[key].CreditID;
				this.$router.replace('debt-profile');
			}
		},
	};
</script>

<style lang="css" scoped>
	.search_form {
		display: block;
		background: #eee;
		width: 50%;
		margin: auto;
		box-shadow: 0px 0px 10px #93a392;
		padding: 20px 30px;
		margin-bottom: 20px;
	}

	.search_form .form-group {
		padding: 15px 5px;
	}

	.search_form input.form-input {
		padding: 3px;
		border: 1px solid #c5e3ec;
		padding: 7px 7px 7px 20px;
		color: #717274;
	}

	.search_form .btn {
		padding:15px 40px;
	}

	.credit_field .form-group {
		width: 50%;
		display: block;
	}

	.credit_field .form-group .form-input {
		width: 100%;
		background: #f1f1f1;
	}

	.credit_field .form-group .form-input::-webkit-input-placeholder {
		color: #b7b7b7;
	}
	.credit_field .form-group .form-input:-moz-placeholder {
		color: #b7b7b7;
	}
	.credit_field .form-group .form-input::-moz-placeholder {
		color: #b7b7b7;
	}
	.credit_field .form-group .form-input:-ms-input-placeholder {
		color: #b7b7b7;
	}
	.credit_field .form-group .form-input::-ms-input-placeholder {
		color: #b7b7b7;
	}
	.credit_field .cusips_result {
		color: #759084;
		text-align: center;
	}
	.center-div {
		width: 75%;
		margin: 10px auto;
	}
	.search_credit_result {
		width: 75%;
		text-align: center;
		margin: auto;
		box-shadow: 0px 0px 4px #26a69a;
		padding: 20px 30px;
	}
	.search_credit_result tr th {
		padding: 10px;
		border-bottom: 1px solid #d6d6d6;
	}
	.search_credit_result tr td {
		padding: 8px;
		border-bottom: 1px solid #eee; 
	}

	.search_credit_result tbody tr {
		transition: 0.5s all;
	}

	.search_credit_result tbody tr:hover {
		background: #b2dad6;
		cursor: pointer;
	}
	.search_credit_result tbody tr.active {
		background: #26a69a;
		color: #eee;
	}
</style>
