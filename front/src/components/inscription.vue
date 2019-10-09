<template lang="html">
  <div id="inscription" >
    <h1>INSCRIPTION</h1>
    <form id="formInsc" v-on:submit="sendSubmit">
      <label for="nom">Nom d'utilisateur</label>
      <input type="text" placeholder="Entrez votre nom d'utilisateur" name="nom" v-model="nom">
      <label for="email">Email</label>
      <input type="text" placeholder="Entrez votre email d'utilisateur" name="email" v-model="email">
      <label for="password">Mot de passe</label>
      <input type="text" placeholder="Entrez votre mot de passe d'utilisateur" name="password" v-model="password">
      <label for="role">Êtes-vous ?</label>
      <select id="roleInsc" name="role" v-model="role">
        <option>joueur</option>
        <option>presse</option>
      </select>
      <button type="submit">Inscription</button>
    </form>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: "Insc",
  data(){
   return{
     nom: '',
     email:'',
     password:'',
     role:''
   }
 },
 methods: {
   sendSubmit(e) {
     e.preventDefault();
     console.log(this.axios);
     this.axios.post("http://localhost:3000/utilisateur/register",{nom:this.nom,email:this.email,password:this.password,role:this.role})
     .then(res=>{
       console.log(res.data['token']);
       let user = VueJwtDecode.decode(res.data['token'])
       let userData = {
         id: user.id,
         nom: user.nom,
         email: user.email,
         role: user.role
       };
      this.$router.push("/");
       console.log(userData);
     }).catch(err=>{
       console.log(err);
     })
   }
 }
}

</script>

<style lang="css" scoped>

#inscription{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}

#inscription #formInsc{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
}

#formInsc input,button,select{
  width: 450px;
  height: 40px;
}

#formInsc input,select{
  background: none;
  border: 4px black solid;
  border-radius: 10px;
  font-size: 20px;
  font-family: 'Comic Sans MS',sans-serif;
}

#formInsc input::placeholder,label{
  font-size: 20px;
  font-family: 'Comic Sans MS',sans-serif;
  color: black;
}

#formInsc button{
  background: none;
  border: 2px black solid;
  border-radius: 10px;
  font-size: 20px;
  font-family: 'Comic Sans MS',sans-serif;
  font-weight: bold;
}

</style>
