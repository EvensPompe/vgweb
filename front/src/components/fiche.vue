<template lang="html">
  <div id="fiche">
      <div id="highFiche">
        <div id="ctnImg">
          <img :src="game.images.split(',')[0]" alt="Image du jeu">
        </div>
        <div id="ctnInfo">
          <h1>{{ game.nom }}</h1>
          <div>
            <h3 v-for="editDev in game.tbl_editDevs" :key="editDev.id">{{editDev.nom}}</h3>
            <h3 v-for="genre in game.tbl_genres" :key="genre.id">{{genre.type}}</h3>
            <h3>{{game.sortie.split("-").reverse().join('/')}}</h3>
            <h3 v-for="plateforme in game.tbl_plateformes" :key="plateforme.id">{{plateforme.nom}}</h3>
          </div>
        </div>
      </div>
      <div id="lowFiche">
      <p>{{game.synopsis}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name:"fiche",
  props:["game"],
}
</script>

<style lang="css" scoped>

#fiche{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}

#highFiche{
  width: 100%;
  height: 60%;
  /* background: red; */
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

#highFiche #ctnImg{
  width: 400px;
  height: 90%;
  /* background: green; */
}

#highFiche #ctnImg img{
  width: inherit;
  height: inherit;
}

#highFiche #ctnInfo{
  width: 400px;
  height: 90%;
  /* background: yellow; */
  transform: translate(-80px,0);
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}

#highFiche #ctnInfo div{

}

#lowFiche{
  width: 100%;
  height: 40%;
  /* background: blue; */
  display: flex;
  align-items: center;
  justify-content: center;
}

#lowFiche p{
  font-size: 20px;
  width: 80%;
}

</style>
