<template lang="html">
  <div id="jeux">
    <h1>Jeux</h1>
    <div>
    <div v-for="jeu in jeux" :key="jeux.id">
      <div class="jeu">
        <h3> {{jeu.nom}} </h3>
        <h3> {{jeu.sortie}} </h3>
        <p> {{jeu.synopsis}} </p>
      </div>
      <div class="option" :id="jeu.id">
        <button type="button" name="button">Accéder</button>
        <button type="button" name="button">Supprimer</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name:'jeux',
  data(){
    return{
      jeux:''
    }
  },
  created:function () {
    this.getJeux();
  },
  methods:{
    getJeux(){
      this.axios.get('http://localhost:3000/jeu/all',{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             console.log(res);
             console.log(res.data);
             this.jeux = res.data
           }).catch(err=>{
             console.log(err);
        })
    }
  }
}
</script>

<style lang="css" scoped>
#jeux{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

#jeux div{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

#jeux div div{
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
}

#jeux div .jeu,.option{
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: column;
}

#jeux div .option button{
  width: 50%;
  height: 25%;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}

#jeux div .option{
  display: flex;
  justify-content: flex-end;
}
</style>
