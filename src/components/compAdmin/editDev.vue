<template lang="html">
  <div id="editDev">
    <h1>Editeurs/
      Développeurs</h1>
    <button type="button" name="button" @click="ajout" v-show="single == false">Ajouter/modifier</button>
    <div v-if="single == false">
      <div v-for="editDev in editDevs" :key="editDevs.id">
        <div class="editDev">
          <h3> {{editDev.nom}} </h3>
        </div>
        <div class="option" :id="editDev.id">
          <button type="button" name="button" @click="acc(editDev.id)">Accéder</button>
          <button type="button" name="button" @click="sup(editDev.id)">Supprimer</button>
        </div>
      </div>
    </div>
    <div v-else>
      <component :editDevId="idEditDev" @retour="back" :is="compSelect"></component>
    </div>
  </div>
</template>

<script>
import ajoutEditDev from './ajoutEditDev'
import editDevInfo from './editDevInfo'
export default {
  name:'editDev',
  components:{
    editDevInfo,
    ajoutEditDev
  },
  data(){
    return{
      editDevs:'',
      compSelect:'',
      idEditDev:'',
      single:false
    }
  },
  created:function () {
    this.getEditDevs();
  },
  methods:{
    getEditDevs(){
      this.axios.get('http://localhost:3000/editDev/all',{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
           .then(res=>{
             this.editDevs = res.data
           }).catch(err=>{
             console.log(err);
        })
    },
    acc(id){
      this.single = true;
      this.idEditDev = id;
      this.compSelect = 'editDevInfo'
    },
    sup(id){
      this.axios.delete(`http://localhost:3000/editDev/delete/${id}`,{headers:{
           "Access-Control-Allow-Origin": "*",
           "Authorization": `bearer ${JSON.parse(localStorage.getItem('user'))}`}})
        .then(res=>{
          alert(res.data)
        }).catch(err=>{
          console.log(err);
      })
    },
    ajout(){
      this.single = true;
      this.compSelect = 'ajoutEditDev';
    },
    back(event){
      this.single = event;
    }
  }
}
</script>

<style lang="css" scoped>

@media screen and (min-width:1281px) {
  #editDev{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  #editDev button{
    width: 170px;
    height: 8%;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #editDev div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  #editDev div div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
  }

  #editDev div .editDev{
    width: 30%;
    display: flex;
    flex-flow: column;
  }

  #editDev div .option button{
    width: 100px;
    margin-left: 4px;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #editDev div .option{
    width: 40%;
    display: flex;
    height: 40%;
    justify-content: center;
    align-items: center;
    flex-flow: row;
  }
}

@media screen and (min-width:1024px) and (max-width:1280px) {
  #editDev{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  #editDev button{
    width: 170px;
    height: 8%;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #editDev div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  #editDev div div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
  }

  #editDev div .editDev{
    width: 30%;
    display: flex;
    flex-flow: column;
  }

  #editDev div .option button{
    width: 100px;
    margin-left: 4px;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #editDev div .option{
    width: 40%;
    display: flex;
    height: 40%;
    justify-content: center;
    align-items: center;
    flex-flow: row;
  }
}

@media screen and (min-width:769px) and (max-width:1023px) {
  #editDev{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  #editDev button{
    width: 170px;
    height: 8%;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #editDev div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  #editDev div div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
  }

  #editDev div .editDev{
    width: 30%;
    display: flex;
    flex-flow: column;
  }

  #editDev div .option button{
    width: 100px;
    margin-left: 4px;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #editDev div .option{
    width: 40%;
    display: flex;
    height: 40%;
    justify-content: center;
    align-items: center;
    flex-flow: row;
  }
}

@media screen and (min-width:481px) and (max-width:768px) {
  #editDev{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  #editDev button{
    width: 170px;
    height: 8%;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #editDev div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  #editDev div div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
  }

  #editDev div .editDev{
    width: 30%;
    display: flex;
    flex-flow: column;
  }

  #editDev div .option button{
    width: 100px;
    margin-left: 4px;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #editDev div .option{
    width: 40%;
    display: flex;
    height: 40%;
    justify-content: center;
    align-items: center;
    flex-flow: row;
  }
}

@media screen and (min-width:320px) and (max-width:480px) {
  #editDev{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  #editDev button{
    width: 170px;
    height: 8%;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #editDev div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  #editDev div div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
  }

  #editDev div .editDev{
    width: 30%;
    display: flex;
    flex-flow: column;
    font-size: 12px;
  }

  #editDev div .option button{
    width: 100px;
    margin-left: 4px;
    height: 30px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    font-family: 'Comic Sans MS',sans-serif;
  }

  #editDev div .option{
    width: 40%;
    display: flex;
    height: 40%;
    justify-content: center;
    align-items: center;
    flex-flow: row;
  }
}
</style>
