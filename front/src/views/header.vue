<template lang="html">
  <div id="header">
    <div id="hautHead">
      <h1>VGWEB</h1>
      <div id="sign">
        <button type="button" @click="changeComp('inscription')" id="inscription" name="button">inscription</button>
        <button type="button" @click="changeComp('connection')" id="connection" name="button">connexion</button>
      </div>
    </div>
      <div id="basHead">
        <h3>Recherchez votre jeu, trouvez vous !!!!</h3>
      </div>
  </div>
</template>

<script>
import { eBus } from '../main'
export default {
  name:"myHeader",
  data(){
    return {
      selectedComponents: ""
    }
  },
  methods:{
    changeComp(comp) {
      if (comp == 'inscription') {
        this.selectedComponents = 'Inscription';
        eBus.$emit('change',this.selectedComponents);
      }else if (comp == 'connection') {
        this.selectedComponents = 'Login';
        eBus.$emit('change',this.selectedComponents)
      }
    }
  }

}
</script>

<style lang="css" scoped>
#header{
  width: 100%;
  height: 200px;
  background: black;
  color: White;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
}

#hautHead{
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#header h1{
  font-size: 72px;
  margin-left: 96px;
}

#sign{
  width: 30%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center
}

#sign #inscription,#connection{
  width: 125px;
  height: 60px;
  font-size: 24px;
  background: none;
  border: 2px white solid;
  color: white;
  border-radius: 15px;
}

#sign #inscription:hover,#connection:hover{
  background: #bebebe;
  color: black;
  transition: 0.3s;
}

#sign #inscription:active,#connection:active{
  background: white;
  color: black;
}

#basHead{
  width: 100%;
  height: 50px;
  font-size: 24px;
  background: grey;
  display: flex;
  color: black;
}

#basHead h3{
 transform: translate(223px,0);
}


</style>
