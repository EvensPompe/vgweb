<template>
  <div id="app">
    <myHeader/>
    <myMain/>
    <hr>
    <myFooter/>
  </div>
</template>

<script>
import myHeader from './views/header'
import myMain from './views/mainer'
import myFooter from './views/footer'
  export default {
    components:{
      myHeader,
      myMain,
      myFooter
    }
  }
</script>

<style>
*{
  margin: 0;
  padding: 0;
  font-family: 'Comic Sans MS',sans-serif;
}
#app {
  font-family: 'Comic Sans MS',sans-serif;
}

#app hr{
  width: 70%;
  height: 2px;
  background: black;
  color: black;
  margin: 0 auto;
}
</style>
