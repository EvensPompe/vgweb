<template lang="html">
  <div id="result">
    <div id="headRes">
      <section @click="changeHead('Fiche')">
        <h3>Fiche du jeu</h3>
      </section>
      <section @click="changeHead('Actu')">
        <h3>Actualité</h3>
      </section>
      <section @click="changeHead('Notes')">
        <h3>Notes</h3>
      </section>
      <section @click="changeHead('Gameplay')">
        <h3>Gameplay</h3>
      </section>
      <section @click="changeHead('Autres')">
        <h3>Autres jeux</h3>
      </section>
  </div>
  <div id="footRes">
    <component :game="data" :is="selectedComp"></component>
  </div>
</div>
</template>

<script>
import Fiche from "../components/fiche"
import Actu from "../components/actu"
import Notes from "../components/notes"
import Gameplay from "../components/gameplay"
import Autres from "../components/autres"
export default {
  name:'result',
  components:{
    Fiche,
    Actu,
    Notes,
    Gameplay,
    Autres
  },
  props:["data"],
  data(){
    return{
      selectedComp:'Fiche',
    }
  },
  created:function(){

  },
  methods:{
    changeHead(comp){
      switch (comp) {
        case 'Fiche':
          this.selectedComp = 'Fiche'
          break;
        case "Actu":
          this.selectedComp = "Actu"
          break;
        case "Notes":
          this.selectedComp = "Notes"
          break;
        case "Gameplay":
          this.selectedComp = "Gameplay"
          break;
        case "Autres":
          this.selectedComp = "Autres"
          break;
        default:
        this.selectedComp = 'Fiche'
      }
    }
  }
}
</script>

<style lang="css" scoped>

@media screen and (min-width:1281px) {
  #result{
    width: 1046px;
    height: 649px;
    background: #929292;
    border: 1px black solid;
    display: flex;
    flex-flow: column;
  }

  #result #headRes{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
  }

  #result #headRes section{
    background: #bebebe;
    width: 20%;
    height: 100%;
    border: 1px black solid;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
  }

  #result #headRes section:active{
    background: #929292;
    border: 2px black solid;
  }

  #result #footRes{
    width: 100%;
    height: 95%;
  }
}

@media screen and (min-width:1024px) and (max-width:1280px) {
  #result{
    width: 1046px;
    height: 649px;
    background: #929292;
    border: 1px black solid;
    display: flex;
    flex-flow: column;
  }

  #result #headRes{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
  }

  #result #headRes section{
    background: #bebebe;
    width: 20%;
    height: 100%;
    border: 1px black solid;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
  }

  #result #headRes section:active{
    background: #929292;
    border: 2px black solid;
  }

  #result #footRes{
    width: 100%;
    height: 95%;
  }
}

@media screen and (min-width: 769px) and (max-width:1023px) {
  #result{
    width: 90%;
    height: 649px;
    background: #929292;
    border: 1px black solid;
    display: flex;
    flex-flow: column;
  }

  #result #headRes{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
  }

  #result #headRes section{
    background: #bebebe;
    width: 20%;
    height: 100%;
    border: 1px black solid;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }

  #result #headRes section:active{
    background: #929292;
    border: 2px black solid;
  }

  #result #footRes{
    width: 100%;
    height: 95%;
  }
}

@media screen and (min-width: 481px) and (max-width:768px){
  #result{
    width: 90%;
    height: 100%;
    background: #929292;
    border: 1px black solid;
    display: flex;
    flex-flow: column;
  }

  #result #headRes{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
  }

  #result #headRes section{
    background: #bebebe;
    width: 20%;
    height: 100%;
    border: 1px black solid;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }

  #result #headRes section:active{
    background: #929292;
    border: 2px black solid;
  }

  #result #footRes{
    width: 100%;
    height: 95%;
  }
}

@media screen and (min-width:320px) and (max-width: 480px) {
  #result{
    width: 100%;
    height: 100%;
    background: #929292;
    border: 1px black solid;
    display: flex;
    flex-flow: column;
  }

  #result #headRes{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
  }

  #result #headRes section{
    background: #bebebe;
    width: 20%;
    height: 100%;
    border: 1px black solid;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }

  #result #headRes section:active{
    background: #929292;
    border: 2px black solid;
  }

  #result #footRes{
    width: 100%;
    height: 95%;
  }
}

</style>
