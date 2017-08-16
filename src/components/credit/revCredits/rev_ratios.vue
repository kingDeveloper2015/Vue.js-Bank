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
		<modal v-if="showModal" @close="showModal = false" effect="fade" >

		</modal>
		<table>
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
					<td>CR</td>
					<template v-for="val, key in go_credits">
						<td @click="select_item(key)" :class="{ active: key == selected_item }" >
							{{ val.current_ratio }}
						</td>
					</template>
				</tr>
				<tr>
					<td>QR</td>
					<template v-for="val, key in go_credits">
						<td @click="select_item(key)" :class="{ active: key == selected_item }" >
							{{ val.quick_ratio }}
						</td>
					</template>
				</tr>
				<tr>
					<td>DCR</td>
					<template v-for="val, key in go_credits">
						<td @click="select_item(key)" :class="{ active: key == selected_item }" >
							{{ val.dcoh_ratio }}
						</td>
					</template>
				</tr>
				<tr>
					<td>DR</td>
					<template v-for="val, key in go_credits">
						<td @click="select_item(key)" :class="{ active: key == selected_item }" >
							{{ val.debt_ratio }}
						</td>
					</template>
				</tr>
				<tr>
					<td>TDR</td>
					<template v-for="val, key in go_credits">
						<td @click="select_item(key)" :class="{ active: key == selected_item }" >
							{{ val.total_debt_ratio }}
						</td>
					</template>
				</tr>
				<tr>
					<td>TDSC</td>
					<template v-for="val, key in go_credits">
						<td @click="select_item(key)" :class="{ active: key == selected_item }" >
							{{ val.total_debt_service_coverage }}
						</td>
					</template>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>

	import Modal from './create_modal_CU/rev_ratios.vue'
	import moment from 'moment'
	window.selected_item =  -1
	window.credit =  {}
	window.all_data_id_go = window.go_financial_data._id

	export default{
		name: 'revRatios',
        data(){
            return{
                selected_item : -1,
                credit: {},
                showModal: false
            }
        },
        components: {
			'modal': Modal
		},

		filters: {
			filter_date(value) {
				return moment(String(value)).format('MM/DD/YYYY');
			}
		},

		computed: {
	    	go_credits: function() {
	    		var temp = [];
				var sCreditID = this.$root.$data.sCreditID;
				if ( sCreditID == -1 ) return;
				if ( !this.$root.$data.all_data.Revenue_ratios) return;
				for ( var i = 0 ;i< this.$root.$data.all_data.Revenue_ratios.length; i++){
					var CID = this.$root.$data.all_data.Revenue_ratios[i].CreditID;
					if ( sCreditID == CID ) {
						temp.push(this.$root.$data.all_data.Revenue_ratios[i]);
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

		        if (this.selected_item != -1) {
		        	this.server_request();
		        }

	        },

            select_item: function(params) {
            	this.selected_item = params;
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
					table : 'Revenue_ratios',
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
						$this.$root.$data.all_data.Revenue_ratios.splice($this.selected_item,1);
						console.log(pullResults);						
					}
				});
            }
        }
    }
</script>
<style>
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