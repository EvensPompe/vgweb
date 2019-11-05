<template lang="html">
  <div id="actu">
    <div class="low">
      <div class="ctnArt" v-for="article in game.articles" :key="article.id">
        <div class="highctn">
          <img :src="article.img" alt="article.img">
          <h3>{{article.titre}}</h3>
        </div>
          <p>{{article.text}} <a :href="article.lien" target="_blank">En savoir plus</a></p>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  name:'actu',
  props:["game"],

}
</script>

<style lang="css" scoped>
#actu{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  overflow: auto;
}

#actu .low{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

#actu .low .ctnArt{
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  width: 50%;
  height: 50%;
  transform: translate(0,30px);
}

#actu .low .ctnArt .highctn{
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}

#actu .low .ctnArt .highctn h3{
  width: 50%;
}

#actu .low .ctnArt .highctn img{
  width: 40%;
}



@media screen and (min-width:1281px) {
  #actu{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    overflow: auto;
  }

  #actu .low{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }

  #actu .low .ctnArt{
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    width: 50%;
    height: 50%;
    transform: translate(0,30px);
  }

  #actu .low .ctnArt .highctn{
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }

  #actu .low .ctnArt .highctn h3{
    width: 50%;
  }

  #actu .low .ctnArt .highctn img{
    width: 40%;
  }

  #actu .low .ctnArt .highctn p{
    font-weight: bold;
  }
}

@media screen and (min-width:1024px) and (max-width:1280px) {
  #actu{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    overflow: auto;
  }

  #actu .low{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }

  #actu .low .ctnArt{
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    width: 50%;
    height: 50%;
    transform: translate(0,30px);
  }

  #actu .low .ctnArt .highctn{
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }

  #actu .low .ctnArt .highctn h3{
    width: 48%;
  }

  #actu .low .ctnArt .highctn img{
    width: 50%;
  }

  #actu .low .ctnArt .highctn p{
    font-weight: bold;
  }
}

@media screen and (min-width:769px) and (max-width:1023px) {
  #actu{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    overflow: auto;
  }

  #actu .low{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }

  #actu .low .ctnArt{
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    width: 50%;
    height: 50%;
    transform: translate(0,30px);
  }

  #actu .low .ctnArt .highctn{
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    align-items: center;
  }

  #actu .low .ctnArt .highctn h3{
    width: 45%;
  }

  #actu .low .ctnArt .highctn p{
    font-weight: bold;
  }

  #actu .low .ctnArt .highctn img{
    width: 40%;
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
  #actu{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    overflow: auto;
  }

  #actu .low{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }

  #actu .low .ctnArt{
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    width: 50%;
    height: 70%;
    transform: translate(0,30px);
  }

  #actu .low .ctnArt .highctn{
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #actu .low .ctnArt .highctn h3{
    width: 85%;
  }

  #actu .low .ctnArt .highctn p{
    font-weight: bold;
  }

  #actu .low .ctnArt .highctn img{
    width: 90%;
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
  #actu{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    overflow: auto;
  }

  #actu .low{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }

  #actu .low .ctnArt{
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    width: 100%;
    height: 50%;
    transform: translate(0,30px);
  }

  #actu .low .ctnArt .highctn{
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #actu .low .ctnArt .highctn h3{
    width: 85%;
  }

  #actu .low .ctnArt .highctn p{
    font-weight: bold;
  }

  #actu .low .ctnArt .highctn img{
    width: 90%;
  }
}
</style>
