<template lang="html">
<div id="ajoutEditDev">
  <form id="formEditDev">
    <input type="text" placeholder="Entrez le nom de l'éditeur ou développeur" v-model="editDev.nom">
    <input type="date" v-model="editDev.date">
    <input type="text" placeholder="Entrez le siège" v-model="editDev.siege">
    <input type="text" placeholder="Entrez le pays local de l'éditeur ou développeur" v-model="editDev.pays_local">
    <div>
      <label for="">Développeur ?</label>
      <input type="checkbox" placeholder="Entrez votre type" v-model="editDev.dev">
    </div>
    <textarea rows="8" cols="80" placeholder="description de l'éditeur ou développeur" v-model="editDev.description"></textarea>
    <button type="submit" name="button" @click.prevent="sendEditDev">Ajouter</button>
    <button type="button" name="button" @click="cancel">Annuler</button>
  </form>
</div>
</template>

<script>
export default {
  name:'ajoutEditDev',
  data(){
    return {
      editDev:{}
    }
  },
  methods:{
    sendEditDev(){
      this.axios.post(`http://51.91.156.10:3000/editDev/add`,this.editDev,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             alert("éditeur ou développeur ajouté");
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
#ajoutEditDev{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

#formEditDev{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
}

#formEditDev input::placeholder,textarea::placeholder{
  text-align: center;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
  color: black;
}

#formEditDev input,button,textarea{
  width: 80%;
  height: 10%;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}

#formEditDev div{
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#formEditDev div input{
  width: 10%;
  height: 80%;
}

#formEditDev div label{
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}

</style>
