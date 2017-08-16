<template>
	<div class="main-data-reports">

			<reports class="reports-data"></reports>


			<upload-data></upload-data>
	</div>
</template>

<script>
import Reports from './createReports.vue'
import UploadData from './uploadData.vue'
export default {

  name: 'mainDataReports',
  components: {
  		'reports': Reports,
  		'upload-data': UploadData
  },

  data () {
    return {

    }
  }
};
</script>

<style lang="css" scoped>
.main-data-reports {
	flex-grow: 1;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr;
	grid-areas: "left-col" "right-col";
}

.reports-data {
	grid-area: "left-col";
	background-color: #BCD0C7;
}

.upload-data {
	grid-area: "right-col";
	background-color: red;
}
</style>