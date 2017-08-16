<template>
  <nav class="page-sidebar">
    <ul class="vertical-menu-list">

      <router-link 
          :to="{ name: 'credit-data'}" 
          tag='li' 
          active-class='active' 
          exact
          class="menu-item"
          >Data &amp; Reports         
      </router-link>

      <router-link 
          :to="{ name: 'go-search'}" 
          tag='li' 
          active-class='active'
          exact
          class="menu-item" 
          >GO Credits
      </router-link>

      <router-link 
          :to="{ name: 'rev-search'}"
          tag='li' 
          active-class='active' 
          exact
          class="menu-item" 
          >Revenue Credits   
      </router-link>

    </ul>
  </nav>  
</template>
<script>
export default {
  name           : 'page-sidebar' 
}
</script>
<style>

.page-sidebar {
  grid-area        : sidebar;
  background-color : #93A392;
  color            : #005a84;
  display: grid;
  grid-template-rows: 50px 1fr 50px;
  grid-template-areas: "side-top" "side-middle" "side-bottom"
}



.vertical-menu-list {
    grid-area: side-middle;
    list-style: none;
    width: 90%;
    height: 50%;
    margin: 0;
    padding: 0;
    margin-left: 5%;
    background-color: #f1f1f1;

}

.menu-item {
    display: block;
    color: black;
    border-bottom: 1px solid #222;
    line-height: 2em;
    padding: 8px 16px;
}

.menu-item:hover {
    background-color: #555;
    color: white;
}
</style>
