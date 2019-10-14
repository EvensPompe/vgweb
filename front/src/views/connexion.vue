<template lang="html">
  <div id="login" >
    <h1>CONNEXION</h1>
    <form id="formLogin" v-on:submit="sendSubmit">
      <label for="nom">Nom d'utilisateur</label>
      <input type="text" placeholder="Entrez votre nom d'utilisateur" name="nom" v-model="nom">
      <label for="email">Email</label>
      <input type="text" placeholder="Entrez votre email d'utilisateur" name="email" v-model="email">
      <label for="password">Mot de passe</label>
      <input type="text" placeholder="Entrez votre mot de passe d'utilisateur" name="password" v-model="password">
      <button type="submit">Connexion</button>
    </form>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'myConnection',
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
      this.axios.post("http://localhost:3000/utilisateur/login",{nom:this.nom,email:this.email,password:this.password},{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tIjoic2hhZG93LXNhbWEiLCJlbWFpbCI6InNoYWRvd3NhbWFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkM2dqQXEyS1kvSVgwYXMvYTdwL3RMdTNBQWtTM1RaZHl5cXZaMkdrZXJ1cHdkakM3cGVlYUsiLCJyb2xlIjoiam91ZXVyIiwiaXNDb25uZWN0ZWQiOnRydWUsImlhdCI6MTU3MTA2MTc3MCwiZXhwIjoxNTcxMTA0OTcwfQ.3uVr4uZxTzZkB_vdVpkaoGItUhB6oGqW_YdEodBowEU`}})
      .then(res=>{
        console.log(res.data['token']);
        let user = VueJwtDecode.decode(res.data['token'])
        let userData = {
          id: user.id,
          nom: user.nom,
          email: user.email
        };
        // let userToken = JSON.stringify(res.data['token']);
        // localStorage.setItem('user',userToken);
        this.$session.start()
        this.$session.set('jwt', res.data['token'])
        this.$router.push("/")
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
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}

#formLogin{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
}

#formLogin input,button{
  width: 450px;
  height: 40px;
}

#formLogin input{
  background: none;
  border: 4px black solid;
  border-radius: 10px;
  font-size: 20px;
  font-family: 'Comic Sans MS',sans-serif;
}

#formLogin input::placeholder,label{
  font-size: 20px;
  font-family: 'Comic Sans MS',sans-serif;
  color: black;
}

#formLogin button{
  background: none;
  border: 2px black solid;
  border-radius: 10px;
  font-size: 20px;
  font-family: 'Comic Sans MS',sans-serif;
  font-weight: bold;
}
</style>
