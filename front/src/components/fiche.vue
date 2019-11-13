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
  props:["game"]
}
</script>

<style lang="css" scoped>

@media screen and (min-width:1281px) {
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
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #highFiche #ctnImg img{
    width: 90%;
    height: 80%;
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

  #lowFiche{
    width: 100%;
    height: 40%;
    /* background: blue; */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #lowFiche p{
    font-size: 16px;
    width: 80%;
    font-weight: bold;
  }
}

@media screen and (min-width:1024px) and (max-width:1280px) {
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
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #highFiche #ctnImg img{
    width: 90%;
    height: 80%;
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

  #lowFiche{
    width: 100%;
    height: 40%;
    /* background: blue; */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #lowFiche p{
    font-size: 16px;
    width: 80%;
    font-weight: bold;
  }
}

@media screen and (min-width:769px) and (max-width:1023px) {
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
    width: 200px;
    height: 80%;
    /* background: green; */
  }

  #highFiche #ctnImg img{
    width: inherit;
    height: inherit;
  }

  #highFiche #ctnInfo{
    width: 260px;
    height: 90%;
    /* background: yellow; */
    transform: translate(-80px,0);
    display: flex;
    flex-flow: column;
    justify-content: space-around;
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
    font-size: 16px;
    width: 100%;
    font-weight: bold;
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
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
    align-items: center;
  }

  #highFiche #ctnImg{
    width: 50%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: green; */
  }

  #highFiche #ctnImg img{
    width: 80%;
    height: 90%;
  }

  #highFiche #ctnInfo{
    width: 50%;
    height: 70%;
    /* background: yellow; */
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    transform: translate(0,10px);
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
    font-size: 14px;
    width: 100%;
    font-weight: bold;
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
  #fiche{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
  }

  #highFiche{
    width: 100%;
    height: 40%;
    /* background: red; */
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  #highFiche #ctnImg{
    width: 50%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: green; */
  }

  #highFiche #ctnImg img{
    width: 80%;
    height: 90%;
  }

  #highFiche #ctnInfo{
    width: 50%;
    height: 70%;
    /* background: yellow; */
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    transform: translate(0,10px);
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
    font-size: 14px;
    width: 100%;
    font-weight: bold;
  }
}
</style>
