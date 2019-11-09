<template lang="html">
  <div id="gameplay">
    <div id="ctnslider">
      <h1>IMAGES</h1>
        <Carousel :autoplay="true" :adjustableHeight="true" :per-page="1">
          <Slide v-for="image in game.images.split(',')" :key="image.id">
            <img :src="image" alt="Image du jeu">
          </Slide>
        </Carousel>
    </div>
    <div id="ctnvideo">
     <h1>VIDEOS</h1>
     <Carousel :per-page="1" :adjustableHeight="true">
       <Slide v-for="video in game.videos.split(',')" :key="video">
         <iframe  :src="video" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>

         </iframe>
       </Slide>
     </Carousel>
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
  }
}
</script>

<style lang="css" scoped>

@media screen and (min-width:1281px) {
  #gameplay{
     width: 100%;
     height: 100%;
     display: flex;
     flex-flow: nowrap;
  }

  #ctnvideo, #ctnslider{
    width: 50%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #ctnvideo iframe {
    width: 90%;
    height: 300px;
  }

  #ctnslider img{
     width: 100%;
     height: 300px;
  }
}

@media screen and (min-width:1024px) and (max-width:1280px) {
  #gameplay{
     width: 100%;
     height: 100%;
     display: flex;
     flex-flow: nowrap;
  }

  #ctnvideo, #ctnslider{
    width: 50%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #ctnvideo iframe {
    width: 90%;
    height: 300px;
  }

  #ctnslider img{
     width: 100%;
     height: 300px;
  }
}

@media screen and (min-width:769px) and (max-width:1023px) {
  #gameplay{
     width: 100%;
     height: 100%;
     display: flex;
     flex-flow: nowrap;
  }

  #ctnvideo, #ctnslider{
    width: 50%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #ctnvideo iframe {
    width: 90%;
    height: 300px;
  }

  #ctnslider img{
     width: 100%;
     height: 300px;
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
  #gameplay{
     width: 100%;
     height: 100%;
     display: flex;
     flex-flow: column nowrap;
  }

  #ctnvideo, #ctnslider{
    width: 100%;
    height: 50%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #ctnvideo iframe {
    width: 100%;
    height: 300px;
  }

  #ctnslider img{
     width: 100%;
     height: 200px;
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
  #gameplay{
     width: 100%;
     height: 100%;
     display: flex;
     flex-flow: column nowrap;
  }

  #ctnvideo, #ctnslider{
    width: 100%;
    height: 50%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }

  #ctnvideo iframe {
    width: 100%;
    height: 300px;
  }

  #ctnslider img{
     width: 100%;
     height: 200px;
  }
}
</style>
