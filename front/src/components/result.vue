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
    <component :is='selectedComp'></component>
  </div>
</div>
</template>

<script>
import Fiche from "./fiche"
import Actu from "./actu"
import Notes from "./notes"
import Gameplay from "./gameplay"
import Autres from "./autres"
export default {
  name:'result',
  components:{
    Fiche,
    Actu,
    Notes,
    Gameplay,
    Autres
  },
  props:["result"],
  data(){
    return{
      selectedComp:'',
      url:''
    }
  },
  created:function(){
    console.log(this.result);
    this.url = "http://localhost:3000/jeu/result/" + this.result
    console.log(this.url);
    this.doResult();
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
    },
    doResult(){
      console.log(this.url);
      this.axios.get(this.url)
      .then(res=>{
        console.log(res);
      })
    }
  }
}
</script>

<style lang="css" scoped>

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

</style>
