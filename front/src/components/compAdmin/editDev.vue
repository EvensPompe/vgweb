<template lang="html">
  <div id="editDev">
    <h1>Editeurs/Développeurs</h1>
    <div>
      <div v-for="editDev in editDevs" :key="editDevs.id">
        <div class="editDev">
          <h3>  </h3>
          <h3>  </h3>
          <h3>  </h3>
        </div>
        <div class="option" :id="editDev.id">
          <button type="button" name="button">Accéder</button>
          <button type="button" name="button">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'editDev',
  data(){
    return{
      editDevs:''
    }
  },
  created:function () {
    this.getEditDevs();
  },
  methods:{
    getEditDevs(){
      this.axios.get('http://localhost:3000/editDev/all',{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             console.log(res);
             console.log(res.data);
             this.editDevs = res.data
           }).catch(err=>{
             console.log(err);
        })
    }
  }
}
</script>

<style lang="css" scoped>

#editDev{
  width: 100%;
  height: 100%;
  background: blue;
}

#editDev div{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

#editDev div div{
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
}

#editDev div .editDev,.option{
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: column;
}

#editDev div .option button{
  width: 50%;
  height: 30%;
}

#editDev div .option{
  display: flex;
  justify-content: flex-end;
}
</style>
