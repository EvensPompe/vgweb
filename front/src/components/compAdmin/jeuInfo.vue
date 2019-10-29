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
        <Carousel height="100%">
          <Slide v-for="img in jeu.images.split(',')" :key="jeu.images.split(',').id">
            <img :src="img" alt="img" width="300" height="100%">
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
      this.axios.get(`http://localhost:3000/jeu/one/${id}`,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
        .then(res=>{
          console.log(res);
          this.jeu = res.data;
        }).catch(err=>{
          console.log(err);
        })
    }
  }
}
</script>

<style lang="css" scoped>
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
  background: gold;
}

#jeuInfo .low{
  height: 70%;
  width: 100%;
  display: flex;
  justify-content: center;
  background: aqua;
}

#jeuInfo .low div{
  width: 85%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
