<template lang="html">
  <div id="interAdmin">
      <div id="admin">
        <h1>{{ user.nom }}</h1>
        <h2>Rôle : {{ user.role }}</h2>
        <h2>Email : {{ user.email }}</h2>
      </div>
      <div>
       <button @click="changeOption('Utilisateurs')">
         Utilisateurs
       </button>
       <button @click="changeOption('Jeux')">
         Jeux
       </button>
       <button @click="changeOption('Genres')">
         Genres
       </button>
       <button @click="changeOption('Plateformes')">
         Plateformes
       </button>
       <button @click="changeOption('EditeursDéveloppeurs')">
         Editeurs
         et
         Développeurs
       </button>
      </div>
    <div>
      <component :is="selectedOption"></component>
    </div>
  </div>
</template>

<script>
import Utilisateurs from '../../components/compAdmin/users'
import Jeux from '../../components/compAdmin/jeux'
import Genres from '../../components/compAdmin/genres'
import Plateformes from '../../components/compAdmin/platformes'
import EditeursDéveloppeurs from '../../components/compAdmin/editDev'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name:'admin',
  components:{
    Utilisateurs,
    Jeux,
    Genres,
    Plateformes,
    EditeursDéveloppeurs
  },
  data(){
    return{
      user: '',
      selectedOption:''
    }
  },
  created:function () {
    this.user = VueJwtDecode.decode(this.$session.get('jwt'))
    if (this.user.role != "admin") {
      this.$router.push("/utilisateur")
    }
  },
  methods:{
    changeOption(option){
      switch (option) {
        case 'Utilisateurs':
          this.selectedOption = "Utilisateurs"
          break;
        case 'Jeux':
          this.selectedOption = "Jeux"
          break;
        case 'Genres':
          this.selectedOption = "Genres"
          break;
        case 'Plateformes':
          this.selectedOption = "Plateformes"
          break;
        case 'EditeursDéveloppeurs':
          this.selectedOption = "EditeursDéveloppeurs"
          break;
        default:

      }
    }
  }
}
</script>

<style lang="css" scoped>

@media screen and (min-width:1281px) {
  #interAdmin{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background: #929292;
  }

  #admin{
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: space-around;
    font-size: 16px;
  }

  #interAdmin div:nth-child(2){
    width: 100%;
    height: 10%;
    background: #bebebe;
    display:flex;
    justify-content: space-around;
    align-items: center;
  }

  #interAdmin div:nth-child(2) button{
    width: 20%;
    height: 100%;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #interAdmin div:last-child{
    width: 100%;
    height: 100%;
  }
}

@media screen and (min-width:1024px) and (max-width:1280px) {
  #interAdmin{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background: #929292;
  }

  #admin{
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: space-around;
    font-size: 16px;
  }

  #interAdmin div:nth-child(2){
    width: 100%;
    height: 10%;
    background: #bebebe;
    display:flex;
    justify-content: space-around;
    align-items: center;
  }

  #interAdmin div:nth-child(2) button{
    width: 20%;
    height: 100%;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #interAdmin div:last-child{
    width: 100%;
    height: 100%;
  }
}

@media screen and (min-width:769px) and (max-width:1023px) {
  #interAdmin{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background: #929292;
  }

  #admin{
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: space-around;
    font-size: 16px;
  }

  #interAdmin div:nth-child(2){
    width: 100%;
    height: 10%;
    background: #bebebe;
    display:flex;
    justify-content: space-around;
    align-items: center;
  }

  #interAdmin div:nth-child(2) button{
    width: 20%;
    height: 100%;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: 'Comic Sans MS',sans-serif;
    font-weight: bold;
  }

  #interAdmin div:last-child{
    width: 100%;
    height: 100%;
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
  #interAdmin{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background: #929292;
  }

  #admin{
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: space-around;
    font-size: 16px;
  }

  #interAdmin div:nth-child(2){
    width: 100%;
    height: 10%;
    background: #bebebe;
    display:flex;
    justify-content: space-around;
    align-items: center;
  }

  #interAdmin div:nth-child(2) button{
    width: 20%;
    height: 100%;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #interAdmin div:last-child{
    width: 100%;
    height: 100%;
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
  #interAdmin{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background: #929292;
  }

  #admin{
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: space-around;
    font-size: 16px;
  }

  #interAdmin div:nth-child(2){
    width: 100%;
    height: 10%;
    background: #bebebe;
    display:flex;
    justify-content: space-around;
    align-items: center;
  }

  #interAdmin div:nth-child(2) button{
    width: 20%;
    height: 100%;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-weight: bold;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #interAdmin div:last-child{
    width: 100%;
    height: 100%;
  }
}
</style>
