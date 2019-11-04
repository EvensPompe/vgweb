<template lang="html">
  <div id="userInter">
    <div id="user">
      <div>
        <h1>{{ user.nom }}</h1>
        <h2>Rôle : {{ user.role }}</h2>
      </div>
      <div v-if="!modifying">
        <button type="button" name="button" @click='enModif'>MODIFIER</button>
      </div>
      <div v-else>
        <button type="button" name="button" id="enregistrer" @submit='resultModif'>ENREGISTRER</button>
        <button @click='cancel' type="button" name="button" id="annuler">ANNULER</button>
      </div>
    </div>
    <div id="coord" v-if="!modifying">
    <h2>Email : {{ user.email }}</h2>
    <h2>Mot de passe : {{ user.password.slice(0,8)}}</h2>
    </div>
    <form id="coord" v-else>
      <label for="email">Email :</label>
      <input type="text" name="email" v-model="email">
      <label for="oldPassword">Ancien Mot de passe</label>
      <input type="text" name="oldPassword" v-model="oldPassword">
      <label for="newPassword">Nouveau Mot de passe</label>
      <input type="text" name="newPassword" v-model="newPassword">
    </form>
    <div id="notes">
      <h1>NOTES</h1>
     <div v-for="note in this.notes" :key="notes.id" :id="note.id">
      <h3> {{ note.note }}/10 </h3>
      <h4> {{ note.critique }} </h4>
     </div>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name:'utilisateur',
  data(){
    return {
      user: '',
      notes: '',
      modifying:false,
      email: '',
      oldPassword:'',
      newPassword: ''
    }
  },
  created:function () {
    this.user = VueJwtDecode.decode(this.$session.get('jwt'))
    this.getNote(this.user.id);
  },
  methods:{
    getNote(id){
      this.axios.get(`http://localhost:3000/note/all/${id}`,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
      .then(res=>{
        console.log(res.data);
        this.notes = res.data.tbl_notes;
      }).catch(err=>{
        console.log(err);
      })
    },
    enModif(){
        this.modifying = !this.modifying;
    },
    cancel(){
        this.modifying = !this.modifying;
    },
    resultModif(action){
      let data = {
        email:this.email,
        oldPassword:this.oldPassword,
        newOldP:this.user.password,
        newPassword:this.newPassword
      }
        this.axios.put(`http://localhost:3000/utilisateur/modify/${this.user.email}`,data,{headers:{
             "Access-Control-Allow-Origin": "*",
             "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
          .then(res=>{
            localStorage.setItem('user',res.data.token)
            this.$session.set('jwt',res.data.token)
            this.modifying = !this.modifying;
            console.log(res.data.message);
          }).catch(err=>{
            console.log(err);
      })
    }
  }
}
</script>

<style lang="css" scoped>
/* #userInter{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
}

#userInter #user,#notes,#coord{
  width: 100%;
  height: 30%;
}

#userInter #coord{
  background: #bebebe;
  display: flex;
  align-items: center;
  flex-flow: column;
  justify-content: space-around;
  font-size: 16px;
}

#userInter #coord label{
  font-size: 20px;
}

#userInter #coord input{
  width: 60%;
  height: 30px;
  background: none;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 20px;
  font-family: 'Comic Sans MS',sans-serif;
}

#userInter #user{
  background: #929292;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
}

#userInter #user div{
  width: 50%;
  height: 100%;
  display: flex;
}

#userInter #user div:first-child{
  flex-flow: column;
  align-items: center;
}

#userInter #user div:first-child h1{
  font-size: 40px;
}

#userInter #user div:last-child{
  flex-flow: row-reverse;
  justify-content: flex-start;
}

#userInter #user div:last-child button{
  width: 125px;
  height: 40px;
  font-size: 20px;
  background: none;
  border: 2px black solid;
  color: black;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  transform: translate(-20px,20px);
  font-family: 'Comic Sans MS',sans-serif;
}

#userInter #user div:last-child button:first-child{
    width: 150px;
}

#userInter #notes{
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  height: 40%;
}

#userInter #notes h1{
  text-align: center;
}

#userInter #notes div{
  width: 30%;
  height: 100px;
}

#userInter #lowUser{
  display: flex;
  flex-flow: row nowrap;
} */

@media screen and (min-width:1281px) {
  #userInter{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  #userInter #user,#notes,#coord{
    width: 100%;
    height: 30%;
  }

  #userInter #coord{
    background: #bebebe;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: space-around;
    font-size: 16px;
  }

  #userInter #coord label{
    font-size: 20px;
  }

  #userInter #coord input{
    width: 60%;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #userInter #user{
    background: #929292;
    display: flex;
    flex-flow: row;
    justify-content: space-around;
  }

  #userInter #user div{
    width: 50%;
    height: 100%;
    display: flex;
  }

  #userInter #user div:first-child{
    flex-flow: column;
    align-items: center;
  }

  #userInter #user div:first-child h1{
    font-size: 40px;
  }

  #userInter #user div:last-child{
    flex-flow: row-reverse;
    justify-content: flex-start;
  }

  #userInter #user div:last-child button{
    width: 125px;
    height: 40px;
    font-size: 20px;
    background: none;
    border: 2px black solid;
    color: black;
    border-radius: 10px;
    text-decoration: none;
    text-align: center;
    transform: translate(-20px,20px);
    font-family: 'Comic Sans MS',sans-serif;
  }

  #userInter #user div:last-child button:first-child{
      width: 150px;
  }

  #userInter #notes{
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    height: 40%;
  }

  #userInter #notes h1{
    text-align: center;
  }

  #userInter #notes div{
    width: 30%;
    height: 100px;
  }

  #userInter #lowUser{

    display: flex;
    flex-flow: row nowrap;
  }

}

