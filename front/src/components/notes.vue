<template lang="html">
  <div id="notes">
    <div id="highNote">
      <div class="ctn joueur">
        <h1>Joueur</h1>
          <div v-for="note in game.tbl_notes" :key="note.id">
            <h3>{{note.tbl_utilisateur.nom}}</h3>
            <p>{{note.note}}</p>
            <p>{{note.critique}}</p>
          </div>
      </div>
      <div class="ctn presse">
        <h1>Presse</h1>
        <div v-for="note in notePresse" :key="note.id">
          <h3>{{note.tbl_utilisateur.nom}}</h3>
          <p>{{note.note}}</p>
          <p>{{note.critique}}</p>
        </div>
      </div>
    </div>
    <div id="lowNote" v-show="this.$session.get('jwt')">
      <form v-on:submit="sendSubmit">
        <input type="number" min="1" max="10" v-model="note">
        <textarea name="name" rows="8" cols="80" v-model="critique"></textarea>
        <button type="submit" name="button">ENVOYER</button>
      </form>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name:"fiche",
  props:["game"],
  data(){
    return{
      note: '',
      critique: '',
      notePresse: ''
    }
  },
  created:function () {
    for (var note of this.game.tbl_notes) {
      if (note.tbl_utilisateur.role == 'admin' || note.tbl_utilisateur.role == 'joueur') {
        this.note = note;
      } else if (note.tbl_utilisateur.role == 'presse') {
        this.notePresse = note;
      }
    }
  },
  methods:{
    sendSubmit(e) {
      e.preventDefault();
      this.axios.post("http://localhost:3000/note/new",{note:this.note,critique:this.critique,fk_jeu:this.game.id,fk_utilisateur:VueJwtDecode.decode(this.$session.get('jwt')).id},{headers:{
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
#notes{
   width: 100%;
   height: 100%;
   display: flex;
   flex-flow: column;
}

#notes #highNote{
  width: 100%;
  height: 80%;
  display: flex;
}

.ctn h1{
  text-align: center;
}

#notes .presse,.joueur{
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  overflow: auto;
}

#notes .ctn div{
  width: 100%;
  height: 22%;
  display: flex;
  flex-flow: column;
  align-items: center;
}

#lowNote {
  width: 100%;
  height: 20%;
  display: flex;
}

#lowNote form{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#lowNote form textarea{
  width: 70%;
  height: 80%;
  font-size: 24px;
  border: 2px white solid;
  border-radius: 10px;
}

#lowNote form input{
  width: 125px;
  height: 30px;
  font-size: 24px;
  background: none;
  border: 2px white solid;
  color: white;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
}

#lowNote form button{
  width: 125px;
  height: 40px;
  font-size: 24px;
  background: none;
  border: 2px white solid;
  color: white;
  border-radius: 15px;
  text-decoration: none;
  text-align: center;
}

</style>
