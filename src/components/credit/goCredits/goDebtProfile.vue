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
				<table class="table" slot="body">
					<thead>
						<tr>
							<th>Metric</th>
							<th  v-for="dt in go_credits">
								{{ dt.statementDate | filter_date }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>AV</td>
							<template v-for="val, key in go_credits">

								<td @click="select_item(key)" :class="{ active: key == selected_item }" >
									{{ val.assessed_value }}
								</td>
							</template>
						</tr>
						<tr>
							<td>FV</td>
							<template v-for="val, key in go_credits" >      
								<td  @click="select_item(key)" :class="{ active: key == selected_item }" >
									{{ val.full_value }}
								</td>           
							</template> 
						</tr>
						<tr>
							<td>TGT</td>
							<template v-for="val, key in go_credits">      
								<td  @click="select_item(key)" :class="{ active: key == selected_item }" >
									{{ val.total_go_debt }}
								</td>           
							</template> 
						</tr>
						<tr>
							<td>TRD</td>
							<template v-for="val, key in go_credits">      
								<td  @click="select_item(key)" :class="{ active: key == selected_item }" >
									{{ val.total_revenue_debt }}
								</td>
							</template>
						</tr>
						<tr>
							<td>TDL</td>
							<template v-for="val, key in go_credits">      
								<td  @click="select_item(key)" :class="{ active: key == selected_item }" >
									{{ val.total_debt_limit }}
								</td>           
							</template> 
						</tr>
						<tr>
							<td>TDD</td>
							<template v-for="val, key in go_credits">      
								<td  @click="select_item(key)" :class="{ active: key == selected_item }" >
									{{ val.total_direct_debt }}
								</td>           
							</template>
						</tr>
						<tr>
							<td>TOB</td>
							<template v-for="val, key in go_credits">      
								<td  @click="select_item(key)" :class="{ active: key == selected_item }" >
									{{ val.total_overlapping_debt }}
								</td>           
							</template>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<modal v-if="showModal" @close="showModal = false" effect="fade" ></modal>
	</div>
</template>

<script>

	import Modal from './credit_modal_CU/dbt_profile.vue'
	import moment from 'moment'

	window.selected_item =  -1
	window.credit =  {}
	export default {

		name: 'goDebtProfile',
		components: {
			'modal': Modal,
		},
		filters: {
			filter_date(value) {
				return moment(String(value)).format('MM/DD/YYYY');
			}
		},		
		data(){
	        return{
	            selected_item : -1,
	            credit: {},
	            showModal: false,
	        }
	    },
	    computed: {
	    	go_credits: function() {
				var temp = [];
				var sCreditID = this.$root.$data.sCreditID;
				if ( sCreditID == -1 ) return;
				if ( !this.$root.$data.all_data.GO_debt_profile) return;
				for ( var i = 0 ;i< this.$root.$data.all_data.GO_debt_profile.length; i++){
					var CID = this.$root.$data.all_data.GO_debt_profile[i].CreditID;
					if ( sCreditID == CID ) {
						temp.push(this.$root.$data.all_data.GO_debt_profile[i]);
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
		        	this.credit = this.go_credits[this.selected_item];
		        	this.showModal = true;
		        	window.credit = this.credit
					window.method = "update";
	        	}
	        },

	        click_delete: function() {
				console.log(this.selected_item);
		        if (this.selected_item != -1) {
		        	this.server_request();
		        }
	        },

	        select_item: function(params) {
	        	this.selected_item = params;
				console.log(this.go_credits[params].id);
				window.selected_item = this.selected_item;
				window.sID = this.go_credits[params].id;
	        },

	        server_request: function() {
	        	var lambda = new AWS.Lambda({
					region: 'us-east-1',
					accessKeyId : 'AKIAISHSYMCYRPSKP2TQ',
					secretAccessKey : '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'
				});
				var payLoad ={
					method: "delete",
					table : 'GO_debt_profile',
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
						$this.$root.$data.all_data.GO_debt_profile.splice($this.selected_item,1);
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
