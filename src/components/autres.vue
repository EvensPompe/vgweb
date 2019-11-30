<template lang="html">
  <div id="autres">
    <div class="ctnAutres" v-for="games in hazard" :key="games.id">
      <h1>{{games.type}}</h1>
    <div v-if="game.nom != jeu.nom" v-for="jeu in games.tbl_jeus" :key="jeu.id">
      <img :src="jeu.images.split(',')[0]" :alt="jeu.images.split(',')[0]">
      <h1>{{jeu.nom}}</h1>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'gameplay',
  props:["game"],
  data(){
    return{
      genres:[],
      hazard:''
    }
  },
 created:function () {
   this.getGamesByHazard()
 },
 methods:{
   getGamesByHazard(){
     for (let genre of this.game.tbl_genres) {
       this.genres.push(genre.type)
     }
     this.axios.post('https://videogameweb.osc-fr1.scalingo.io/genre/hazardGames',{genres:this.genres})
     .then(res=>{
       this.hazard = res.data;
     }).catch(err=>{
       console.log(err);
     })
   }
 }
}
</script>

<style lang="css" scoped>

#autres .ctnAutres h1{
  text-align: center;
}

@media screen and (min-width:1281px) {
  #autres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
    overflow: auto;
  }

  #autres .ctnAutres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  #autres .ctnAutres div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
  }

  #autres .ctnAutres div img{
    width: 35%;
  }
}

@media screen and (min-width:1024px) and (max-width:1280px) {
  #autres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
    overflow: auto;
  }

  #autres .ctnAutres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  #autres .ctnAutres div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
  }

  #autres .ctnAutres div img{
    width: 35%;
  }
}

@media screen and (min-width:769px) and (max-width:1023px) {
  #autres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
    overflow: auto;
  }

  #autres .ctnAutres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  #autres .ctnAutres div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
  }

  #autres .ctnAutres div img{
    width: 50%;
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
  #autres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    overflow: auto;
  }

  #autres .ctnAutres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  #autres .ctnAutres div{
    width: 100%;
    height: 35%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
  }

  #autres .ctnAutres div img{
    width: 50%;
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
  #autres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    overflow: auto;
  }

  #autres .ctnAutres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  #autres .ctnAutres div{
    width: 100%;
    height: 35%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
  }

  #autres .ctnAutres div img{
    width: 75%;
  }
}
</style>
