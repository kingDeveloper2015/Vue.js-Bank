<template>
		<div class="rev-main-content">
    <nav class="rev-nav">
      <ul id="credit-rev-links" class="credit-tabs">
        <router-link
           to='rev-search' 
           tag='li' 
           >Search
        </router-link>
        <router-link
           to='rev-description' 
           tag='li' 
           >Description
        </router-link>
        <router-link
           to='rev-ratios' 
           tag='li' 
           >Ratios
        </router-link>
        <router-link
           to='income-statement' 
           tag='li' 
           >Income Statement
        </router-link>
        <router-link 
          to='balance-sheet' 
          tag='li'  
          >Balance Sheet
        </router-link>
        <router-link 
          to='cash-flow' 
          tag='li' 
          >Cash Flow Statement  
        </router-link>     
      </ul>
    </nav>
      <div>
        <router-view name='rev-search'></router-view>
        <router-view name='rev-description'></router-view>
        <router-view name='income-statement'></router-view>
        <router-view name='balance-sheet'></router-view>
        <router-view name='cash-flow'></router-view>
        <router-view name='rev-rating-model'></router-view>
        <router-view name='rev-ratios'></router-view>
      </div>
			
	</div>
</template>

<script>
export default {

  name: 'revMain',

  data () {
    return {

    };
  }
};
</script>

<style lang="css" scoped>
.rev-main-content {
    flex-grow: 1;
    display: grid;
    grid-template-rows: 75px 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: "navbar" "data-tables";
    
}

.rev-nav {
  grid-area: navbar;
  background-color: #BCD0C7;
  display: flex;
  justify-content: space-around;
  border: solid 1px black;
  color: #005a84;
}

.rev-nav ul {
    display: flex;
    list-style-type: none;
    flex-grow: 1;
    justify-content: space-around;
    height: 50%;

}

.rev-nav li {
  flex-grow: 1;
  border: 1px solid black;
  text-align: center; 
  background-color: #E1E2EF;
}

.rev-nav li:hover {
  background-color: #C5DAC1;
}
</style>