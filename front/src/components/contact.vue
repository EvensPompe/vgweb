<template lang="html">
  <div id="contact">
    <form id="formCont" v-on:submit="sendSubmit">
      <div>
        <input type="text" placeholder="Entrez votre nom" name="nom" v-model="nom">
        <input type="text" placeholder="Entrez votre prénom" name="nom" v-model="prenom">
        <input type="email" placeholder="Entrez votre email" name="email" v-model="email">
      </div>
      <div>
        <label for="objet">Objet de la Demande</label>
        <select name="objet">
          <option>Renseignement</option>
          <option>Demande d'ajout d'un contenu (Jeu, genre, éditeur, développeur,...)</option>
          <option>Signalement</option>
        </select>
        <textarea name="desc" rows="8" cols="80" v-model="desc" placeholder="Décrivez votre demande"></textarea>
      </div>
      <div>
        <button type="submit">Inscription</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name:"contact",
  data(){
    return {
      nom:'',
      prenom:'',
      email:'',
    }
  }
}
</script>

<style lang="css" scoped>
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

</style>
