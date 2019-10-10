<template lang="html">
<div id="main">
  <div id="ctnBar">
    <input type="text" id='searchBar' placeholder="Que recherchez-vous ?" v-model="search" v-on:input="searching()"><font-awesome-icon id="logo" size="2x" icon="search"/>
  </div>
  <div>
    <component :result='search' :is='resComp'></component>
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
      search:'',
      dataSearch: ''
    }
  },
  created:function () {
    eBus.$on('change',(compValue)=>{
      this.resComp = compValue;
    })
    this.searching();
  },
  watch: {
    search(newSearch, oldSearch){
      if (newSearch != '' || newSearch != undefined) {
        this.dataSearch = newSearch;
        console.log(this.dataSearch);
         console.log(newSearch);
      }else {
        console.log('Champ vide');
      }
    }
  },
  methods:{
    doResult(){
      let url = `http://localhost:3000/jeu/result/?result=${this.dataSearch}`
      this.axios.get(url)
      .then(res=>{
        console.log(res);
      })
    },
    watchSearch(){
      setTimeout(()=>{this.doResult()}, 3000);
    },
    searching(){
      if (this.dataSearch <= 3) {
       this.watchSearch()
     }else {
       console.log('Attends !');
     }
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
