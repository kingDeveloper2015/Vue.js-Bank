<template>
	<div class="create" style="display:none">
	    <h1>Create credit</h1>

	    <form v-on:submit.prevent="addProfile">
	        <div class="form-group">
	            <label name="credit_id">select Date</label>
	            <input type="date" class="form-control" v-model="credit.dateOf" id="dateOf" >
	        </div>

	        <div class="form-group">
	            <label name="credit_name">AV</label>
	            <input type="text" class="form-control" v-model="credit.assessed_value" id="AV" >
	        </div>

	        <div class="form-group">
	            <label name="credit_name">FV</label>
	            <input type="text" class="form-control" v-model="credit.full_value" id="FV" >
	        </div>
	        <div class="form-group">
	            <label name="credit_name">TTT</label>
	            <input type="text" class="form-control" v-model="credit.top_ten_taxpayers" id="TTT" >
	        </div>
	        <div class="form-group">
	            <label name="credit_name">TGT</label>
	            <input type="text" class="form-control" v-model="credit.total_go_debt" id="TGT" >
	        </div>
	        <div class="form-group">
	            <label name="credit_name">TRD</label>
	            <input type="text" class="form-control" v-model="credit.total_revenue_debt" id="TRD" >
	        </div>

	        <div class="form-group">
	            <label name="credit_name">TDL</label>
	            <input type="text" class="form-control" v-model="credit.total_debt_limit" id="TDL" >
	        </div>
	        <div class="form-group">
	            <label name="credit_name">TDD</label>
	            <input type="text" class="form-control" v-model="credit.total_direct_debt" id="TDD" >
	        </div>

	        <div class="form-group">
	            <button class="btn btn-primary" >Save</button>
	        </div>
	    </form>
	</div>
</template>

<script>
export default {

  name: 'goInputForm',

  data () {
    return {

    };
  }
};
</script>

<style lang="css" scoped>
</style>