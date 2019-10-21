<template lang="html">
  <div id="plat">
    <h1>Plateformes</h1>
    <div>
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
  </div>
</template>

<script>
export default {
  name:'plat',
  data(){
    return{
      plats:''
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

#plat div{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

#plat div div{
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
}

#plat div .plat,.option{
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: column;
}

#plat div .option button{
  width: 50%;
  height: 25%;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}

#plat div .option{
  display: flex;
  justify-content: flex-end;
}
</style>
