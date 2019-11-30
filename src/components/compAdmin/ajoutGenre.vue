<template lang="html">
  <div id="ajoutGenre">
  <form id="genreForm">
    <input type="text" placeholder="Entrez votre type" v-model="type">
    <button type="submit" name="button" @click.prevent="sendGenre">Ajouter</button>
    <button type="button" name="button" @click="cancel">Annuler</button>
  </form>
  </div>
</template>

<script>
export default {
  name:'ajoutGenre',
  data(){
    return{
      type:'',
    }
  },
  methods:{
    sendGenre(){
      this.axios.post(`https://videogameweb.osc-fr1.scalingo.io/genre/add`,{type:this.type},{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
        .then(res=>{
          alert('Genre ajouté');
        }).catch(err=>{
          console.log(err);
        })
    },
    cancel(e) {
      e.preventDefault();
      let back = false;
      this.$emit('retour', back);
    }
  }
}
</script>

<style lang="css" scoped>
#ajoutGenre{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

#genreForm{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
}

#genreForm input::placeholder{
  text-align: center;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}

#genreForm input,button{
  width: 80%;
  height: 10%;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}
</style>
