<template lang="html">
  <div id="plat">
    <h1>Plateformes</h1>
    <button type="button" name="button" v-show="ajout == false" @click="ajouter">Ajouter/modifier</button>
    <div v-if="ajout == false">
      <div v-for="plat in plats" :key="plats.id">
        <div class="plat">
          <h3> {{plat.nom}} </h3>
        </div>
        <div class="option" :id="plat.id">
          <button type="button" name="button" @click.prevent="acc(plat.id)">Accéder</button>
          <button type="button" name="button" @click.prevent="sup(plat.id)">Supprimer</button>
        </div>
      </div>
    </div>
    <div v-else>
      <component :platId="idPlat" @retour="back" :is="compSelect"></component>
    </div>
  </div>
</template>

<script>
import ajoutPlat from './ajoutPlat'
import platInfo from './platInfo'
export default {
  name:'plat',
  components:{
    ajoutPlat,
    platInfo
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
    },
    acc(id){
      this.idPlat = id;
      this.ajout = true;
      this.compSelect = 'platInfo'
    },
    sup(id){
      this.axios.delete(`http://localhost:3000/plateforme/delete/${id}`,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
        .then(res=>{
          console.log(res);
        }).catch(err=>{
          console.log(err);
      })
    },
    back(event){
      this.ajout = event;
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
  overflow: auto;
}

#plat button{
  width: 170px;
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
  height: 100%;
  display: flex;
  flex-flow: column wrap;
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
  width: 100px;
  height: 30px;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
  margin-left: 4px;
}

#plat div .option{
  width: 30%;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}
</style>
