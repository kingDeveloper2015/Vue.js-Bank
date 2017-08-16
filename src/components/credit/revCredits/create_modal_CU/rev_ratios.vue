<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
                <h1> Social Economics </h1>
                <h1 v-if="v_successed == true">Success!</h1>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
                <div class="create">
                    <form v-on:submit.prevent="addProfile">
                        <div class="form-group">
                            <label name="credit_id">select Date</label>
                            <input type="date" class="form-control" v-model="credit_modal.statementDate" id="statementDate" required>
                        </div>

                        <div class="form-group">
                            <label name="credit_name">CR</label>
                            <input type="text" class="form-control" v-model="credit_modal.current_ratio" id="CR" required>
                        </div>
                        <div class="form-group">
                            <label name="credit_name">QR</label>
                            <input type="text" class="form-control" v-model="credit_modal.quick_ratio" id="QR" required>
                        </div>
                        <div class="form-group">
                            <label name="credit_name">DCR</label>
                            <input type="text" class="form-control" v-model="credit_modal.dcoh_ratio" id="DCR" required>
                        </div>
                        <div class="form-group">
                            <label name="credit_name">DR</label>
                            <input type="text" class="form-control" v-model="credit_modal.debt_ratio" id="DR" required>
                        </div>
                        <div class="form-group">
                            <label name="credit_name">TDR</label>
                            <input type="text" class="form-control" v-model="credit_modal.total_debt_ratio" id="TDR" required>
                        </div>
                        <div class="form-group">
                            <label name="credit_name">TDSC</label>
                            <input type="text" class="form-control" v-model="credit_modal.total_debt_service_coverage" id="TDSC" required>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary" >Save</button>
                        </div>
                    </form>
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

  name: 'Modal',

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
                console.log(this.credit_modal)
            }
        },
        
        addProfile: function() {

            this.credit_modal.statementDate = new Date(Date.parse(this.credit_modal.statementDate)).toLocaleDateString();
            this.credit_modal["CreditID"] = this.$root.$data.sCreditID;
            this.server_request({
				method: window.method,
				table : 'Revenue_ratios',
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
                        $this.$root.$data.all_data.Revenue_ratios.push($this.credit_modal);
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