<template lang="html">
  <div id="contact">
    <h1>Contact</h1>
    <form id="formCont" v-on:submit.prevent="sendSubmit">
      <div>
        <input type="text" placeholder="Entrez votre nom" name="nom" v-model="contact.nom">
        <input type="text" placeholder="Entrez votre prénom" name="nom" v-model="contact.prenom">
        <input type="email" placeholder="Entrez votre email" name="email" v-model="contact.email">
      </div>
      <div>
        <label for="objet">Objet de la Demande</label>
        <select name="objet" v-model="contact.objet">
          <option>Renseignement</option>
          <option>Demande d'ajout d'un contenu</option>
          <option>Signalement</option>
        </select>
        <textarea name="desc" rows="8" cols="80" v-model="contact.desc" placeholder="Décrivez votre demande"></textarea>
      </div>
      <div>
        <button type="submit">Envoyer</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name:"contact",
  data(){
    return {
      contact: {},
    }
  },
  methods:{
    sendSubmit(){
     this.axios.post("http://localhost:3000/utilisateur/contact",this.contact)
     .then(res=>{
       if (res.data.hasOwnProperty("error")) {
         alert(res.data.error);
       }
       alert(res.data);
       this.$router.push('/');
     }).catch(err=>{
       console.log(err);
     })
    }
  }
}
</script>

<style lang="css" scoped>

@media screen and (min-width:1281px) {
  #contact{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  #formCont{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
  }

  #formCont div:first-child,div:nth-child(2),div:last-child{
    width: 100%;
    height: 34%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #formCont div:first-child input,div:nth-child(2) select, div:last-child button {
    width: 450px;
    height: 40px;
    background: none;
    border: 2px black solid;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #formCont div:first-child input::placeholder,div:nth-child(2) label, textarea::placeholder {
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
    color: black;
  }

  #formCont div:nth-child(2) textarea{
    width: 450px;
    font-family: 'Comic Sans MS',sans-serif;
    color: black;
  }
}

@media screen and (min-width:1024px) and (max-width:1280px) {
  #contact{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  #formCont{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
  }

  #formCont div:first-child,div:nth-child(2),div:last-child{
    width: 100%;
    height: 34%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #formCont div:first-child input,div:nth-child(2) select, div:last-child button {
    width: 450px;
    height: 40px;
    background: none;
    border: 2px black solid;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #formCont div:first-child input::placeholder,div:nth-child(2) label, textarea::placeholder {
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
    color: black;
  }

  #formCont div:nth-child(2) textarea{
    width: 450px;
    font-family: 'Comic Sans MS',sans-serif;
    color: black;
  }
}

@media screen and (min-width:769px) and (max-width:1023px) {
  #contact{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  #formCont{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
  }

  #formCont div:first-child,div:nth-child(2),div:last-child{
    width: 100%;
    height: 34%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #formCont div:first-child input,div:nth-child(2) select, div:last-child button {
    width: 450px;
    height: 40px;
    background: none;
    border: 2px black solid;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #formCont div:first-child input::placeholder,div:nth-child(2) label, textarea::placeholder {
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
    color: black;
  }

  #formCont div:nth-child(2) textarea{
    width: 450px;
    font-family: 'Comic Sans MS',sans-serif;
    color: black;
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
  #contact{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  #formCont{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
  }

  #formCont div:first-child,div:nth-child(2),div:last-child{
    width: 100%;
    height: 34%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #formCont div:first-child input,div:nth-child(2) select, div:last-child button {
    width: 90%;
    height: 40px;
    background: none;
    border: 2px black solid;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #formCont div:first-child input::placeholder,div:nth-child(2) label, textarea::placeholder {
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
    color: black;
  }

  #formCont div:nth-child(2) textarea{
    width: 90%;
    font-family: 'Comic Sans MS',sans-serif;
    color: black;
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
  #contact{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  #formCont{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
  }

  #formCont div:first-child,div:nth-child(2),div:last-child{
    width: 100%;
    height: 34%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #formCont div:first-child input,div:nth-child(2) select, div:last-child button {
    width: 90%;
    height: 40px;
    background: none;
    border: 2px black solid;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #formCont div:first-child input::placeholder,div:nth-child(2) label, textarea::placeholder {
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
    color: black;
  }

  #formCont div:nth-child(2) textarea{
    width: 90%;
    font-family: 'Comic Sans MS',sans-serif;
    color: black;
  }
}

</style>