@media screen and (min-width:1024px) and (max-width:1280px) {
  #userInter{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  #userInter #user,#notes,#coord{
    width: 100%;
    height: 30%;
  }

  #userInter #coord{
    background: #bebebe;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: space-around;
    font-size: 16px;
  }

  #userInter #coord label{
    font-size: 20px;
  }

  #userInter #coord input{
    width: 60%;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #userInter #user{
    background: #929292;
    display: flex;
    flex-flow: row;
    justify-content: space-around;
  }

  #userInter #user div{
    width: 50%;
    height: 100%;
    display: flex;
  }

  #userInter #user div:first-child{
    flex-flow: column;
    align-items: center;
  }

  #userInter #user div:first-child h1{
    font-size: 40px;
  }

  #userInter #user div:last-child{
    flex-flow: row-reverse;
    justify-content: flex-start;
  }

  #userInter #user div:last-child button{
    width: 125px;
    height: 40px;
    font-size: 20px;
    background: none;
    border: 2px black solid;
    color: black;
    border-radius: 10px;
    text-decoration: none;
    text-align: center;
    transform: translate(-20px,20px);
    font-family: 'Comic Sans MS',sans-serif;
  }

  #userInter #user div:last-child button:first-child{
      width: 150px;
  }

  #userInter #notes{
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    height: 40%;
  }

  #userInter #notes h1{
    text-align: center;
  }

  #userInter #notes div{
    width: 30%;
    height: 100px;
  }

  #userInter #lowUser{

    display: flex;
    flex-flow: row nowrap;
  }
}

