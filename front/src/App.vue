<template>
  <div id="app">
    <myHeader/>
    <myMain/>
    <router-view/>
  </div>
</template>

<script>
import myHeader from './views/header'
import myMain from './views/mainer'
  export default {
    components:{
      myHeader,
      myMain
    }
  }
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Comic Sans MS',sans-serif;
}
</style>
