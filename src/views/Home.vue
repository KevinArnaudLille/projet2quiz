<template>
  <div class="home">
    <div id="choixCategorie" v-if="!(startQuestion && lireIsModeSelected)">
      <p id="chooseCat">Choisir une catégorie :</p>
      <button id="worldBtn" @click="hasSelectedMode('world')">Monde</button
      ><br />
      <button
        class="continentsBtn"
        v-for="(continent, index) in continents"
        :key="index"
        @click="hasSelectedMode(continent[0])"
      >
        {{ continent[1] }}
      </button>
    </div>
    <div v-else><br>
      <div id="score">
        Le score est de {{ lireResultat[0] }} sur {{ lireResultat[2] }}
        <button id="resetBtn" @click="activeReset">Recommencer</button>
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
        vm.randomPays=vm.lireCurrentPays;
        vm.startQuestion = true;
      });
    } else {
      next();
    }
  },
  computed: {
    lireCurrentPays(){
return this.$store.state.currentPays;
    },
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
      this.$store.commit("setCurrentPays", this.randomPays);
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
      this.$store.commit("modeIsChanged");
    },
    activeReset(){
      console.log("reset");
      this.$store.commit("modeIsChanged");
      this.$store.commit("reset");
    },
  },
};
</script>

<style>
#chooseCat {
  font-size: 1.5rem;
}

#worldBtn {
  font-size: 1.5rem;
  padding: 5px;
  border-radius: 2px;
  margin: 5px;
  font-weight: bold;
}

.continentsBtn {
  font-size: 1.2rem;
  padding: 4px;
  border-radius: 2px;
  margin: 4px;
}

.continentsBtn:hover,
#worldBtn:hover {
  color: white;
  background-color: #2c3e50;
}

#score {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-style: italic;
}

#resetBtn{
  margin-left: 10px;
  font-size: 1rem;
}
</style>