<template lang="html">
<div id="main">
  <div id="ctnBar">
    <input type="text" id='searchBar' placeholder="Que recherchez-vous ?"><font-awesome-icon size="2x" icon="search"/>
  </div>
  <div>
    <component :is='resComp'></component>
  </div>
</div>
</template>

<script>
import { eBus } from '../main'
import Login from '../components/login'
import Inscription from '../components/inscription'
export default {
  components:{
    Login,
    Inscription
  },
  data(){
    return {
      resComp:''
    }
  },
  created:function () {
    eBus.$on('change',(compValue)=>{
      this.resComp = compValue;
    })
  }
}
</script>

<style lang="css" scoped>

#main{
  width: 100%;
  height: 1025px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background: grey;
}

#ctnBar{
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(0,77px);
}

#ctnBar input{
  width: 720px;
  height: 80%;
  background: none;
  border: 4px solid black;
  border-radius: 10px;
  font-family: 'Comic Sans MS',sans-serif;
  font-size: 20px;
  color: black;
}

#ctnBar input::placeholder{
  color: black;
}

#main div:nth-child(2){
  width: 100%;
  height: 70%;
  background: orange;
  transform: translate(0,200px);
}

#ctnBar font-awesome-icon{
  border: 4px black solid;
}
</style>
