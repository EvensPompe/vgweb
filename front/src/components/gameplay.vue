<template lang="html">
  <div id="gameplay">
    <div id="ctnslider">
      <h1>IMAGES</h1>
        <Carousel :autoplay="true">
          <Slide v-for="image in game.images.split(',')" :key="image.id">
            <img :src="image" alt="Image du jeu">
          </Slide>
        </Carousel>
    </div>
    <div id="ctnvideo">
     <h1>VIDEOS</h1>
       <!-- <video v-for="video in game.videos.split(',')" :key="video" :src="video" autoplay >

       </video> -->
       <!-- <iframe src="https://www.youtube.com/embed/_PTHE5Tk6As" autoplay>

       </iframe> -->
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
name:'gameplay',
props:["game"],
components: {
    Carousel,
    Slide
  },
}
</script>

<style lang="css" scoped>
#gameplay{
   width: 100%;
   height: 100%;
   display: flex;
   flex-flow: nowrap;
}

#ctnvideo, #ctnslider{
  width: 50%;
  height: 100%;
}

#ctnvideo {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
}

#ctnslider{
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
}

#ctnslider img{
   width: 100%;
   height: 220px;
}

</style>
