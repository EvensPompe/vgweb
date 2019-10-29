<template lang="html">
  <div id="inscription" >
    <h1>INSCRIPTION</h1>
    <div id="error" v-show="error">
      <h2>Veillez entrer un identifiant ou un mot de passe valide</h2>
    </div>
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
  name: "inscription",
  data(){
   return{
     nom: '',
     email:'',
     password:'',
     role:'',
     auth: false,
     error: false
   }
 },
 methods: {
   sendSubmit(e) {
     e.preventDefault();
     console.log(this.axios);
     this.axios.post("http://localhost:3000/utilisateur/register",{nom:this.nom,email:this.email,password:this.password,role:this.role})
     .then(res=>{
       console.log(res.data['token']);
       let userToken = JSON.stringify(res.data['token']);
       localStorage.setItem('user',userToken);
       this.$router.push("/connexion");
       this.$emit('connected',this.auth)
     }).catch(err=>{
       if (err) {
         this.error = true;
         setTimeout(()=>{
           this.error = false
         },3000)
       }
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

#error{
  width: 68%;
  height: 50px;
  background: #bebebe;
  border: 2px solid #929292;
  text-align: center;
}

</style>
