<template lang="html">
  <div id="jeux">
    <h1>Jeux</h1>
    <button type="button" v-if="ajout == false" name="button" @click="modeAjout">Ajouter/modifier</button>
    <div v-if="ajout == false">
      <div class="ctnJeu">
        <div v-for="jeu in jeux" :key="jeux.id">
            <h3> {{jeu.nom}} </h3>
            <button type="button" name="button" :id="jeu.id" @click.prevent="acc(jeu.id)">Accéder</button>
            <button type="button" name="button" :id="jeu.id" @click.prevent="sup(jeu.id)">Supprimer</button>
        </div>
      </div>
  </div>
  <div v-else>
    <component :gameId="idJeu" @retour="back" :is="compAjout"></component>
  </div>
  </div>
</template>

<script>
import ajoutJeu from './ajoutJeu'
import jeuInfo from './jeuInfo'
export default {
  name:'jeux',
  components:{
    ajoutJeu,
    jeuInfo
  },
  data(){
    return{
      jeux:'',
      ajout:false,
      compAjout:"",
      idJeu:""
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
             console.log(res.data)
             this.jeux = res.data
           }).catch(err=>{
             console.log(err);
        })
    },
    modeAjout(e){
      e.preventDefault();
      this.ajout = true;
      this.compAjout = "ajoutJeu"
    },
    acc(jeu){
      this.ajout = true;
      this.idJeu = jeu;
      this.compAjout = "jeuInfo"
    },
    sup(jeu){
      this.axios.delete(`http://localhost:3000/jeu/delete/${jeu}`,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
        .then(res=>{
          console.log(res);
        }).catch(err=>{
          console.log(err);
        })
    },
    back(){
      this.ajout = false;
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
  width: 18%;
  height: 8%;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}

#jeux div{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  overflow: auto;
}

#jeux div div{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
}

#jeux div div button{
  width: 10%;
  height: 30px;
  background: none;
  border: 1px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}


</style>
