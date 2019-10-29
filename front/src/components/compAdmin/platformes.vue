<template lang="html">
  <div id="plat">
    <h1>Plateformes</h1>
    <button type="button" name="button" v-show="ajout == false" @click="ajouter">Ajouter une plateforme</button>
    <div v-if="ajout == false">
      <div v-for="plat in plats" :key="plats.id">
        <div class="plat">
          <h3> {{plat.nom}} </h3>
          <h3> {{plat.prix}} </h3>
          <h3> {{plat.lancement}} </h3>
          <h3> {{plat.type}} </h3>
        </div>
        <div class="option" :id="plat.id">
          <button type="button" name="button">Accéder</button>
          <button type="button" name="button">Supprimer</button>
        </div>
      </div>
    </div>
    <div v-else>
      <component :platId="idPlat" :is="compSelect"></component>
    </div>
  </div>
</template>

<script>
import ajoutPlat from './ajoutPlat'
export default {
  name:'plat',
  components:{
    ajoutPlat
  },
  data(){
    return{
      plats:'',
      ajout: false,
      compSelect: ''
    }
  },
  created:function () {
    this.getPlats();
  },
  methods:{
    getPlats(){
      this.axios.get('http://localhost:3000/plateforme/all',{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             console.log(res);
             console.log(res.data);
             this.plats = res.data
           }).catch(err=>{
             console.log(err);
        })
    },
    ajouter(e){
      e.preventDefault();
      this.ajout = true;
      console.log(this.ajout);
      this.compSelect = 'ajoutPlat'
      console.log(this.compSelect);
    }
  }
}
</script>

<style lang="css" scoped>

#plat{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

#plat button{
  width: 18%;
  height: 8%;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}

#plat div{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

#plat div div{
  width: 100%;
  height: 25%;
  display: flex;
  flex-flow: row nowrap;
}

#plat div .plat,.option{
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: column;
}

#plat div .plat{
  width: 30%;
}

#plat div .option button{
  width: 50%;
  height: 100%;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}

#plat div .option{
  width: 20%;
  display: flex;
  justify-content: flex-end;
}
</style>
