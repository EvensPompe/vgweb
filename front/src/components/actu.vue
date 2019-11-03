<template lang="html">
  <div id="actu">
    <div class="low" v-for="article in game.articles" :key="article.id">
      <div class="ctnArt">
        <div class="highctn">
          <img :src="article.img" alt="article.img">
          <h3>{{article.titre}}</h3>
        </div>
          <h4>{{article.text}} <a :href="article.lien" target="_blank">En savoir plus</a></h4>
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
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
}

#actu .low{
  width: 100%;
  height: 100%;
  display: flex;
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
</style>
