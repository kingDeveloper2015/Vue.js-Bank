<template>
	<div class="go-main-content">
    <nav class="go-nav">
      <ul id="credit-go-links" class="credit-tabs">
        <router-link
           to='go-search' 
           tag='li' 
           >Search
        </router-link>
        <router-link
           to='go-description' 
           tag='li' 
           >Description
        </router-link>
        <router-link
           to='socio-economics' 
           tag='li' 
           >Ratios
        </router-link>
        <router-link 
          to='debt-profile' 
          tag='li'  
          >Debt Profile   
        </router-link>
        <router-link 
          to='general-fund' 
          tag='li' 
          >General Fund   
        </router-link>
        <router-link 
          to='govt-act' 
          tag='li' 
          >Govt Activities       
        </router-link>
        <router-link 
          to='net-position' 
          tag='li' 
          >Net Position   
        </router-link>   
      </ul>
    </nav>
      <div>
        <router-view name='go-search'></router-view>
        <router-view name='go-description'></router-view>
        <router-view name='socio-economics'></router-view>
        <router-view name='debt-profile'></router-view>
        <router-view name='general-fund'></router-view>
        <router-view name='govt-act'></router-view>
        <router-view name='net-position'></router-view>
        <router-view name='go-rating-model'></router-view>
      </div>
			
	</div>
</template>

<script>


export default {

  name: 'goMain',
  data () {
    return {

    };
  }
};
</script>

<style>
.go-main-content {
    flex-grow: 1;
    display: grid;
    grid-template-rows: 75px 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: "navbar" "data-tables";
    
}

.go-nav {
  grid-area: "navbar";
  background-color: #BCD0C7;
  display: flex;
  justify-content: space-around;
  border: solid 1px black;
  color: #005a84;
}

.go-nav ul {
    display: flex;
    list-style-type: none;
    flex-grow: 1;
    justify-content: space-around;
    height: 50%;

}

.go-nav li {
  flex-grow: 1;
  border: 1px solid black;
  text-align: center; 
  background-color: #E1E2EF;
}

.go-nav li:hover {
  background-color: #C5DAC1;
}
</style>