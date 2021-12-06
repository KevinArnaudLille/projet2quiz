<template>
  <div class="home">
    <div id="choixCategorie" v-if="!(startQuestion && lireIsModeSelected)">
      <p>Choisir une catégorie :</p>
      <button @click="hasSelectedMode('world')">Monde</button><br />
      <button
        v-for="(continent, index) in continents"
        :key="index"
        @click="hasSelectedMode(continent[0])"
      >
        {{ continent[1] }}
      </button>
    </div>
    <div v-else>
      <div>
        Ton score est de {{ lireResultat[0] }} sur {{ lireResultat[2] }}
      </div>
      <Question v-if="startQuestion" :randomPaysReceived="randomPays" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from "@/components/Question.vue";

export default {
  name: "Home",
  components: {
    Question,
  },
  data() {
    return {
      randomPays: "",
      startQuestion: false,
      continents: [
        ["Asia", "Asie"],
        ["Africa", "Afrique"],
        ["Europe", "Europe"],
        ["North America", "Amérique du Nord"],
        ["Oceania", "Océanie"],
        ["South America", "Amérique du Sud"],
      ],
    };
  },
  beforeRouteEnter: (to, from, next) => {
    if (from.fullPath === "/about") {
      next((vm) => {
        vm.generateRandomPays();
      });
    } else {
      next();
    }
  },
  computed: {
    lirePaysRestant() {
      return this.$store.state.listNomPaysRestant;
    },
    lireResultat() {
      return this.$store.state.resultat;
    },
    lireIsModeSelected() {
      return this.$store.state.isModeSelected;
    },
    lireDataPays() {
      return this.$store.state.dataPaysVuex;
    },
  },
  methods: {
    generateRandomPays() {
      let listTotal = this.lirePaysRestant;
      this.randomPays = listTotal[Math.floor(Math.random() * listTotal.length)];
      this.$store.commit("removeUsedPays", this.randomPays);
      this.startQuestion = true;
    },
    hasSelectedMode(mode) {
      let dataToKeep = [];
      if (mode !== "world") {
        let dataTotal = this.lireDataPays;
        dataToKeep = dataTotal
          .filter((e) => e.continentEn == mode)
          .map((e) => e.nom);
        this.$store.commit("setListPays", dataToKeep);
      }

      this.generateRandomPays();
      this.$store.commit("modeIsChanged", 1);
    },
  },
};
</script>
