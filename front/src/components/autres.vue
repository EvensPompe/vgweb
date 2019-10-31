<template lang="html">
  <div id="autres">
    <h1>JEUX</h1>
    <div>
    <div>

    </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'gameplay',
  props:["game"],
  data(){
    return{

    }
  },
 created:function () {
   for (let genre of this.game.tbl_genres) {
     console.log(genre.type);
   }
   // this.getGamesByHazard(game.)
 }
}
</script>

<style lang="css" scoped>
#autres{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  overflow: auto;
}

#autres div{
  width: 100%;
  height: 100%;
}
</style>
