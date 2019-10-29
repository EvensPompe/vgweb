<template lang="html">
  <div id="genres">
    <h1>Genres</h1>
    <button type="button" name="button" v-show="single == false" @click="ajout">Ajouter un genre</button>
    <div v-if="single == false">
      <div v-for="genre in genres" :key="genres.id">
        <div class="genre">
          <h3>{{genre.type}}</h3>
        </div>
        <div class="option" :id="genre.id">
          <button type="button" name="button" @click="acc(genre.id)">Accéder</button>
          <button type="button" name="button" @click="sup(genre.id)">Supprimer</button>
        </div>
      </div>
    </div>
    <div v-else>
      <component :genreId="idGenre" :is="compSelect"></component>
    </div>
  </div>
</template>

<script>
import genreInfo from './genreInfo'
import ajoutGenre from './ajoutGenre'
export default {
  name:'genres',
  components:{
    genreInfo,
    ajoutGenre
  },
  data(){
    return{
      genres:'',
      idGenre: "",
      single: false,
      compSelect: ''
    }
  },
  created:function () {
    this.getGenres();
  },
  methods:{
    getGenres(){
      this.axios.get('http://localhost:3000/genre/all',{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             console.log(res);
             console.log(res.data);
             this.genres = res.data
           }).catch(err=>{
             console.log(err);
        })
    },
    acc(id){
      console.log(id);
      this.idGenre = id;
      this.single = true;
      this.compSelect = "genreInfo";
    },
    sup(id){
      this.axios.delete(`http://localhost:3000/genre/delete/${id}`,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
        .then(res=>{
          console.log(res);
        }).catch(err=>{
          console.log(err);
      })
    },
    ajout(e){
      e.preventDefault();
      this.single = true;
      this.compSelect = ajoutGenre;
    }
  }
}
</script>

<style lang="css" scoped>

#genres{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

#genres button{
  width: 15%;
  height: 8%;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}

#genres div{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

#genres div div{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
}

#genres div .genre,.option{
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
}

#genres div .genre{
  width: 18%;
  height: 22%;
}

#genres div .option{
  width: 44%;
  height: 20%;
}

#genres div .option button{
  width: 20%;
  height: 100%;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}
</style>
