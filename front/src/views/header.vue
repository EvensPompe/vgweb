<template lang="html">
  <div id="header">
    <div id="hautHead">
      <h1>VGWEB</h1>
      <div id="sign" v-if="!this.$session.exists()">
        <router-link to="/connexion" id="connection">connection</router-link>
        <router-link to="/inscription" id="inscription">inscription</router-link>
      </div>
      <div id="sign" v-else>
        <button id="deconnection" @click="deco">déconnection</button>
        <router-link to="/profil" id="profil">profil</router-link>
      </div>
    </div>
      <div id="basHead">
        <h3>Recherchez votre jeu, trouvez vous !!!!</h3>
      </div>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name:"myHeader",
  data(){
    return {
      user: '',
    }
  },
  beforeCreate: function () {
   if (!this.$session.exists()) {
       this.$router.push('/connexion')
   }else {
     console.log(this.$session.get('jwt'));
     console.log(this.$session.id());
     let token = this.$session.get('jwt')
     this.user = VueJwtDecode.decode(token);
     console.log(this.user.email);
   }
 },
  created:function () {
    console.log(this.$router.currentRoute);
    console.log(this.isOnline)
    console.log(this.$session.get('jwt'));
    if (!this.token) {
      this.auth = false;
    }else {
      this.auth = true;
    }
    // this.user = VueJwtDecode.decode(this.user);
  },
  methods:{
    deco(e){
      e.preventDefault;
      console.log(this.user.email);
      // this.axios.get(`http://localhost:3000/utilisateur/deco/${this.user.email}`)
      //   .then(res=>{
      //     console.log(res.data['token']);
          // if (res.data['token'] === undefined) {
          //   return false;
          // }else {
          //    let userToken = JSON.stringify(res.data['token']);
          //    localStorage.setItem('user',userToken);
          //   this.$router.push("/")
          // }
          this.$session.destroy()
          this.$router.push('/')
        // }).catch(err=>{
        //   console.log(err);
        // })
    }
  }
}
</script>

<style lang="css" scoped>
#header{
  width: 100%;
  height: 200px;
  background: black;
  color: White;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
}

#hautHead{
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#header h1{
  font-size: 72px;
  margin-left: 96px;
}

#sign{
  width: 30%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center
}

#sign #inscription,#connection,#deconnection,#profil{
  width: 125px;
  height: 40px;
  font-size: 24px;
  background: none;
  border: 2px white solid;
  color: white;
  border-radius: 15px;
  text-decoration: none;
  text-align: center;
}

#sign #deconnection{
  width: 175px;
}

#sign #inscription:hover,#connection:hover,#deconnection:hover,#profil:hover{
  background: #bebebe;
  color: black;
  transition: 0.3s;
}

#sign #inscription:active,#connection:active,#deconnection:active,#profil:active{
  background: white;
  color: black;
}

#basHead{
  width: 100%;
  height: 50px;
  font-size: 24px;
  background: grey;
  display: flex;
  color: black;
}

#basHead h3{
 transform: translate(223px,0);
}


</style>
