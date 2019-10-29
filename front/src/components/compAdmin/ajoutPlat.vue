<template lang="html">
<div id="ajoutPlat">
  <form id="platForm">
    <input type="text" placeholder="Entrez le nom de la plateforme" v-model="nom">
    <input type="text" placeholder="Entrez le prix de la plateforme" v-model="prix">
    <input type="date" v-model="lancement">
    <button type="submit" name="button" @click.prevent="sendGenre">Ajouter</button>
    <button type="button" name="button">Annuler</button>
  </form>
</div>
</template>

<script>
export default {
  name:'ajoutPlat',

}
</script>

<style lang="css" scoped>
</style>
