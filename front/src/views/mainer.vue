<template lang="html">
<div id="main">
  <div id="ctnBar">
    <input type="text" id='searchBar' placeholder="Que recherchez-vous ?" v-model="search"><font-awesome-icon id="logo" size="2x" icon="search"/>
  </div>
  <div>
    <router-view :data="getdata"/>
  </div>
</div>
</template>

<script>

export default {
  data(){
    return {
      search:'',
      dataSearch: '',
      getdata : ''
    }
  },
  created:function () {
    this.searching = this._.debounce(this.doResult, 2000)
  },
  watch: {
    search(newSearch, oldSearch){
        this.dataSearch = newSearch;
        // console.log(this.dataSearch);
         // console.log(newSearch);
         this.searching()
    }
  },
  methods:{
    doResult(){
      let url = `http://localhost:3000/jeu/result/?result=${this.dataSearch}`
      this.axios.get(url)
      .then(res=>{
        console.log(res.data);
        this.getdata = res.data
        this.$router.push("/result")
        // console.log(this.search);
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css" scoped>

#main{
  width: 100%;
  height: 1025px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

#ctnBar{
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(0,77px);
}

#ctnBar input{
  width: 720px;
  height: 80%;
  background: none;
  border: 4px solid black;
  border-radius: 10px;
  font-family: 'Comic Sans MS',sans-serif;
  font-size: 20px;
  color: black;
  font-weight: bold;
}

#ctnBar input::placeholder{
  color: black;
  font-weight: bold;
  transform: translate(5px,0);
}

#main div:nth-child(2){
  width: 100%;
  height: 70%;
  transform: translate(0,200px);
  display: flex;
  justify-content: center;
  align-items: center;
}

#ctnBar #logo{
  transform: translate(-38px,0);
}
</style>
