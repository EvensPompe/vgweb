<template lang="html">
  <div id="header">
    <div id="hautHead">
      <h1>VGWEB</h1>
      <div id="sign" v-if="!this.auth">
        <router-link to="/connexion" id="connection">connexion</router-link>
        <router-link to="/inscription" id="inscription">inscription</router-link>
      </div>
      <div id="sign" v-else>
        <button id="deconnection" @click="deco">déconnexion</button>
        <router-link v-if="this.admin == false" to="/utilisateur" id="profil">Profil</router-link>
        <router-link v-else to="/admin" id="profil">Admin</router-link>
      </div>
    </div>
      <div id="basHead">
        <h3>Recherchez votre jeu, trouvez vous !!!!</h3>
      </div>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
import { eBus } from '../main.js'
export default {
  name:"myHeader",
  data(){
    return {
      user: '',
      auth: false,
      admin: false
    }
  },
  beforeCreate: function () {
   if (!this.$session.exists()) {
       this.$router.push('/')
   }else {
     let token = this.$session.get('jwt')
     this.user = VueJwtDecode.decode(token);
     eBus.$on('connectChanged',(data)=>{
       this.auth = data;
     })
   }
 },
  created:function () {
    if (!this.$session.exists()) {
      this.auth = false;
    }else {
      if (VueJwtDecode.decode(this.$session.get('jwt')).role == 'admin') {
        this.admin = true;
      }else {
        this.admin = false;
      }
      this.auth = this.$session.exists();
    }
  },
  methods:{
    deco(e){
      e.preventDefault;
      localStorage.removeItem('user')
      this.$session.destroy()
      this.$router.push("/")
      this.auth = false;
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
