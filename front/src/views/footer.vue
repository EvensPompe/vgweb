<template lang="html">
<div id="footer">
  <div>
    <component :is="compFoot"></component>
  </div>
<div id="ctnFoot">
  <h3>Copyright (c) All Rights Reserved.</h3>
  <h3><a @click="changeComp('Mention')">Mentions légales</a></h3>
  <h3><a @click="changeComp('Contact')">Contact</a></h3>
</div>
</div>
</template>

<script>
import Mention from "../components/mention"
import Contact from "../components/contact"
export default {
  components:{
    Mention,
    Contact
  },
  data(){
    return {
      compFoot:''
    }
  },
  methods:{
    changeComp(comp){
      if (comp == "Mention") {
        this.compFoot = "Mention"
      }else if (comp == "Contact") {
        this.compFoot = "Contact"
      }
    }
  }
}
</script>

<style lang="css" scoped>
#footer{
  width: 100%;
  height: 470px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-flow: column;
}

#ctnFoot{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#ctnFoot h3{
  margin: 0 auto
}

#ctnFoot h3:nth-child(2),h3:last-child{
  cursor: pointer;
}

#ctnFoot h3:nth-child(2):hover,h3:last-child:hover{
  color: #929292;
  transition: 0.3s;
  border: 1px #bebebe solid;
  border-radius: 5px;
  padding: 5px;
}

#footer div:first-child{
  width: 100%;
  height: 370px;
}
</style>
