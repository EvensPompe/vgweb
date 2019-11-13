<template lang="html">
<div id="platInfo">
  <div class="ctn high">
     <h2>{{plat.nom}}</h2>
     <h3>{{plat.prix}}</h3>
     <h3>{{plat.lancement}}</h3>
     <h3>{{plat.type}}</h3>
  </div>
  <div class="ctn low">
    <h2 v-for="game in games" :key="game.id">{{game.nom}}</h2>
  </div>
</div>
</template>

<script>
export default {
  name:'platInfo',
  props:['platId'],
  data(){
    return{
     plat:'',
     games:''
    }
  },
  created:function () {
    this.getPlat(this.platId);
    this.getGamesbyPlat(this.platId)
  },
  methods:{
    getPlat(id){
      console.log(id);
      this.axios.get(`http://localhost:3000/plateforme/one/${id}`,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             this.plat = res.data
           }).catch(err=>{
             console.log(err);
      })
    },
    getGamesbyPlat(id){
      this.axios.get(`http://localhost:3000/plateforme/game/${id}`,{headers:{
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
#platInfo{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

#platInfo .ctn{
  width: 100%;
  height: 50%;
}

#platInfo .high{
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;
}

#platInfo .low{
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
}
</style>
