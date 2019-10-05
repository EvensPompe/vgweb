<template lang="html">
  <div id="login" >
    <form id="formLogin" v-on:submit="sendSubmit">
      <input type="text" placeholder="Entrez votre nom d'utilisateur" name="nom" v-model="nom">
      <input type="text" placeholder="Entrez votre email d'utilisateur" name="email" v-model="email">
      <input type="text" placeholder="Entrez votre mot de passe d'utilisateur" name="password" v-model="password">
      <button type="submit">Connexion</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'myLogin',
  data(){
    return {
      nom:"",
      email:"",
      password:""
    };
  },
  methods:{
    sendSubmit(e) {
      e.preventDefault();
      this.axios.post("http://localhost/utilisateur/login",{nom:this.nom,email:this.email,password:this.password})
      .then(res=>{
        let user = this.VueJwtDecode.decode(res.data['token'])
        let userData = {
          id: user.id,
          nom: user.nom,
          email: user.email
        };
        console.log(userData);
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css" scoped>
#login{
  width: 100%;
  height: 200px;
  background: black;
}
</style>
