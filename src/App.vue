<template>
  <div v-if="hasClickOnOK">
    <div id="nav">
      <router-link to="/">Le Quiz</router-link>
      <router-link to="/about">Voir les erreurs</router-link>
    </div>
    <router-view />
  </div>
  <div v-else>
    <div>
      <h1>Quiz sur les drapeaux des pays du monde</h1>
      <div id="welcomeMsg">
        Ce projet a été développé à des fins d'entrainement afin d'alimenter mon
        portfolio.
        <br />
        Le framework VueJS est utilisé avec les dépendances Axios, Vue Router et
        VueX.
        <br />
        Les données proviennent de l'API REST Countries.
        <br />
        <br />
        Vous pouvez retrouver l'ensemble de mes projets
        <a href="https://github.com/KevinArnaudLille" target="_blank"
          >ici sur GitHub</a
        >.
        <br />
        <p id="authorName">Kevin Arnaud - 2021</p>
      </div>
    </div>
    <button @click="letsGo" id="goBtn">C'est parti!</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dataPays: [],
      hasClickOnOK: false,
      listTotaleNomPays: [],
    };
  },
  methods: {
    letsGo() {
      this.hasClickOnOK = true;
      axios.get("https://restcountries.com/v3.1/all").then((reponse) => {
        // Construction du dictionnaire de pays avec des data réduites
        this.dataPays = [];
        for (let element of reponse.data) {
          this.dataPays.push({
            nom: element["translations"]["fra"]["common"],
            population: element["population"],
            continentEn: element["continents"],
            superficie: element["area"],
            lienDrapeau: element["flags"]["png"],
            lienMaps: element["maps"]["googleMaps"],
          });
        }
        for (let pays of this.dataPays) {
          this.listTotaleNomPays.push(pays.nom);
        }
        // Pour stocker dans les données dans le store VueX
        this.$store.commit(
          "setDataPaysVuexValue",
          this.dataPays,
          this.listTotaleNomPays
        );
        this.$store.commit("setTotalNomPaysValue", this.listTotaleNomPays);
      });
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100%;
}

#app::before {
  content: "";
  background-image: url("./assets/world-map.jpg");
  z-index: -1;
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.4;
}

h1{
  font-size: 2.2rem;
}

#welcomeMsg{
  font-size: 1.2rem;
}

#nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#authorName{
font-size: 1rem;
font-style: italic; 
}

#goBtn{
  font-size: 1.3rem;
  padding: 3px;
}

#goBtn:hover{
  color: white;
  background-color: #42b983;
}
</style>

