<template lang="html">
  <div id="notes">
    <div id="highNote">
      <div class="ctn joueur">
        <h1>Joueur</h1>
          <div v-show="note.tbl_utilisateur.role == 'joueur'" v-for="note in game.tbl_notes" :key="note.id">
            <h3>{{note.tbl_utilisateur.nom}}</h3>
            <p>{{note.note}}/10</p>
            <p>{{note.critique}}</p>
          </div>
      </div>
      <div class="ctn presse">
        <h1>Presse</h1>
        <div v-show="note.tbl_utilisateur.role == 'presse'" v-for="note in game.tbl_notes" :key="note.id">
          <h3>{{note.tbl_utilisateur.nom}}</h3>
          <p>{{note.note}}/10</p>
          <p>{{note.critique}}</p>
        </div>
      </div>
    </div>
    <div id="lowNote" v-show="this.$session.get('jwt')">
      <form v-on:submit="sendSubmit">
        <div class="note">
         <label for="note">Note sur 10</label>
         <input name="note" type="number" min="1" max="10" v-model="note">
        </div>
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
  methods:{
    sendSubmit(e) {
      e.preventDefault();
      this.axios.post("https://videogameweb.osc-fr1.scalingo.io/note/new",{note:this.note,critique:this.critique,fk_jeu:this.game.id,fk_utilisateur:VueJwtDecode.decode(this.$session.get('jwt')).id},{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
      .then(res=>{
        if (res.data.hasOwnProperty("note")) {
          alert("Note ajouté !")
        }else {
          alert(res.data)
        }
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css" scoped>

@media screen and (min-width:1281px) {
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
    justify-content: space-evenly;
  }

  #lowNote form textarea{
    width: 70%;
    height: 80%;
    font-size: 24px;
    border: 2px white solid;
    border-radius: 10px;
  }

  #lowNote form input{
    width: 90%;
    height: 30px;
    font-size: 24px;
    background: none;
    border: 2px white solid;
    color: white;
    border-radius: 5px;
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
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
  }

  #lowNote div{
    width: 10%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-evenly;
  }
}

@media screen and (min-width:1024px) and (max-width:1280px) {
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
    justify-content: space-evenly;
  }

  #lowNote form textarea{
    width: 70%;
    height: 80%;
    font-size: 24px;
    border: 2px white solid;
    border-radius: 10px;
  }

  #lowNote form input{
    width: 90%;
    height: 30px;
    font-size: 24px;
    background: none;
    border: 2px white solid;
    color: white;
    border-radius: 5px;
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
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
  }

  #lowNote div{
    width: 10%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-evenly;
  }
}

@media screen and (min-width:769px) and (max-width:1023px) {
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
    justify-content: space-evenly;
  }

  #lowNote form textarea{
    width: 70%;
    height: 80%;
    font-size: 24px;
    border: 2px white solid;
    border-radius: 10px;
  }

  #lowNote form input{
    width: 90%;
    height: 30px;
    font-size: 24px;
    background: none;
    border: 2px white solid;
    color: white;
    border-radius: 5px;
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
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
  }

  #lowNote div{
    width: 10%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-evenly;
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
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
    flex-flow: column;
  }

  .ctn h1{
    text-align: center;
  }

  #notes .presse,.joueur{
    width: 100%;
    height: 50%;
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
    justify-content: space-evenly;
  }

  #lowNote form textarea{
    width: 70%;
    height: 80%;
    font-size: 24px;
    border: 2px white solid;
    border-radius: 10px;
  }

  #lowNote form input{
    width: 85%;
    height: 30px;
    font-size: 24px;
    background: none;
    border: 2px white solid;
    color: white;
    border-radius: 5px;
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
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
  }
  #lowNote div{
    width: 10%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-evenly;
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
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
    flex-flow: column;
  }

  .ctn h1{
    text-align: center;
  }

  #notes .presse,.joueur{
    width: 100%;
    height: 50%;
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
    flex-flow: column;
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
    width: 90%;
    height: 30px;
    font-size: 24px;
    background: none;
    border: 2px white solid;
    color: white;
    border-radius: 5px;
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
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
  }

  #lowNote div{
    width: 30%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
