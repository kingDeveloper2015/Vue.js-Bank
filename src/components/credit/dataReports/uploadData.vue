<template>
	<div>
		<h1>Upload Data</h1>
        <input type="radio" name="picked" value="Go" v-model="picked">
        <input type="radio" name="picked" value="Rev" v-model="picked">
        {&#123;picked&#125;}

    <br><br>
    <hr>

		<form v-on:submit.prevent="filesChange(input_files_go, 'go')" enctype="multipart/form-data" v-show='picked == "Go"'>
            <h4>Go Upload (.csv)</h4>
            <div class="card-action">
                <div>
                    <span class="upload-file app-button waves-light btn btn-large brown darken-1">
                        <i>(.CSV File Only)</i> Click to upload files
                    </span>
                </div>
                <div>
                    <div class="hide">
                        <input type="file" class="hide input-file" @change="input_files_go = $event.target.files">
                    </div>
                </div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary">Save</button>
            </div>
        </form>
        
        <form v-on:submit.prevent="filesChange(input_files_rev, 'rev')" enctype="multipart/form-data" v-show='picked == "Rev"'>

            <h4>Rev Upload (.csv)</h4>
            <div class="card-action">
                <div>
                    <span class="upload-file app-button waves-light btn btn-large brown darken-1">
                        <i>(.CSV File Only)</i> Click to upload files
                    </span>
                </div>
                <div>
                    <div class="hide">
                        <input type="file" class="hide input-file" @change="input_files_rev = $event.target.files">
                    </div>
                </div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary">Save</button>
            </div>
        </form>
	</div>
</template>

<script>
export default {

  name: 'uploadData',

  data () {
    return {
        picked: 'Go',
        input_files_go: [],
        input_files_rev: [],
    };
  },
  methods: {
	filesChange(files, option) {
        var s3 = new AWS.S3({
			region: 'us-east-2',
            accessKeyId : 'AKIAISHSYMCYRPSKP2TQ',
            secretAccessKey : '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',
            params: {
                Bucket : 'research-csv'
            }
        });
        var lambdafunction;
        if ( option == 'go' ) {
            lambdafunction = 'go_csv';
        } else {
            lambdafunction = 'rev_csv';
        }
        var keyName = encodeURIComponent('research-csv') + '//' + files[0].name;
        console.log(keyName);
        s3.upload({
            Key: keyName,
            Body: files[0],
            ACL: 'public-read'
        }, function ( err, data) {
            if ( err ) {
				console.log(err);
                return alert('There was an error uploading your photo: ', err.message);
            }
            alert("Success");
            var lambda = new AWS.Lambda({
				region : 'us-east-2',
                accessKeyId : 'AKIAISHSYMCYRPSKP2TQ',
                secretAccessKey : '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'
            });

            var pullParams = {
                FunctionName : lambdafunction,
                InvocationType: 'RequestResponse',
                LogType: 'None',
                Payload : '{ "bucket" : "research-csv", "key":"' + keyName + '"}'
            };
            var pullResults;
            lambda.invoke(pullParams, function(error,data) {
                if ( error) {
                    prompt( error );
                } else {
                    pullResults = JSON.parse(data.Payload);
                    console.log(pullResults);
                }
            });
        })
		/* if (files.length > 0) {
            var selected_file = files[0];
			var columns = [];
            var bulk_options = {};
            var post_url = '';
			switch (option) {
				case 'go' :
                    columns = ['debt_profile', 'general_fund', 'statement_activities', 'net_position', 'ratios'];
                    bulk_options = {
                        debt_profile: ['assessed_value','full_value','top_ten_taxpayers','total_go_debt','total_revenue_debt','total_debt_limit','total_direct_debt'],
                        general_fund: ['property_tax_revenues','total_revenues','total_expenes', 'fund_balance', 'unrestricted_fund_balance'],
                        statement_activities: ['aggregate_revenues','aggregate_expenses','aggregate_change_net_position'],
                        net_position: ['cash','current_assets','total_assets','current_liabilities','total_debt','total_liabilities','net_pension_liability','unrestricted_net_assets','net_assets'],
                        ratios: ['full_value_per_capita','direct_debt_per_capita','direct_debt_full_value']
                    };
                    post_url = api_go_url_post;
				break;
				case 'rev' :
                    columns = ['balance_sheet', 'cash_flow_statement', 'income_statement', 'ratios'];
                    bulk_options = {
                        balance_sheet: ['cash','current_assets','capital_assets','total_assets','current_ltd','current_liabilities','long_term_debt','total_liabilities','restricted_net_assets','unrestricted_net_assets','net_capital_assets','total_net_assets'],
                        cash_flow_statement: ['cash_flow_operations','cash_flow_investing','cash_flow_financing','cash_flow_nonfinancing','principal_payments'],
                        income_statement: ['revenues','expenses','depreciation','interest_expense','ebitda','change_net_assets'],
                        ratios: ['current_ratio','quick_ratio','dcoh_ratio','debt_ratio','total_debt_service_coverage']
                    };
                    post_url = api_rev_url_post;
				    break;
				default: 
				    break;
			}

            var reader = new FileReader();
            reader.onload = (e) => {
                var fileary = [];
                var row_header = [];
                var index_row;
                var fileinput = reader.result;
                var temprow = [];
                var column_data = [];
                var temp_json = {};
                var temp_temp_json = {};
                if (fileinput && fileinput.length > 0 && fileinput != '') {
                    fileary = fileinput.split(/\n/);
                    row_header = fileary[0].split(',');

                    for(index_row = 1; index_row < fileary.length; index_row++) {
                        temprow = fileary[index_row].split(',');
                        temp_json = {};
                        
                        for(var column_index = 0; column_index < columns.length; column_index ++) {
                            var column = columns[column_index];
                            temp_json[column] = [];
                            var temp_each_column = {};
                            temp_temp_json = {};
                            for (var bulk_option_key = 0; bulk_option_key < bulk_options[column].length; bulk_option_key++) {
                                var bulk_option = bulk_options[column][bulk_option_key];
                                temp_temp_json[bulk_option] = (temprow[row_header.indexOf(bulk_option)]) ? temprow[row_header.indexOf(bulk_option)] : 0;
                            }
                            
                            temp_each_column = temp_temp_json;
                            temp_each_column.statementDate = temprow[1];
                            temp_json[column].push(temp_each_column);
                        }
                        temp_json._id = temprow[0];
                        column_data.push(temp_json);
                    }

                    console.log(post_url);
                    console.log(column_data);
                    this.$http.post(post_url, JSON.stringify(column_data), {
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }).then((response) => {
                        console.log(response);
                    }, (response) => {
                        console.log(response);
                    });
                }
            }

            reader.readAsText(selected_file);
		} */
	}
  }
};
</script>

<style lang="css" scoped>

</style>