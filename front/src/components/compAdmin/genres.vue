<template lang="html">
  <div id="genres">
    <h1>Genres</h1>
    <div>
      <div v-for="genre in genres" :key="genres.id">
        <div class="genre">
          <h3>  </h3>
          <h3>  </h3>
          <h3>  </h3>
        </div>
        <div class="option" :id="genre.id">
          <button type="button" name="button">Accéder</button>
          <button type="button" name="button">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'genres',
  data(){
    return{
      genres:''
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

#genres div{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

#genres div div{
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
}

#genres div .genre,.option{
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: column;
}

#genres div .option button{
  width: 50%;
  height: 25%;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}

#genres div .option{
  display: flex;
  justify-content: flex-end;
}
</style>
