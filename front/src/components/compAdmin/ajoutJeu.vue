<template lang="html">
  <div id="AjoutJeu">
    <div class="ctn">
      <div class="part images">
          <Carousel :autoplay="true" :paginationEnabled="false">
           <Slide v-for="img in this.imgs" :key="imgs.id">
           <img :src="img" :alt="img" width="50%">
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
        <h3>Synopsis</h3>
        <textarea name="name" rows="8" cols="80" placeholder="Synopsis" v-model="jeu.synopsis"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  name:'ajoutJeu',
  components: {
      Carousel,
      Slide
    },
  data(){
    return{
      jeu: {},
      imgInput: "",
      artInput:"",
      videoInput:"",
      imgs:[],
      art:{},
      arts:[],
      video:[],
      result:false
    }
  },
  methods:{
    ajouter(e){
      e.preventDefault();
      this.axios.post('http://localhost:3000/jeu/add',this.jeu,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             console.log(res.data);
           })
           .catch(err=>{
             console.log(err);
      })
    },
    ajoutImg(imgInput){
      this.imgs.push(imgInput)
      this.jeu.img = this.imgs.join(',');
    },
    ajoutArt(){
      let article = {
        img:this.art.img,
        titre:this.art.titre,
        lien:this.art.lien,
        text:this.art.text
      };
      this.arts.push(article);
      this.jeu.article = this.arts;
    },
    ajoutVideo(videoInput){
      this.video.push(videoInput)
      this.jeu.video = this.video.join(',');
      console.log(this.jeu.video);
    },
    cancel(e){
      e.preventDefault();
      let back = false;
      this.$emit('retour',back);
    }
  }
}
</script>

<style lang="css" scoped>

#AjoutJeu{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
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
/* #AjoutJeu .ctn:first-child{
  /* height: 10%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}

#AjoutJeu .ctn:nth-child(2){
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}

#AjoutJeu .ctn:nth-child(2) .sousCtn{
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
}

#AjoutJeu .ctn:nth-child(2) .sousCtn .articles{
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}

#AjoutJeu .ctn:nth-child(2) .sousCtn .articles input{
  width: 56%;
}

#AjoutJeu .ctn:nth-child(2) .sousCtn input{
  height: 30px;
  background: none;
  border: 1px black solid;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Comic Sans MS',sans-serif;
}

#AjoutJeu .ctn:nth-child(2) .sousCtn textarea{
  width: 56%;
  height: 35px;
  background: none;
  border: 1px black solid;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Comic Sans MS',sans-serif;
}

#AjoutJeu .ctn:nth-child(2) .sousCtn input::placeholder{
  transform: translate(10px,0);
  font-size: 16px;
  color: black;
  font-weight: bold;
}

#AjoutJeu .ctn:nth-child(2) .sousCtn button,#AjoutJeu .ctn:first-child button,#AjoutJeu .ctn:first-child div button{
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

#AjoutJeu .ctn:first-child div button{
  transform: translate(10px,0);
}

#AjoutJeu .ctn:nth-child(2) .sousCtn button{
  transform: translate(10px,0);
}

#AjoutJeu .ctn:first-child div{
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#AjoutJeu .ctn:last-child{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

#AjoutJeu .ctn:last-child textarea{
  width: 90%;
  height: 100%;
  background: none;
  border: 1px black solid;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Comic Sans MS',sans-serif;
}

#AjoutJeu .ctn:last-child textarea::placeholder{
  font-size: 16px;
  color: black;
  font-weight: bold;
} */


</style>
