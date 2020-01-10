<template lang="html">
  <div>
    <div id="AjoutJeu">
    <div class="ctn">
      <div class="part images">
          <Carousel :autoplay="true" :paginationEnabled="false" :per-page="3">
           <Slide v-for="img in this.imgs" :key="imgs.id">
           <img :src="img" :alt="img" width="60%">
           </Slide>
         </Carousel>
       <input type="text" placeholder="lien de l'image" v-model="imgInput">
       <button type="button" name="button" @click.prevent="ajoutImg(imgInput)">Ajouter</button>
      </div>
      <div class="part articles">
        <Carousel :autoplay="true" :paginationEnabled="false" :per-page="1">
         <Slide v-for="art in this.arts" :key="art.id">
         <h4>{{art.titre}}</h4>
         <p>{{art.text}}<a :href="art.lien" target="_blank">En savoir plus</a>|<a :href="art.img">Image</a></p>
         </Slide>
       </Carousel>
        <input type="text" placeholder="Titre de l'article" v-model="art.titre">
        <input type="text" placeholder="Image de l'article" v-model="art.img">
        <input type="text" placeholder="lien de l'article" v-model="art.lien">
        <textarea placeholder="Contenu de l'article" v-model="art.text" rows="8" cols="80"></textarea>
        <button type="button" name="button" @click.prevent="ajoutArt()">Ajouter</button>
      </div>
      <div class="part videos">
        <Carousel :per-page="1">
          <Slide v-for="video in this.video" :key="video.id">
            <a :href="video" target="_blank">{{video}}</a>
          </Slide>
        </Carousel>
        <input type="text" placeholder="lien de la vidéo" v-model="videoInput">
        <button type="button" name="button" @click.prevent="ajoutVideo(videoInput)">Ajouter</button>
      </div>
    </div>
    <div class="ctn">
      <div class="sousCtn">
          <button type="button" name="button" @click="ajouter">Enregistrer</button>
          <button type="button" name="button" @click="cancel">Annuler</button>
      </div>
      <div class="sousCtn">
        <input type="text" name="nom" placeholder="Nom du jeu" v-model="jeu.nom">
        <input type="text" name="editeur" placeholder="Nom de l'éditeur" v-model="jeu.editeur">
        <input type="text" name="developpeur" placeholder="Nom du développeur" v-model="jeu.developpeur">
        <input type="text" name="genre" placeholder="Genre" v-model="jeu.genre">
        <input type="text" name="plateforme" placeholder="plateforme" v-model="jeu.plateforme">
        <input type="date" name="sortie" placeholder="Date de sortie" v-model="jeu.sortie">
      </div>
      <div class="sousCtn">
        <textarea name="name" rows="8" cols="80" placeholder="Synopsis" v-model="jeu.synopsis"></textarea>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  Carousel,
  Slide
} from 'vue-carousel'
export default {
  name: 'ajoutJeu',
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      jeu: {},
      imgInput: "",
      artInput: "",
      videoInput: "",
      imgs: [],
      art: {},
      arts: [],
      video: [],
      result: false
    }
  },
  methods: {
    ajouter(e) {
      e.preventDefault();
      this.axios.post('http://51.91.156.10:3000/jeu/add', this.jeu, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`
          }
        })
        .then(res => {
          if (res.data.hasOwnProperty("nom")) {
            alert(`${res.data.nom} vient d'être crée ou d'être modifié !`)
          } else {
            alert(`Le jeu vient d'être crée ou d'être modifié !`)
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    ajoutImg(imgInput) {
      this.imgs.push(imgInput)
      this.jeu.img = this.imgs.join(',');
      this.imgInput = "";
    },
    ajoutArt() {
      let article = {
        img: this.art.img,
        titre: this.art.titre,
        lien: this.art.lien,
        text: this.art.text
      };
      this.arts.push(article);
      this.jeu.article = this.arts;
    },
    ajoutVideo(videoInput) {
      this.video.push(videoInput)
      this.jeu.video = this.video.join(',');
      this.videoInput = "";
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

@media screen and (min-width:1281px) {
  #AjoutJeu{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #AjoutJeu .ctn{
    width: 50%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
  }

  #AjoutJeu .ctn:first-child .part,#AjoutJeu .ctn:nth-child(2) .sousCtn{
    width: 100%;
    height: 30%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
  }

  #AjoutJeu .ctn:first-child input,#AjoutJeu .ctn:nth-child(2) .sousCtn input{
    width: 90%;
    height: 30px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 16px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #AjoutJeu .ctn:first-child button{
    width: 100px;
    height: 20px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 12px;
    font-family: 'Comic Sans MS',sans-serif;
    margin: 0 auto;
  }

  #AjoutJeu .ctn:first-child .articles{
    height: 40%;
  }

  #AjoutJeu .ctn:first-child .articles p{
    font-size: 10px;
  }
  #AjoutJeu .ctn:first-child .articles textarea, #AjoutJeu .ctn:nth-child(2) .sousCtn textarea{
    height: 20%;
    width: 90%;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn textarea{
    height: 50%;
  }

  #AjoutJeu .ctn:first-child .articles textarea::placeholder,
  #AjoutJeu .ctn:first-child input::placeholder,
  #AjoutJeu .ctn:nth-child(2) input::placeholder,
  #AjoutJeu .ctn:nth-child(2) textarea::placeholder{
    color: black;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:nth-child(2){
    justify-content: space-evenly;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:first-child{
    height: 20%;
    justify-content: space-evenly;
    flex-flow: row;
    align-items: center;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:first-child button{
    width: 100px;
    height:30px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 12px;
    font-family: 'Comic Sans MS',sans-serif;
  }
}

@media screen and (min-width:1024px) and (max-width:1280px) {
  #AjoutJeu{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #AjoutJeu .ctn{
    width: 50%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
  }

  #AjoutJeu .ctn:first-child .part,#AjoutJeu .ctn:nth-child(2) .sousCtn{
    width: 100%;
    height: 30%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
  }

  #AjoutJeu .ctn:first-child input,#AjoutJeu .ctn:nth-child(2) .sousCtn input{
    width: 90%;
    height: 30px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 16px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #AjoutJeu .ctn:first-child button{
    width: 100px;
    height: 20px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 12px;
    font-family: 'Comic Sans MS',sans-serif;
    margin: 0 auto;
  }

  #AjoutJeu .ctn:first-child .articles{
    height: 40%;
  }

  #AjoutJeu .ctn:first-child .articles p{
    font-size: 10px;
  }
  #AjoutJeu .ctn:first-child .articles textarea, #AjoutJeu .ctn:nth-child(2) .sousCtn textarea{
    height: 20%;
    width: 90%;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn textarea{
    height: 50%;
  }

  #AjoutJeu .ctn:first-child .articles textarea::placeholder,
  #AjoutJeu .ctn:first-child input::placeholder,
  #AjoutJeu .ctn:nth-child(2) input::placeholder,
  #AjoutJeu .ctn:nth-child(2) textarea::placeholder{
    color: black;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:nth-child(2){
    justify-content: space-evenly;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:first-child{
    height: 20%;
    justify-content: space-evenly;
    flex-flow: row;
    align-items: center;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:first-child button{
    width: 100px;
    height:30px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 12px;
    font-family: 'Comic Sans MS',sans-serif;
  }
}

@media screen and (min-width:769px) and (max-width:1023px) {
  #AjoutJeu{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #AjoutJeu .ctn{
    width: 50%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
  }

  #AjoutJeu .ctn:first-child .part,#AjoutJeu .ctn:nth-child(2) .sousCtn{
    width: 100%;
    height: 30%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
  }

  #AjoutJeu .ctn:first-child input,#AjoutJeu .ctn:nth-child(2) .sousCtn input{
    width: 90%;
    height: 30px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 16px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #AjoutJeu .ctn:first-child button{
    width: 100px;
    height: 20px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 12px;
    font-family: 'Comic Sans MS',sans-serif;
    margin: 0 auto;
  }

  #AjoutJeu .ctn:first-child .articles{
    height: 40%;
  }

  #AjoutJeu .ctn:first-child .articles p{
    font-size: 10px;
  }
  #AjoutJeu .ctn:first-child .articles textarea, #AjoutJeu .ctn:nth-child(2) .sousCtn textarea{
    height: 20%;
    width: 90%;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn textarea{
    height: 50%;
  }

  #AjoutJeu .ctn:first-child .articles textarea::placeholder,
  #AjoutJeu .ctn:first-child input::placeholder,
  #AjoutJeu .ctn:nth-child(2) input::placeholder,
  #AjoutJeu .ctn:nth-child(2) textarea::placeholder{
    color: black;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:nth-child(2){
    justify-content: space-evenly;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:first-child{
    height: 20%;
    justify-content: space-evenly;
    flex-flow: row;
    align-items: center;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:first-child button{
    width: 100px;
    height:30px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 12px;
    font-family: 'Comic Sans MS',sans-serif;
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
  #AjoutJeu{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  #AjoutJeu .ctn{
    width: 50%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
  }

  #AjoutJeu .ctn:first-child .part,#AjoutJeu .ctn:nth-child(2) .sousCtn{
    width: 100%;
    height: 30%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    align-items: center;
  }

  #AjoutJeu .ctn:first-child input,#AjoutJeu .ctn:nth-child(2) .sousCtn input{
    width: 90%;
    height: 30px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 16px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #AjoutJeu .ctn:first-child button{
    width: 100px;
    height: 20px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 12px;
    font-family: 'Comic Sans MS',sans-serif;
    margin: 0 auto;
  }

  #AjoutJeu .ctn:first-child .articles{
    height: 40%;
  }

  #AjoutJeu .ctn:first-child .articles p{
    font-size: 10px;
  }
  #AjoutJeu .ctn:first-child .articles textarea, #AjoutJeu .ctn:nth-child(2) .sousCtn textarea{
    height: 20%;
    width: 90%;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn textarea{
    height: 50%;
  }

  #AjoutJeu .ctn:first-child .articles textarea::placeholder,
  #AjoutJeu .ctn:first-child input::placeholder,
  #AjoutJeu .ctn:nth-child(2) input::placeholder,
  #AjoutJeu .ctn:nth-child(2) textarea::placeholder{
    color: black;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:nth-child(2){
    height: 45%;
    justify-content: space-evenly;
    align-items: center;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:first-child{
    height: 10%;
    justify-content: space-evenly;
    flex-flow: row;
    align-items: center;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:last-child{
    height: 20%;
    align-items: center;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:first-child button{
    width: 100px;
    height:30px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 12px;
    font-family: 'Comic Sans MS',sans-serif;
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
  #AjoutJeu{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  #AjoutJeu .ctn{
    width: 50%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
  }

  #AjoutJeu .ctn:first-child .part,#AjoutJeu .ctn:nth-child(2) .sousCtn{
    width: 100%;
    height: 30%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    align-items: center;
  }

  #AjoutJeu .ctn:first-child input,#AjoutJeu .ctn:nth-child(2) .sousCtn input{
    width: 90%;
    height: 30px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 16px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #AjoutJeu .ctn:first-child button{
    width: 100px;
    height: 20px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 12px;
    font-family: 'Comic Sans MS',sans-serif;
    margin: 0 auto;
  }

  #AjoutJeu .ctn:first-child .articles{
    height: 40%;
  }

  #AjoutJeu .ctn:first-child .articles p{
    font-size: 10px;
  }
  #AjoutJeu .ctn:first-child .articles textarea, #AjoutJeu .ctn:nth-child(2) .sousCtn textarea{
    height: 20%;
    width: 90%;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn textarea{
    height: 50%;
  }

  #AjoutJeu .ctn:first-child .articles textarea::placeholder,
  #AjoutJeu .ctn:first-child input::placeholder,
  #AjoutJeu .ctn:nth-child(2) input::placeholder,
  #AjoutJeu .ctn:nth-child(2) textarea::placeholder{
    color: black;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:nth-child(2){
    height: 45%;
    justify-content: space-evenly;
    align-items: center;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:first-child{
    height: 10%;
    justify-content: space-evenly;
    flex-flow: row;
    align-items: center;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:last-child{
    height: 20%;
    align-items: center;
  }

  #AjoutJeu .ctn:nth-child(2) .sousCtn:first-child button{
    width: 100px;
    height:30px;
    background: none;
    border: 1px black solid;
    border-radius: 5px;
    font-size: 12px;
    font-family: 'Comic Sans MS',sans-serif;
  }
}

</style>
