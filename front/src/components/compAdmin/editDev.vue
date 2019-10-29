<template lang="html">
  <div id="editDev">
    <h1>Editeurs/Développeurs</h1>
    <div>
      <div v-for="editDev in editDevs" :key="editDevs.id">
        <div class="editDev">
          <h3> {{editDev.nom}} </h3>
          <h3> {{editDev.date}} </h3>
          <h3> {{editDev.siege}} </h3>
          <h3> {{editDev.pays_local}} </h3>
        </div>
        <div class="option" :id="editDev.id">
          <button type="button" name="button" @click="acc(editDev.id)">Accéder</button>
          <button type="button" name="button" @click="sup(editDev.id)">Supprimer</button>
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
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

#editDev div{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

#editDev div div{
  width: 50%;
  height: 20%;
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
  height: 80%;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}

#editDev div .option{
  display: flex;
  height: 40%;
  justify-content: center;
  align-items: center;
}
</style>
