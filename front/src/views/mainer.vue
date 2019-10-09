<template lang="html">
<div id="main">
  <div id="ctnBar">
    <input type="text" id='searchBar' placeholder="Que recherchez-vous ?" v-model="resSearch" @keyup.enter="sendSearch(resSearch)"><font-awesome-icon id="logo" size="2x" icon="search"/>
  </div>
  <div>
    <component :result='resSearch' :is='resComp'></component>
  </div>
</div>
</template>

<script>
import { eBus } from '../main'
import Login from '../components/login'
import Inscription from '../components/inscription'
import Result from '../components/result'
export default {
  components:{
    Login,
    Inscription,
    Result
  },
  data(){
    return {
      resComp:'Result',
      resSearch:''
    }
  },
  created:function () {
    eBus.$on('change',(compValue)=>{
      this.resComp = compValue;
    })
  },
  methods:{
    sendSearch(searched){
      this.resSearch = searched;
      // console.log(searched);
      // console.log(this.resSearch);
    }
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
  font-weight: bold;
}

#ctnBar input::placeholder{
  color: black;
  font-weight: bold;
  transform: translate(5px,0);
}

#main div:nth-child(2){
  width: 100%;
  height: 70%;
  transform: translate(0,200px);
  display: flex;
  justify-content: center;
  align-items: center;
}

#ctnBar #logo{
  transform: translate(-38px,0);
}
</style>
