<template lang="html">
<div id="footer">
<div id="ctnFoot">
  <h3>Copyright (c)</h3>
  <h3><a @click="changeComp('Mention')">Mentions légales</a></h3>
  <h3><a @click="changeComp('Contact')">Contact</a></h3>
</div>
</div>
</template>

<script>
import { eBus } from '../main.js'
export default {
  name:'myFooter',
  data(){
    return {
      compFoot:''
    }
  },
  methods:{
    changeComp(comp){
      if (comp == "Mention") {
        this.$router.push("/mention");
      }else if (comp == "Contact") {
        this.$router.push("/contact");
      }
    }
  }
}
</script>

<style lang="css" scoped>
@media screen and (min-width:1281px) {
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
}


@media screen and (min-width:1024px) and (max-width:1280px) {
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
}

@media screen and (min-width:769px) and (max-width:1023px) {
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
}

@media screen and (min-width:481px) and (max-width:768px) {
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
}

@media screen and (min-width:320px) and (max-width:480px) {
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
    justify-content: space-around;
    align-items: center;
  }

  #ctnFoot h3{
    font-size: 14px;
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
}
</style>
