<template>
  <h1>{{ randomPaysReceived }} ?</h1>
  <div id="boiteChoixDraps">
    <div v-for="(lienDrap, index) in drapPaysQuestions" :key="index">
      <img
        class="propositionsDraps"
        @click="checkReponse(lienDrap)"
        :src="lienDrap"
        alt="drapeau"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    randomPaysReceived: String,
  },
  data() {
    return {
      drapPaysToGuess: "",
      drapPaysQuestions: [],
    };
  },
  computed: {
    lireDataPays() {
      return this.$store.state.dataPaysVuex;
    },
    lireResultat() {
      return this.$store.state.resultat;
    },
  },
  created() {
    this.generateDrap();
  },
  watch: {
    randomPaysReceived() {
      this.generateDrap();
    },
  },
  methods: {
    generateDrap() {
      let dataPays = this.lireDataPays;
      let paysKey = Object.keys(dataPays).find(
        (key) => dataPays[key].nom === this.randomPaysReceived
      );
      this.drapPaysToGuess = dataPays[paysKey].lienDrapeau;

      let allKeyList = [paysKey];
      for (let i = 0; i < 3; i++) {
        let randomKey = Math.floor(Math.random() * dataPays.length);
        if (allKeyList.indexOf(randomKey) === -1) {
          allKeyList.push(randomKey);
        } else {
          i--;
        }
      }
      allKeyList = this.shuffle(allKeyList);

      this.drapPaysQuestions = allKeyList.map(
        (key) => dataPays[key].lienDrapeau
      );
    },
    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    checkReponse(reponse) {
      if (reponse === this.drapPaysToGuess) {
        this.ifBonneReponse();
      } else {
        this.ifMauvaiseReponse();
      }
    },
    ifBonneReponse() {
      this.$store.commit("addResult", 1);
      let dataPays = this.lireDataPays;
      let paysKey = Object.keys(dataPays).find(
        (key) => dataPays[key].nom === this.randomPaysReceived
      );
      this.$store.commit("addPaysSucces", dataPays[paysKey]);
      this.$parent.generateRandomPays();
    },
    ifMauvaiseReponse() {
      this.$store.commit("addResult", 0);
      let dataPays = this.lireDataPays;
      let paysKey = Object.keys(dataPays).find(
        (key) => dataPays[key].nom === this.randomPaysReceived
      );
      this.$store.commit("addPaysFail", dataPays[paysKey]);
      this.$parent.generateRandomPays();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.propositionsDraps {
  height: 100px;
  margin: 20px;
}
#boiteChoixDraps {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
