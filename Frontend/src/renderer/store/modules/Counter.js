const state = {
    main: 0,
    patient: {},
    prescriptions: {}
};

const mutations = {
    DECREMENT_MAIN_COUNTER (state) {
        state.main--
    },
    INCREMENT_MAIN_COUNTER (state) {
        state.main++
    },
    setPatient(patient) {
        state.patient = patient;
    },
    setPresciptions(prescriptions) {
        state.prescriptions = prescriptions;
    }
};

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
};

export default {
  state,
  mutations,
  actions
}
