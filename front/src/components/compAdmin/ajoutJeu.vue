<template lang="html">
  <div id="AjoutJeu">
<div class="ctn">
  <button type="button" name="button">Retour</button>
  <div>
    <button type="button" name="button" @click="ajouter">Enregistrer</button>
    <button type="button" name="button" @click="cancel">Annuler</button>
  </div>
</div>
<div class="ctn">
  <div class="sousCtn">
    <div class="images">
     <div v-for="img in this.imgs">
      <img :src="img" :alt="img" width="100">
    </div>
     <input type="text" placeholder="lien de l'image" v-model="imgInput">
     <button type="button" name="button" @click.prevent="ajoutImg(imgInput)">Ajouter</button>
    </div>
    <div class="articles">
      <ul v-for="art in this.articles">
       <li>{{art}}</li>
      </ul>
      <input type="text" placeholder="lien de l'article" v-model="artInput">
      <button type="button" name="button" @click.prevent="ajoutArt(artInput)">Ajouter</button>
    </div>
    <div class="videos">
      <ul v-for="video in this.videos">
       <li> <video :src="video" autoplay controls width="200"></video> </li>
      </ul>
      <input type="text" placeholder="lien de la vidéo" v-model="videoInput">
      <button type="button" name="button" @click.prevent="ajoutVideo(videoInput)">Ajouter</button>
    </div>
  </div>
  <div class="sousCtn">
    <input type="text" name="nom" placeholder="Nom du jeu" v-model="jeu.nom">
    <input type="text" name="editeur" placeholder="Nom de l'éditeur" v-model="jeu.editeur">
    <input type="text" name="developpeur" placeholder="Nom du développeur" v-model="jeu.developpeur">
    <input type="text" name="genre" placeholder="Genre" v-model="jeu.genre">
    <input type="text" name="plateforme" placeholder="plateforme" v-model="jeu.plateforme">
    <input type="date" name="sortie" placeholder="Date de sortie" v-model="jeu.sortie">
  </div>
</div>
<div class="ctn">
  <h3>Synopsis</h3>
  <textarea name="name" rows="8" cols="80" placeholder="Synopsis" v-model="jeu.synopsis"></textarea>
</div>
  </div>
</template>

<script>
export default {
  name:'ajoutJeu',
  data(){
    return{
      jeu: {},
      imgInput: "",
      artInput:"",
      videoInput:"",
      imgs:[],
      articles:[],
      videos:[]
    }
  },
  methods:{
    ajouter(e){
      console.log(this.jeu);
      e.preventDefault();
      this.axios.post('http://localhost:3000/jeu/add',this.jeu,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             console.log(res);
           })
           .catch(err=>{
             console.log(err);
      })
    },
    cancel(e){
      e.preventDefault();
    },
    ajoutImg(imgInput){
      this.imgs.push(imgInput)
      this.jeu.img = this.imgs.join(',');
      console.log(this.jeu.img);
    },
    ajoutArt(artInput){
      this.articles.push(artInput);
      this.jeu.articles = this.articles.join(',');
      console.log(this.jeu.article);
    },
    ajoutVideo(videoInput){
      this.videos.push(videoInput)
      this.jeu.videos = this.videos.join(',');
      console.log(this.jeu.video);
    }
  }
}
</script>

<style lang="css" scoped>

#AjoutJeu{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

#AjoutJeu .ctn{
  width: 100%;
  height: 40%;
  display: flex;
  flex-flow: column nowrap;
}

#AjoutJeu .ctn:first-child{
  height: 10%;
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
  flex-flow: column nowrap;
  justify-content: space-around;
}

#AjoutJeu .ctn:nth-child(2) .sousCtn input{
  height: 30px;
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
}


</style>
