<template>
	  <header class="page-header">

			<div class="header-image">
			  	<figure>
			  		<img src="src/assets/ACG_Logo.jpg">  	
			  	</figure>
			 </div>
			<div class="header-title">
				<h1>Fixed Income Research</h1>  		
			</div>			 	  		

	  </header>
</template>
<script>

	export default {
		name: 'page-header'
	}
	
</script>
<style>

.page-header {
	grid-area             : header;
	background-color      : #c8c6c6;
	color                 : #005a84;

	display               : grid;
	grid-template-columns : 1fr 3fr;
	grid-template-rows    : 1fr;
}

.header-image {
	grid-column-start     : 1;
	grid-column-end       : 2;
	grid-row              : 1;
}

.header-title {
	grid-column-start     : 2;
	grid-column-end       : 3;
	align-self            : center;
	text-align            : center;
}

h1 {
	font-size             : 1.5em;
}
</style>
