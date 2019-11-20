<template lang="html">
      <ul v-show="visible == true">
        <li v-for="name in gamesName" @click="selectName(name)" :key="name.id">{{name}}</li>
      </ul>
</template>

<script>
export default {
  name:'autoComplete',
  props:["inputData","autoVisible"],
  data(){
    return{
      gamesName:'',
      visible:false
    }
  },
  watch:{
    inputData(data){
      this.visible = this.autoVisible;
      this.getAllNames(data)
    }
  },
  methods:{
    getAllNames(search){
      this.axios.get("http://localhost:3000/jeu/allname")
      .then(res=>{
        this.gamesName = res.data.map(jeu=>{
          return jeu.nom
        })
        this.gamesName = this.gamesName.filter(nom => nom.toLowerCase().includes(search.toLowerCase()) == true);
      }).catch(err=>{
        console.log(err);
      })
    },
    selectName(name){
      this.$emit("autoData",name);
      this.visible = false;
    }
  }
}
</script>

<style lang="css" scoped>

@media screen and (min-width:1281px) {
  ul{
    list-style: none;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    height: 900px;
    width: 720px;
  }

  ul li{
    width: 100%;
    height: 30px;
    background: #929292;
    cursor: pointer;
    border: 1px black solid;
  }

  ul li:nth-child(2n){
    background: #bebebe;
  }

  ul li:hover{
    background: black;
    color: white
  }

  ul li :active{
    background: white;
    color: black;
  }
}

@media screen and (min-width:1024px) and (max-width:1280px) {
  ul{
    list-style: none;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    height: 900px;
    width: 720px;
  }

  ul li{
    width: 100%;
    height: 30px;
    background: #929292;
    cursor: pointer;
    border: 1px black solid;
  }

  ul li:nth-child(2n){
    background: #bebebe;
  }

  ul li:hover{
    background: black;
    color: white
  }

  ul li :active{
    background: white;
    color: black;
  }
}

@media screen and (min-width:769px) and (max-width:1023px) {
  ul{
    list-style: none;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    height: 900px;
    width: 720px;
  }

  ul li{
    width: 100%;
    height: 30px;
    background: #929292;
    cursor: pointer;
    border: 1px black solid;
  }

  ul li:nth-child(2n){
    background: #bebebe;
  }

  ul li:hover{
    background: black;
    color: white
  }

  ul li :active{
    background: white;
    color: black;
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
  ul{
    list-style: none;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    height: 900px;
    width: 90%;
  }

  ul li{
    width: 100%;
    height: 30px;
    background: #929292;
    cursor: pointer;
    border: 1px black solid;
  }

  ul li:nth-child(2n){
    background: #bebebe;
  }

  ul li:hover{
    background: black;
    color: white
  }

  ul li :active{
    background: white;
    color: black;
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
  ul{
    list-style: none;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    height: 900px;
    width: 90%;
  }

  ul li{
    width: 100%;
    height: 30px;
    background: #929292;
    cursor: pointer;
    border: 1px black solid;
  }

  ul li:nth-child(2n){
    background: #bebebe;
  }

  ul li:hover{
    background: black;
    color: white
  }

  ul li :active{
    background: white;
    color: black;
  }
}

</style>
