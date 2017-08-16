<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
                <h1 v-if="v_successed == true">Success!</h1>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
                <div class="create">
                    <h1>credit</h1>
                    <h1>credit</h1>

                    <form v-on:submit.prevent="addProfile">
                        <div class="form-group">
                            <label name="credit_id">select Date</label>
                            <input type="date" class="form-control" v-model="credit_modal.dateOf" id="dateOf" >
                        </div>

                        <div class="form-group">
                            <label name="credit_name">AV</label>
                            <input type="text" class="form-control" v-model="credit_modal.assessed_value" id="AV" >
                        </div>

                        <div class="form-group">
                            <label name="credit_name">FV</label>
                            <input type="text" class="form-control" v-model="credit_modal.full_value" id="FV" >
                        </div>
                        <div class="form-group">
                            <label name="credit_name">TTT</label>
                            <input type="text" class="form-control" v-model="credit_modal.top_ten_taxpayers" id="TTT" >
                        </div>
                        <div class="form-group">
                            <label name="credit_name">TGT</label>
                            <input type="text" class="form-control" v-model="credit_modal.total_go_debt" id="TGT" >
                        </div>
                        <div class="form-group">
                            <label name="credit_name">TRD</label>
                            <input type="text" class="form-control" v-model="credit_modal.total_revenue_debt" id="TRD" >
                        </div>

                        <div class="form-group">
                            <label name="credit_name">TDL</label>
                            <input type="text" class="form-control" v-model="credit_modal.total_debt_limit" id="TDL" >
                        </div>
                        <div class="form-group">
                            <label name="credit_name">TDD</label>
                            <input type="text" class="form-control" v-model="credit_modal.total_direct_debt" id="TDD" >
                        </div>

                        <div class="form-group">
                            <button class="btn btn-primary" >Save</button>
                        </div>
                    </form>

                    <form v-if="selected_item==-1" v-on:submit.prevent="filesChange(input_files)" enctype="multipart/form-data">
                        <h1>Upload images</h1>        
                        <div class="card-action">
                            <div>
                                <span class="upload-file app-button waves-light btn btn-large brown darken-1">
                                    <i>(.CSV File Only)</i> Click to upload files
                                </span>
                            </div>
                            <div>
                              <div class="hide">
                                <input type="file" class="hide input-file" @change="input_files = $event.target.files">
                              </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary">Save</button>
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
        filesChange(files) {
            const fd = new FormData();
            fd.append("file", files[0]);
            fd.append('column', 'goDebtProfile');
            console.log(go_financial_data);
            console.log(api_go_url_post + 'update_from_csv/goDebtProfile/'+ window.all_data_id_go);
            if (window.all_data_id_go) {
                this.$http.post(api_go_url_post + 'update_from_csv/goDebtProfile/'+ window.all_data_id_go, fd, {
                    headers : {
                        'Content-Type' : undefined
                    }
                }).then((response) => {
                    this.go_credits = this.go_credits.concat(response.body.message);
                }, (response) => {

                });
            }
            
        },
        fetchProductData: function()
        {
            this.selected_item = window.selected_item;
            if (this.selected_item != -1) {
                this.credit_modal = window.credit;
                console.log(this.credit_modal)
            }
        },
        
        addProfile: function() {

            this.credit_modal.value = {}

            const tmp_data =  {
                dateOf: this.credit_modal.dateOf,
                values: [{
                    "assessed_value" : this.credit_modal.assessed_value, 
                    "full_value" : this.credit_modal.full_value, 
                    "top_ten_taxpayers" : this.credit_modal.top_ten_taxpayers, 
                    "total_go_debt" : this.credit_modal.total_go_debt,
                    "total_revenue_debt" : this.credit_modal.total_revenue_debt, 
                    "total_debt_limit" : this.credit_modal.total_debt_limit, 
                    "total_direct_debt" : this.credit_modal.total_direct_debt,
                }]
            };

            console.log(this.selected_item);
            if (this.selected_item == -1) {
                window.go_financial_data['goDebtProfile'].push(tmp_data); 
            } else {
                window.go_financial_data['goDebtProfile'][this.selected_item] = tmp_data;
                
            }

            this.server_request();
            const addBtn = this.$el.querySelector('.create');
            addBtn.style.display = 'none';

        },

        server_request: function() {
            this.$http.post(api_go_url_post, JSON.stringify(go_financial_data), {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then((response) => {
                this.v_successed = true
            }, (response) => {
                this.v_successed = true
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