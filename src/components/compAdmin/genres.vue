<template lang="html">
  <div>
    <div id="genres">
      <h1>Genres</h1>
      <button type="button" name="button" v-show="single == false" @click="ajout">Ajouter</button>
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
        <component :genreId="idGenre" @retour="back" :is="compSelect"></component>
      </div>
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
             this.genres = res.data
           }).catch(err=>{
             console.log(err);
        })
    },
    acc(id){
      this.idGenre = id;
      this.single = true;
      this.compSelect = "genreInfo";
    },
    sup(id){
      this.axios.delete(`http://localhost:3000/genre/delete/${id}`,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
        .then(res=>{
          alert(res.data);
        }).catch(err=>{
          console.log(err);
      })
    },
    ajout(e){
      e.preventDefault();
      this.single = true;
      this.compSelect = ajoutGenre;
    },
    back(event){
      this.single = event;
    }
  }
}
</script>

<style lang="css" scoped>

@media screen and (min-width:1281px) {
  #genres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  #genres button{
    width: 100px;
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
    flex-flow: row wrap;
  }

  #genres div .genre,.option{
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  #genres div .genre,#genres div .option{
    width: 50%;
    height: 100%;
  }

  #genres div .option{
    align-items: center;
    justify-content: space-evenly;
  }

  #genres div .option button{
    width: 100px;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }
}

@media screen and (min-width:1024px) and (max-width:1280px) {
  #genres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  #genres button{
    width: 100px;
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
    flex-flow: row wrap;
  }

  #genres div .genre,.option{
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  #genres div .option{
    align-items: center;
    justify-content: space-evenly;
  }

  #genres div .genre,#genres div .option{
    width: 50%;
    height: 100%;
  }

  #genres div .option button{
    width: 100px;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }
}

@media screen and (min-width:769px) and (max-width:1023px) {
  #genres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  #genres button{
    width: 100px;
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
    flex-flow: row wrap;
  }

  #genres div .genre,.option{
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  #genres div .option{
    align-items: center;
    justify-content: space-evenly;
  }

  #genres div .genre,#genres div .option{
    width: 50%;
    height: 100%;
  }

  #genres div .option button{
    width: 100px;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
  #genres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  #genres button{
    width: 100px;
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
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
  }

  #genres div .option{
  align-items: center;
  justify-content: space-evenly;
  }

  #genres div .option button{
    width: 100px;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
  #genres{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  #genres button{
    width: 100px;
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
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
  }

  #genres div .option{
    flex-flow: column;
    align-items: center;
    justify-content: space-evenly;
  }

  #genres div .option button{
    width: 100px;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }
}
</style>
