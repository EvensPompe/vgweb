<template lang="html">
<div id="genreInfo">
  <div class="ctn high">
    <h1>{{genre.type}}</h1>
  </div>
  <div class="ctn low">
   <h2 v-for="game in games.tbl_jeus" :key="game.id">{{game.nom}}</h2>
  </div>
</div>
</template>

<script>
export default {
  name:"genreInfo",
  props:["genreId"],
  data(){
    return {
      genre:'',
      games:''
    }
  },
  created:function () {
    this.getGenre(this.genreId);
    this.getGames(this.genreId);
  },
  methods:{
    getGenre(id){
      this.axios.get(`http://localhost:3000/genre/one/${id}`,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             console.log(res,res.data);
             this.genre = res.data
           }).catch(err=>{
             console.log(err);
        })
    },
    getGames(id){
      this.axios.get(`http://localhost:3000/genre/game/${id}`,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             this.games = res.data
           }).catch(err=>{
             console.log(err);
       })
    }
  }
}
</script>

<style lang="css" scoped>
#genreInfo{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

#genreInfo .ctn{
  width: 100%;
  height: 50%;
}

#genreInfo .high{
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;
}

#genreInfo .low{
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
}
</style>
