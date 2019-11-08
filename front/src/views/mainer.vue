<template lang="html">
<div id="main">
  <div id="ctnBar">
    <input type="text" id='searchBar' placeholder="Que recherchez-vous ?" v-model="search"><font-awesome-icon id="logo" size="2x" icon="search"/>
  </div>
  <div>
    <router-view :data="getdata" @connected="changeConnect"/>
  </div>
</div>
</template>

<script>
import { eBus } from '../main.js'
export default {
  data(){
    return {
      search:'',
      dataSearch: '',
      getdata : '',
    }
  },
  created:function () {
    this.searching = this._.debounce(this.doResult, 2000)
  },
  watch: {
    search(newSearch, oldSearch){
        this.dataSearch = newSearch;
        this.searching()
    }
  },
  methods:{
    doResult(){
      let url = `http://localhost:3000/jeu/result/?result=${this.dataSearch}`
      this.axios.get(url,{headers: {'Content-Type': 'application/json'}})
      .then(res=>{
        if (res.data == null) {
          return false;
        }
        this.getdata = res.data
        if (this.$router.currentRoute.path == '/result') {
          return false;
        }else {
          this.$router.push("/result")
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    changeConnect(event){
      console.log(event);
      eBus.$emit('connectChanged', event)
    }
  }
}
</script>

<style lang="css" scoped>

@media screen and (min-width: 1281px) {
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
    transform: translate(0,30px);
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
    height: 100%;
    transform: translate(0,50px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #ctnBar #logo{
    transform: translate(-38px,0);
  }



}

@media screen and (min-width: 1024px) and (max-width: 1280px) {
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
    transform: translate(0,30px);
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
    height: 100%;
    transform: translate(0,50px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #ctnBar #logo{
    transform: translate(-38px,0);
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
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
    transform: translate(0,30px);
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
    height: 100%;
    transform: translate(0,50px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #ctnBar #logo{
    transform: translate(-38px,0);
  }
}

@media screen and (min-width:481px) and (max-width: 768px) {
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
    flex-flow: row;
    justify-content: center;
    align-items: center;
    transform: translate(0,30px);
  }

  #ctnBar input{
    width: 100%;
    height: 80%;
    background: none;
    border: 4px solid black;
    border-radius: 10px;
    font-family: 'Comic Sans MS',sans-serif;
    font-size: 20px;
    color: black;
    font-weight: bold;
    transform: translate(15px,0);
  }

  #ctnBar input::placeholder{
    color: black;
    font-weight: bold;
    transform: translate(5px,0);
  }

  #main div:nth-child(2){
    width: 100%;
    height: 100%;
    transform: translate(0,50px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #ctnBar #logo{
    transform: translate(-26px,0);
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
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
    flex-flow: row;
    justify-content: center;
    align-items: center;
    transform: translate(0,30px);
  }

  #ctnBar input{
    width: 100%;
    height: 80%;
    background: none;
    border: 4px solid black;
    border-radius: 10px;
    font-family: 'Comic Sans MS',sans-serif;
    font-size: 20px;
    color: black;
    font-weight: bold;
    transform: translate(15px,0);
  }

  #ctnBar input::placeholder{
    color: black;
    font-weight: bold;
    transform: translate(5px,0);
  }

  #main div:nth-child(2){
    width: 100%;
    height: 100%;
    transform: translate(0,50px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #ctnBar #logo{
    transform: translate(-26px,0);
  }
}



</style>
