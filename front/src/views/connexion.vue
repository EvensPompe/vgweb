<template lang="html">
  <div id="login" >
    <h1>CONNEXION</h1>
    <form id="formLogin" v-on:submit="sendSubmit">
      <label for="nom">Nom d'utilisateur</label>
      <input type="text" placeholder="Entrez votre nom d'utilisateur" name="nom" v-model="nom">
      <label for="email">Email</label>
      <input type="email" placeholder="Entrez votre email" name="email" v-model="email">
      <label for="password">Mot de passe</label>
      <input type="password" placeholder="Entrez votre mot de passe" name="password" v-model="password">
      <button type="submit">Connexion</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'myConnection',
  data(){
    return {
      nom:"",
      email:"",
      password:"",
      auth: false,
      error: false
    };
  },
  methods:{
    sendSubmit(e) {
      e.preventDefault();
      this.axios.post("http://51.91.156.10:3000/utilisateur/login",{nom:this.nom,email:this.email,password:this.password},{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
      .then(res=>{
        let randomToken = JSON.stringify(res.data['randomToken']);
        localStorage.setItem('user',randomToken);
        this.$session.start()
        this.$session.set('jwt', res.data['token'])
        this.$router.push("/")
        this.auth = true;
        window.location.reload();
        this.$emit('connected',this.auth)
      }).catch(err=>{
        alert('Veillez entrer un identifiant ou un mot de passe valide');
      })
    }
  }
}
</script>

<style lang="css" scoped>

#formLogin button:hover{
  background: #bebebe;
  color: black;
  transition: 0.3s;
}

#formLogin button:active{
  background: white;
  color: black;
}

@media screen and (min-width:1281px) {
  #login{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  #formLogin{
    width: 100%;
    height: 50%;
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

  #error{
    width: 68%;
    height: 50px;
    background: #bebebe;
    border: 2px solid #929292;
    text-align: center;
  }
}

@media screen and (min-width:1024px) and (max-width:1280px) {
  #login{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  #formLogin{
    width: 100%;
    height: 50%;
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

  #error{
    width: 68%;
    height: 50px;
    background: #bebebe;
    border: 2px solid #929292;
    text-align: center;
  }
}

@media screen and (min-width:769px) and (max-width:1023px){
  #login{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: flex-start;
  }

  #formLogin{
    width: 100%;
    height: 50%;
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

  #error{
    width: 68%;
    height: 50px;
    background: #bebebe;
    border: 2px solid #929292;
    text-align: center;
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
  #login{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: flex-start;
  }

  #formLogin{
    width: 100%;
    height: 50%;
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

  #error{
    width: 68%;
    height: 50px;
    background: #bebebe;
    border: 2px solid #929292;
    text-align: center;
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
  #login{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: flex-start;
  }

  #formLogin{
    width: 100%;
    height: 50%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
  }

  #formLogin input,button{
    width: 90%;
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

  #error{
    width: 68%;
    height: 50px;
    background: #bebebe;
    border: 2px solid #929292;
    text-align: center;
  }
}
</style>
