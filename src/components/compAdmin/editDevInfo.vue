<template lang="html">
  <div id="editDevInfo">
    <div class="ctn high">
      <h2> {{editDev.nom}} </h2>
      <h2> {{editDev.date ? editDev.date.split('-').reverse().join('/') : ''}} </h2>
      <h2> {{editDev.siege}} </h2>
      <h2> {{editDev.pays_local}} </h2>
    </div>
    <div class="ctn low">
       <h3 v-for="game in games" :key="game.id">{{game.nom}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name:'editDevInfo',
  props:['editDevId'],
  data(){
    return{
      editDev:'',
      games:''
    }
  },
  created:function () {
    this.getEditDevs(this.editDevId);
    this.getGamesbyPlat(this.editDevId);
  },
  methods:{
    getEditDevs(id){
      this.axios.get(`https://videogameweb.osc-fr1.scalingo.io/editDev/one/${id}`,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             this.editDev = res.data
           }).catch(err=>{
             console.log(err);
      })
    },
    getGamesbyPlat(id){
      this.axios.get(`https://videogameweb.osc-fr1.scalingo.io/editDev/game/${id}`,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             this.games = res.data.tbl_jeus
           }).catch(err=>{
             console.log(err);
      })
    }
  }
}
</script>

<style lang="css" scoped>
#editDevInfo{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

#editDevInfo .ctn{
  width: 100%;
  height: 50%;
}

#editDevInfo .high{
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;
}

#editDevInfo .low{
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
}
</style>
