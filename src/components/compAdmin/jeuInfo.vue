<template lang="html">
  <div id="jeuInfo">
    <div class="ctn high">
      <h2>{{jeu.nom}}</h2>
      <h3 v-for="editDev in jeu.tbl_editDevs" :key="editDev.id">{{editDev.nom}}</h3>
      <h3 v-for="genre in jeu.tbl_genres" :key="genre.id">{{genre.type}}</h3>
      <h3>{{jeu.sortie.split("-").reverse().join('/')}}</h3>
    </div>
    <div class="ctn low">
      <div>
        <Carousel :per-page="1" :adjustableHeight="true" :paginationEnabled="false">
          <Slide v-for="img in jeu.images.split(',')" :key="img.id">
            <img :src="img" alt="img">
          </Slide>
        </Carousel>
      </div>
      <div>
        <Carousel :per-page="1" :paginationEnabled="false">
          <Slide v-for="video in jeu.videos.split(',')" :key="video.id">
            <iframe :src="video" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>

            </iframe>
          </Slide>
        </Carousel>
      </div>
      <div>
        <Carousel :per-page="1">
          <Slide v-show="jeu.articles != null" v-for="article in jeu.articles" :key="article.id">
          <h2>{{article.titre}}</h2>
          <p>{{article.text}} <a :href="article.lien" target="_blank">En savoir plus</a>|<a :href="article.img" target="_blank">Image</a></p>
          </Slide>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  name:'jeuInfo',
  components:{
    Carousel,
    Slide
  },
  props:['gameId'],
  data(){
    return {
      jeu:''
    }
  },
  created:function () {
    this.getJeuById(this.gameId);
  },
  methods:{
    getJeuById(id){
      this.axios.get(`https://videogameweb.osc-fr1.scalingo.io/jeu/one/${id}`,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
        .then(res=>{
          this.jeu = res.data;
        }).catch(err=>{
          console.log(err);
        })
    }
  }
}
</script>

<style lang="css" scoped>

@media screen and (min-width:1281px) {
  #jeuInfo{
    width: 100%;
    height: 100%;
  }

  #jeuInfo .ctn{
    width: 100%;
  }

  #jeuInfo .high{
    height: 30%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #jeuInfo .low{
    height: 70%;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  #jeuInfo .low div{
    width: 35%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
      align-items: center;
  }

  #jeuInfo .low div img {
    width: 100%;
  }

  #jeuInfo .low div iframe{
    width: 100%;
  }

  #jeuInfo .low div h2{
    font-size: 12px;
  }

  #jeuInfo .low div p{
    font-size: 10px
  }
}

@media screen and (min-width:1024px) and (max-width:1280px) {
  #jeuInfo{
    width: 100%;
    height: 100%;
  }

  #jeuInfo .ctn{
    width: 100%;
  }

  #jeuInfo .high{
    height: 30%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #jeuInfo .low{
    height: 70%;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  #jeuInfo .low div{
    width: 35%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
      align-items: center;
  }

  #jeuInfo .low div img {
    width: 100%;
  }

  #jeuInfo .low div iframe{
    width: 100%;
  }

  #jeuInfo .low div h2{
    font-size: 12px;
  }

  #jeuInfo .low div p{
    font-size: 10px
  }
}

@media screen and (min-width:769px) and (max-width:1023px) {
  #jeuInfo{
    width: 100%;
    height: 100%;
  }

  #jeuInfo .ctn{
    width: 100%;
  }

  #jeuInfo .high{
    height: 30%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #jeuInfo .low{
    height: 70%;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  #jeuInfo .low div{
    width: 35%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  #jeuInfo .low div img {
    width: 100%;
  }

  #jeuInfo .low div iframe{
    width: 100%;
  }

  #jeuInfo .low div h2{
    font-size: 12px;
  }

  #jeuInfo .low div p{
    font-size: 10px
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
  #jeuInfo{
    width: 100%;
    height: 100%;
  }

  #jeuInfo .ctn{
    width: 100%;
  }

  #jeuInfo .high{
    height: 30%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #jeuInfo .low{
    height: 70%;
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  #jeuInfo .low div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  #jeuInfo .low div img {
    width: 50%;
  }

  #jeuInfo .low div iframe{
    width: 50%;
  }

  #jeuInfo .low div h2{
    font-size: 12px;
  }

  #jeuInfo .low div p{
    font-size: 10px
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
  #jeuInfo{
    width: 100%;
    height: 100%;
  }

  #jeuInfo .ctn{
    width: 100%;
  }

  #jeuInfo .high{
    height: 30%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #jeuInfo .low{
    height: 70%;
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  #jeuInfo .low div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  #jeuInfo .low div img {
    width: 50%;
  }

  #jeuInfo .low div iframe{
    width: 60%;
  }

  #jeuInfo .low div h2{
    font-size: 10px;
  }

  #jeuInfo .low div p{
    font-size: 8px
  }
}
</style>
