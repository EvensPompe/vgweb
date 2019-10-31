<template lang="html">
<div id="ajoutPlat">
  <form id="platForm">
    <input type="text" placeholder="Entrez le nom de la plateforme" v-model="plat.nom">
    <input type="text" placeholder="Entrez le prix de la plateforme" v-model="plat.prix">
    <input type="text" placeholder="Entrez la compagnie de la plateforme" v-model="plat.edit">
    <input type="date" v-model="plat.lancement">
    <select v-model="plat.type">
      <option>Console de salon</option>
      <option>Console Portable</option>
      <option>Ordinateur</option>
    </select>
    <button type="submit" name="button" @click.prevent="sendPlat">Ajouter</button>
    <button type="button" name="button">Annuler</button>
  </form>
</div>
</template>

<script>
export default {
  name:'ajoutPlat',
  data(){
    return {
      plat:{},
    }
  },
  methods:{
    sendPlat(){
      this.axios.post(`http://localhost:3000/plateforme/add`,this.plat,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             console.log(res.data);
           }).catch(err=>{
             console.log(err);
      })
    }
  }
}
</script>

<style lang="css" scoped>
#ajoutPlat{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

#platForm{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
}

#platForm input::placeholder{
  text-align: center;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
  color: black;
  font-weight: bold;
}

#platForm input,button,select{
  width: 50%;
  height: 8%;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}
</style>
