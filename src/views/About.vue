<template>
  <div class="about">
    <div class="cadrePays" v-for="(pays,index) in lireResultat[4]" :key="index">
      <span class="idPays">{{pays.nom}} : </span>
      <img class="draps" :src="pays.lienDrapeau" alt="drapeau">
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  computed: {
    lireDataPays() {
      return this.$store.state.dataPaysVuex;
    },
    lireResultat() {
      return this.$store.state.resultat;
    },
  },
};
</script>

<style>
.about{
    display: flex;
  flex-direction:row;
  justify-content: center;
   align-items: center;
   flex-wrap: wrap;
}
.cadrePays{
  display: flex;
  flex-direction:column;
  justify-content: center;
   align-items: center;
   padding: 10px;
}

.idPays{
  font-size: 1.1rem;
}

.draps {
  width: 150px;
  margin: 0px;
}
</style>