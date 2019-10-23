<template lang="html">
  <div id="jeux">
    <h1>Jeux</h1>
    <button type="button" v-if="ajout == false" name="button" @click="modeAjout">Ajouter un jeu</button>
    <div v-if="ajout == false">
    <div v-for="jeu in jeux" :key="jeux.id">
        <img :src="jeu.images.split(',')[0]" :alt="jeu.images.split(',')[0]" width="250">
        <h3> {{jeu.nom}} </h3>
        <h3> {{jeu.sortie}} </h3>
        <button type="button" name="button">Accéder</button>
        <button type="button" name="button">Supprimer</button>
    </div>
  </div>
  <div v-else>
    <component :is="compAjout"></component>
  </div>
  </div>
</template>

<script>
import ajoutJeu from './ajoutJeu'
export default {
  name:'jeux',
  components:{
    ajoutJeu,
  },
  data(){
    return{
      jeux:'',
      ajout:false,
      compAjout:""
    }
  },
  created:function () {
    this.getJeux();
  },
  methods:{
    getJeux(){
      this.axios.get('http://localhost:3000/jeu/all',{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             this.jeux = res.data
           }).catch(err=>{
             console.log(err);
        })
    },
    modeAjout(e){
      e.preventDefault();
      this.ajout = true;
      this.compAjout = "ajoutJeu"
    }
  }
}
</script>

<style lang="css" scoped>

#jeux{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

#jeux button{
  width: 14%;
  height: 5%;
  background: none;
  border: 1px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}

#jeux div{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

#jeux div div{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
}

#jeux div div button{
  width: 24%;
  height: 20%;
  background: none;
  border: 1px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}


</style>
