<template>
	<div>
		<h1>Credit Name: {{ credit.creditName }}</h1>
		<h2>Credit ID: {{ credit.creditId }}</h2>
		<h3>Credit State: {{ credit.state }}</h3>

	  <div>
	    <p>Search Criteria for Credit</p>
	  </div>
	</div>
</template>

<script>
export default {

  name: 'revDesc',

  data () {
    return {
    	credit: {
	    	creditName: 'Test name',
	    	creditId: 'Test Id',
	    	state: 'CO'
    	}

    };
  }
};
</script>

<style lang="css" scoped>
</style>