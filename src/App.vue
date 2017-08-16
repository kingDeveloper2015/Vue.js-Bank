<template>
  <div id="app" class="page-layout">
      <page-header></page-header>
      <page-sidebar></page-sidebar>
      <page-main></page-main>
      <page-footer></page-footer>
  </div>
</template>

<script>

window.go_financial_data = {};
window.go_financial_data_rev = {};
window.api_go_url = "https://089balkyh6.execute-api.us-east-2.amazonaws.com/prod/gocredits";
window.api_go_url_post = "https://089balkyh6.execute-api.us-east-2.amazonaws.com/prod/gocredits-post";
window.api_rev_url = "https://089balkyh6.execute-api.us-east-2.amazonaws.com/prod/revcredits";
window.api_rev_url_post = "https://089balkyh6.execute-api.us-east-2.amazonaws.com/prod/revcredits-post";

window.api_go_search_url = "https://089balkyh6.execute-api.us-east-2.amazonaws.com/prod/search-post";

import PageHeader from './components/layout/Header.vue'
import PageFooter from './components/layout/Footer.vue'

import Sidebar from './components/layout/Sidebar.vue'
import  Dashboard from './components/layout/Dashboard.vue';




export default {
    name: 'app',
    components: {
        'page-header': PageHeader,
        'page-sidebar': Sidebar,
        'page-main': Dashboard,
        'page-footer': PageFooter
    },
    mounted () {
        this.fetchProductData()
    },
    methods: {
        fetchProductData: function() {
			var lambda = new AWS.Lambda({
                region: 'us-east-1',
                accessKeyId : 'AKIAISHSYMCYRPSKP2TQ',
                secretAccessKey : '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'
            });
			var pullParams = {
                FunctionName : 'get_all',
                InvocationType: 'RequestResponse',
                LogType: 'None'
            };
            var pullResults;
			var $this = this;
            lambda.invoke(pullParams, function(error,data) {
                if ( error) {
                    alert( error );
                } else {
                    pullResults = JSON.parse(data.Payload);
                    console.log(pullResults);
					$this.$root.$data.all_data = pullResults;
					
                }
            });
        },
    }
}
</script>

<style>

.page-layout {
    display: grid;
    height: 100vh;
    width: 100vw;
    color: #717274;
    font-family: Arial, Helvetica, sans-serif;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 1fr 6fr 1fr;
    grid-template-areas: 
    "header header"
    "sidebar main-content"
    "footer footer"
}

.text-center {
    text-align: center;
}

.divider {
    border: 1px dotted #25847b;
}
</style>
