<template lang="html">
  <div id="users">
    <h1>Utilisateurs</h1>
    <div>
    <div v-for="user in users" :key="users.id">
      <div class="user">
        <h3> Utilisateur:{{user.nom}} </h3>
        <h3> Rôle:{{user.role}} </h3>
      </div>
      <div class="option">
        <button type="button" v-show="user.isactive" name="button" @click="ban(user.id)">Bannir</button>
        <button type="button" v-show="!user.isactive" name="button" @click="deban(user.id)">Débannir</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name:'users',
  data(){
    return{
      users: '',
    }
  },
  created:function () {
    this.getUser();
  },
  methods:{
    getUser(){
      this.axios.get('http://localhost:3000/utilisateur/all',{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             console.log(res);
             this.users = res.data
           }).catch(err=>{
             console.log(err);
        })
    },
    ban(id){
      this.axios.put(`http://localhost:3000/utilisateur/bannir/${id}`,{},{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             console.log(res.data);
           }).catch(err=>{
             console.log(err);
      })
    },
    deban(id){
      this.axios.put(`http://localhost:3000/utilisateur/debannir/${id}`,{},{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             console.log(res.data);
           }).catch(err=>{
             console.log(err);
      })
    }
  }
}
</script>

<style lang="css" scoped>
#users{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

#users div{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

#users div div{
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
}

#users div .user,.option{
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: column;
}

#users div .option button{
  width: 50%;
  height: 30px;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Comic Sans MS',sans-serif;
}

#users div .option{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

</style>