@media screen and (min-width:769px) and (max-width:1023px) {
  #userInter{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  #userInter #user,#notes,#coord{
    width: 100%;
    height: 30%;
  }

  #userInter #coord{
    background: #bebebe;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: space-around;
    font-size: 16px;
  }

  #userInter #coord label{
    font-size: 20px;
  }

  #userInter #coord input{
    width: 60%;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #userInter #user{
    background: #929292;
    display: flex;
    flex-flow: row;
    justify-content: space-around;
  }

  #userInter #user div{
    width: 50%;
    height: 100%;
    display: flex;
  }

  #userInter #user div:first-child{
    flex-flow: column;
    align-items: center;
  }

  #userInter #user div:first-child h1{
    font-size: 40px;
  }

  #userInter #user div:last-child{
    flex-flow: row-reverse;
    justify-content: flex-start;
  }

  #userInter #user div:last-child button{
    width: 125px;
    height: 40px;
    font-size: 20px;
    background: none;
    border: 2px black solid;
    color: black;
    border-radius: 10px;
    text-decoration: none;
    text-align: center;
    transform: translate(-20px,20px);
    font-family: 'Comic Sans MS',sans-serif;
  }

  #userInter #user div:last-child button:first-child{
      width: 150px;
  }

  #userInter #notes{
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    height: 40%;
  }

  #userInter #notes h1{
    text-align: center;
  }

  #userInter #notes div{
    width: 30%;
    height: 100px;
  }

  #userInter #lowUser{

    display: flex;
    flex-flow: row nowrap;
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
  #userInter{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  #userInter #user,#notes,#coord{
    width: 100%;
    height: 30%;
  }

  #userInter #coord{
    background: #bebebe;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: space-around;
    font-size: 16px;
  }

  #userInter #coord label{
    font-size: 20px;
  }

  #userInter #coord input{
    width: 60%;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #userInter #user{
    background: #929292;
    display: flex;
    flex-flow: row;
    justify-content: space-around;
  }

  #userInter #user div{
    width: 50%;
    height: 100%;
    display: flex;
  }

  #userInter #user div:first-child{
    flex-flow: column;
    align-items: center;
  }

  #userInter #user div:first-child h1{
    font-size: 40px;
  }

  #userInter #user div:last-child{
    flex-flow: row-reverse;
    justify-content: flex-start;
  }

  #userInter #user div:last-child button{
    width: 125px;
    height: 40px;
    font-size: 20px;
    background: none;
    border: 2px black solid;
    color: black;
    border-radius: 10px;
    text-decoration: none;
    text-align: center;
    transform: translate(-20px,20px);
    font-family: 'Comic Sans MS',sans-serif;
  }

  #userInter #user div:last-child button:first-child{
      width: 150px;
  }

  #userInter #notes{
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    height: 40%;
  }

  #userInter #notes h1{
    text-align: center;
  }

  #userInter #notes div{
    width: 30%;
    height: 100px;
  }

  #userInter #lowUser{

    display: flex;
    flex-flow: row nowrap;
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
  #userInter{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  #userInter #user,#notes,#coord{
    width: 100%;
    height: 30%;
  }

  #userInter #coord{
    background: #bebebe;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: space-around;
    font-size: 16px;
  }

  #userInter #coord label{
    font-size: 20px;
  }

  #userInter #coord input{
    width: 60%;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #userInter #user{
    background: #929292;
    display: flex;
    flex-flow: row;
    justify-content: space-around;
  }

  #userInter #user div{
    width: 50%;
    height: 100%;
    display: flex;
  }

  #userInter #user div:first-child{
    flex-flow: column;
    align-items: center;
  }

  #userInter #user div:first-child h1{
    font-size: 40px;
  }

  #userInter #user div:last-child{
    flex-flow: row-reverse;
    justify-content: flex-start;
  }

  #userInter #user div:last-child button{
    width: 125px;
    height: 40px;
    font-size: 20px;
    background: none;
    border: 2px black solid;
    color: black;
    border-radius: 10px;
    text-decoration: none;
    text-align: center;
    transform: translate(-20px,20px);
    font-family: 'Comic Sans MS',sans-serif;
  }

  #userInter #user div:last-child button:first-child{
      width: 150px;
  }

  #userInter #notes{
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    height: 40%;
  }

  #userInter #notes h1{
    text-align: center;
  }

  #userInter #notes div{
    width: 30%;
    height: 100px;
  }

  #userInter #lowUser{
    display: flex;
    flex-flow: row nowrap;
  }
}

</style>
