import types from "~/types/index";
const patients = types.patients

export const state = () => ({
    patients: [],
    patient: null
});

export const getters =  {
    // [patients.getSinglePatient](state) {
    //     return (id) => {
    //         return state.patients.find(item => {
    //             return item.id == id;
    //         })
    //     }
    // },
};

export const mutations =  {
    [patients.SET_PATIENTS_LIST](state, payload) {
        state.patients = payload
    },
    [patients.SET_SINGLE_PATIENT](state, payload) {
        state.patient = payload
    }
};

export const actions = {

    /**
     * Get Patients List
     */
    async [patients.getPatients]({ commit, dispatch }, payload) {
        const id = patients.getPatients;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$get('/patients', payload);
            commit(patients.SET_PATIENTS_LIST, res)
            // dispatch('handleSuccess', { text: 'A new Sentence Successfully added!'}, { root: true })
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Get Single Patients
     */
    async [patients.getSinglePatient]({ commit, dispatch }, payload) {
        const id = patients.getSinglePatient;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$get(`/patients/${payload.id}`);
            commit(patients.SET_SINGLE_PATIENT, res)
            // dispatch('handleSuccess', { text: 'A new Sentence Successfully added!'}, { root: true })
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

}
