import { createStore } from 'vuex'

export default createStore({
  state: {
    dataPaysVuex: [],
    listTotaleNomPaysVuex: [],
    listNomPaysRestant: [],
    currentPays:"",
    resultat: [0, 0, 0, [], []],
    // resultat => [Bonne, mauvaise, total,[pays trouvés],[pays échoués]]
    isModeSelected: false,
    // RAJOUTER VARIABLE DE STOCKAGE DE LETAT QUAND ON RETOURNE A LA QUESTION DEPUIS LECRAN SCORE
  },
  getters: {
  },
  mutations: {
    setDataPaysVuexValue(state, valueData) {
      state.dataPaysVuex = valueData;
    },
    setTotalNomPaysValue(state, valueNom) {
      state.listTotaleNomPaysVuex = valueNom;
      state.listNomPaysRestant = valueNom;
    },
    removeUsedPays(state, pays) {
      state.listNomPaysRestant = state.listNomPaysRestant.filter(e => e !== pays)
    },
    setListPays(state,listPays){
      state.listNomPaysRestant=listPays
    },
    setCurrentPays(state,pays){
      state.currentPays = pays;
    },
    addResult(state, result) {
      if (result === 1) {
        state.resultat[0]++;
        state.resultat[2]++;
      } else {
        state.resultat[1]++;
        state.resultat[2]++;
      }
    },
    addPaysSucces(state, pays){
      state.resultat[3].push(pays);
    },
    addPaysFail(state, pays){
      state.resultat[4].push(pays);
    },
    modeIsChanged(state) {
        state.isModeSelected = !state.isModeSelected;
    },
    reset(state){
      state.resultat=[0, 0, 0, [], []];
      state.listNomPaysRestant = state.listTotaleNomPaysVuex;
    }
  },
  actions: {
  },
  modules: {
  }
})
