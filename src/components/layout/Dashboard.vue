<template>
	<div class="main-content">

		<router-view name='credit-data'></router-view>
		<router-view name='credit-go'></router-view>
		<router-view name='credit-revenue'></router-view>

	</div>
</template>

<script>
export default {

  name: 'Dashboard',

  data () {
    return {

    };
  }
};
</script>

<style>
.main-content {
	display: flex;
	width: 100%;
	height: 100%;
}
</style>