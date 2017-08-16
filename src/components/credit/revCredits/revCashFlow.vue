<template>	
	<div class="credit-data-table">

		<table>
			<tr>
				<td>
					<button @click="click_create">Add</button>
					<button @click="click_edit">Edit</button>
					<button @click="click_delete">Delete</button>
				</td>
			</tr>
		</table>
		<div class="data_view_area">
			<div>
				<table>
					<thead>
						<tr>
							<th>Metric</th>
							<th  v-for="dt in rev_credits">
								{{ dt.statementDate | filter_date }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>FV</td>
							<template v-for="val, key in rev_credits" >      
								<td @click="select_item(key)" :class="{ active: key == selected_item }" >
									{{ val.cash_flow_operations }}
								</td>           
							</template> 
						</tr>
						<tr>
							<td>TTT</td>
							<template v-for="val, key in rev_credits">      
								<td @click="select_item(key)" :class="{ active: key == selected_item }" >
									{{ val.cash_flow_investing }}
								</td>
							</template>
						</tr>
						<tr>
							<td>TGT</td>
							<template v-for="val, key in rev_credits">      
								<td @click="select_item(key)" :class="{ active: key == selected_item }" >
									{{ val.cash_flow_financing }}
								</td>           
							</template> 
						</tr>
						<tr>
							<td>TRD</td>
							<template v-for="val, key in rev_credits">      
								<td @click="select_item(key)" :class="{ active: key == selected_item }" >
									{{ val.cash_flow_nonfinancing }}
								</td>
							</template>
						</tr>
						<tr>
							<td>TDL</td>
							<template v-for="val, key in rev_credits">      
								<td @click="select_item(key)" :class="{ active: key == selected_item }" >
									{{ val.principal_payments }}
								</td>           
							</template> 
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<modal v-if="showModal" @close="showModal = false" effect="fade"></modal>
	</div>
</template>


<script>
	import Modal from './create_modal_CU/cash_flow.vue'

	import moment from 'moment'

	window.selected_item =  -1
	window.credit =  {}

	export default {

		name: 'revCashFlowStatement',
		components: {
			'modal': Modal
		},
		data(){
	        return{
	            selected_item : -1,
	            credit: {},
	            showModal: false,
	        }
	    },
		filters: {
			filter_date(value) {
				return moment(String(value)).format('MM/DD/YYYY');
			}
		},
	    computed: {
	    	rev_credits: function() {
				var temp = [];
				if ( !this.$root.$data.all_data.Revenue_cash_flow_statement) return;
				var sCreditID = this.$root.$data.sCreditID;
				for ( var i = 0 ;i< this.$root.$data.all_data.Revenue_cash_flow_statement.length; i++){
					var CID = this.$root.$data.all_data.Revenue_cash_flow_statement[i].CreditID;
					if ( CID == sCreditID ) {
						temp.push(this.$root.$data.all_data.Revenue_cash_flow_statement[i]);
					}
				}
				return temp;
	    	}
	    },
	    methods: {
	        click_create: function() {
	        	this.credit= {};
	        	this.selected_item = -1;

	        	this.showModal = true;
	        	window.selected_item = -1;
				window.credit = this.credit;
				window.method = "create";
	        },
	        click_edit: function() {
	        	if (this.selected_item != -1) {
	        		this.credit = this.rev_credits[this.selected_item];
		        	this.showModal = true;
					window.credit = this.credit
					window.method = "update";
	        	}
	        },

	        click_delete: function() {
		        if (this.selected_item != -1) {
		        	//this.$root.$data.rev_financial_data['cash_flow_statement'].splice(this.selected_item, 1);
		        	this.server_request();
		        }
	        },

	        select_item: function(params) {
	        	this.selected_item = params;
				window.selected_item = this.selected_item;
				window.sID = this.rev_credits[params].id;
	        },

	        server_request: function() {
	        	var lambda = new AWS.Lambda({
					region: 'us-east-1',
					accessKeyId : 'AKIAISHSYMCYRPSKP2TQ',
					secretAccessKey : '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'
				});
				var payLoad ={
					method: "delete",
					table : 'Revenue_cash_flow_statement',
					data : window.sID
				};
				console.log(payLoad);
				var pullParams = {
					FunctionName : 'grcrud',
					InvocationType: 'RequestResponse',
					LogType: 'None',
					Payload : JSON.stringify(payLoad)
				};
				
				var pullResults;
				var $this = this;
				lambda.invoke(pullParams, function(error,data) {
					if ( error) {
						prompt( error );
					} else {
						pullResults = JSON.parse(data.Payload);
						$this.$root.$data.all_data.Revenue_cash_flow_statement.splice($this.selected_item,1);
						console.log(pullResults);						
					}
				});
	        },
	    }
	};
</script>
<style lang="css" scoped>

.data_view_area {
	overflow: auto;
	margin: auto;
	padding: 5px;
}

table td,
table th {
	border: 1px solid #dbdbdb;
	border-width: 0 0 1px;
	padding: 0.5em 0.75em;
	vertical-align: top;
}

table th {
	color: #363636;
   	text-align: left;
}

table tr:hover {
  background-color: whitesmoke;
}

table thead td,
table thead th {
  border-width: 0 0 2px;
  color: #363636;
}

table tfoot td,
table tfoot th {
  border-width: 2px 0 0;
  color: #363636;
}

table tbody tr:last-child td,
table tbody tr:last-child th {
  border-bottom-width: 0;
}

td.active {
	background: green;
	color: #eee;
}
</style>
