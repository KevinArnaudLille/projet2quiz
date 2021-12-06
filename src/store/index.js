import { createStore } from 'vuex'

export default createStore({
  state: {
    dataPaysVuex: [],
    listTotaleNomPaysVuex: [],
    listNomPaysRestant: [],
    resultat: [0, 0, 0, [], []],
    // resultat => [Bonne, mauvaise, total,[pays trouvés],[pays échoués]]
    isModeSelected: false
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
    modeIsChanged(state, value) {
      if (value === 1) {
        state.isModeSelected = true;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
