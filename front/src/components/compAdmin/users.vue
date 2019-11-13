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
        <button type="button" v-show="user.isactive && user.nom != admin.nom" name="button" @click="ban(user.id)">Bannir</button>
        <button type="button" v-show="!user.isactive" name="button" @click="deban(user.id)">Débannir</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name:'users',
  data(){
    return{
      users: '',
      admin: ''
    }
  },
  created:function () {
    this.getUser();
    this.admin = VueJwtDecode.decode(this.$session.get('jwt'));
  },
  methods:{
    getUser(){
      this.axios.get('http://localhost:3000/utilisateur/all',{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
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
             alert(res.data)
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
             alert(res.data)
           }).catch(err=>{
             console.log(err);
      })
    }
  }
}
</script>

<style lang="css" scoped>

@media screen and (min-width:1281px) {
  #users{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    overflow: auto;
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
}

@media screen and (min-width:1024px) and (max-width:1280px) {
  #users{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    overflow: auto;
  }

  #users div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  #users div div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
  }

  #users div .user,.option{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  #users div .option button{
    width: 70px;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #users div .option{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (min-width:769px) and (max-width:1023px) {
  #users{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    overflow: auto;
  }

  #users div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  #users div div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
  }

  #users div .user,.option{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  #users div .option button{
    width: 70px;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #users div .option{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
  #users{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    overflow: auto;
  }

  #users div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  #users div div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
  }

  #users div .user,.option{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  #users div .option button{
    width: 70px;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #users div .option{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
  #users{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    overflow: auto;
  }

  #users div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  #users div div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
  }

  #users div .user,.option{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  #users div .option button{
    width: 70px;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #users div .option{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>
