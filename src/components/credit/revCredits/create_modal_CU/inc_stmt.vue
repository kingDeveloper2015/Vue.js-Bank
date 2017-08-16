<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
                <h1>Dbt Profile</h1>
                <h1 v-if="v_successed == true">Success!</h1>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
                <div class="create">

                   <div class="create">
						<h1>Create credit</h1>

						<form v-on:submit.prevent="addProfile">
						    <div class="form-group">
						        <label name="credit_id">select Date</label>
						        <input type="date" class="form-control" v-model="credit_modal.statementDate" id="statementDate" >
						    </div>

						    <div class="form-group">
						        <label name="credit_name">R</label>
						        <input type="text" class="form-control" v-model="credit_modal.revenues" id="R" >
						    </div>

						    <div class="form-group">
						        <label name="credit_name">E</label>
						        <input type="text" class="form-control" v-model="credit_modal.expenses" id="E" >
						    </div>
						    <div class="form-group">
						        <label name="credit_name">D</label>
						        <input type="text" class="form-control" v-model="credit_modal.depreciation" id="D" >
						    </div>
						    <div class="form-group">
						        <label name="credit_name">IE</label>
						        <input type="text" class="form-control" v-model="credit_modal.interest_expense" id="IE" >
						    </div>
						    <div class="form-group">
						        <label name="credit_name">EBITBA</label>
						        <input type="text" class="form-control" v-model="credit_modal.ebitda" id="EBITBA" >
						    </div>

						    <div class="form-group">
						        <label name="credit_name">CNA</label>
						        <input type="text" class="form-control" v-model="credit_modal.change_net_assets" id="CNA" >
						    </div>

						    <div class="form-group">
						        <button class="btn btn-primary" >Save</button>
						    </div>
						</form>
					</div>
                </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
                <button class="modal-default-button" @click="$emit('close')" v-if="v_successed == false">
                    Cancel
                </button>
                <button class="modal-default-button" @click="$emit('close')" v-if="v_successed == true">
                    OK
                </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {

  name: 'inputModal',

    data () {
        return {
            credit_modal: window.credit,
            selected_item: window.selected_item,
            v_successed: false,
            input_files: [],
        };
    },
    loaded: function() {
        this.fetchProductData();
    },
    methods: {
        fetchProductData: function()
        {
            this.selected_item = window.selected_item;
            if (this.selected_item != -1) {
                this.credit_modal = window.credit;
            }
        },
        
        addProfile: function() {

            this.credit_modal.statementDate = new Date(Date.parse(this.credit_modal.statementDate));
            this.credit_modal["CreditID"] = this.$root.$data.sCreditID;
            this.server_request({
				method: window.method,
				table : 'Revenue_income_statement',
				data : {
                    data :this.credit_modal,
                    id : window.sID
                }
			})
            const addBtn = this.$el.querySelector('.create');
            addBtn.style.display = 'none';
            this.v_successed = true

        },

        server_request: function(payLoad) {
            var lambda = new AWS.Lambda({
                region: 'us-east-1',
                accessKeyId : 'AKIAISHSYMCYRPSKP2TQ',
                secretAccessKey : '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'
            });
            
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
                    console.log(pullResults);
					$this.credit_modal["id"] = pullResults;
                    if ( window.method == "create") {
                        $this.$root.$data.all_data.Revenue_income_statement.push($this.credit_modal);
                    } else {
                        window.credit = $this.credit_modal;
                    }
                    
                }
            });
        }
    },
    
};
</script>

<style lang="css" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
</style>