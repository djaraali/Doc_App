import types from "~/types/index";
const library = types.library;

export const state = () => ({
    showConsultationModal: false,
    library: [],
    selection: [],
    prescribedMedicineList: [],
    category: [],
    consultation: null,
    treatment: null,
    diagnose: null,
    activeTab: null,
    onGetFromLibrary: null,
    libraryData: { }
});

export const getters = {
    getItemById(state) {
        return (id) => {
            let x = null;
            state.library.forEach(element => {
                if(element.children) {
                    element.children.forEach(item => {
                        if(item.children) {
                            item.children.forEach(k => {
                                if(k.id == id) x = k;
                            })
                        }
                    })
                }
            });

            return x;
        }
    },
    
}

export const mutations =  {
    [library.CHANGE_CONSULTATION_MODAL_STATUS] (state, payload) {
        state.showConsultationModal = payload;
    },
    [library.SET_LIBRARY](state, payload) {
        state.library = payload
    },
    [library.SET_CATEGORY](state, payload) {
        state.category = payload
    },
    [library.SET_SELECTION](state, payload) {
        state.selection = payload
    },
    [library.SET_CONSULTATION](state, payload) {
        state.consultation = payload
    },
    [library.SET_TREATMENT](state, payload) {
        state.treatment = payload
    },
    [library.SET_DIAGNOSE](state, payload) {
        state.diagnose = payload
    },
    [library.ADD_PRESCRIBED_MEDICINE] (state, payload) {
        state.prescribedMedicineList.push(payload);
    },
    [library.UPDATE_PRESCRIBED_MEDICINE] (state, payload) {
        Object.assign(state.prescribedMedicineList[payload.index], payload.data)
    },
    [library.DELETE_PRESCRIBED_MEDICINE] (state, payload) {
        state.prescribedMedicineList.splice(payload, 1);
    },
    [library.CLEAR_PRESCRIBED_MEDICINE] (state) {
        state.prescribedMedicineList = [];
    },
    [library.SET_PRESCRIBED_MEDICINE_LIST] (state, payload) {
        state.prescribedMedicineList = payload;
    },
    [library.SET_ACTIVE_TAB] (state, payload) {
        state.activeTab = payload;
    },
    [library.SET_ON_GET_FROM_LIBRARY] (state, payload) {
        state.onGetFromLibrary = Math.random();
    },
    [library.SET_LIBRARY_DATA] (state, payload) {
        state.libraryData = payload;
    }
};

export const actions = {
    getActiveTab({state}) {
        return state.activeTab;
    },

    [library.chnageConsultationModalStatus] ({ commit }, payload) {
        commit(library.CHANGE_CONSULTATION_MODAL_STATUS, payload);
    },

    /**
     * Add items to library
     *
     * @param {string} payload.category under which category the item will be saved (e.g. consultation/diagnosis/treatment..)
     * @param {string} payload.subcategory subcategory (lung/brain/teeth ..)
     * @param {string} payload.content content
     */
    [library.addToLibrary]({ dispatch, commit }, payload) {
        const id = library.addToLibrary;

        try {
            dispatch("start", id, { root: true });

            dispatch("handleSuccess", {  }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     *Save Selection From Library List
     *
     *
     */
    async [library.addSelection]({ dispatch, commit }, payload) {
        const id = library.addSelection;

        try {
            dispatch("start", id, { root: true });
            // let res = await this.$axios.$get('/library', payload);
            commit(library.SET_SELECTION, payload)
            // dispatch("handleSuccess", {  }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     *Get Library List
     *
     *
     */
    async [library.getLibrary]({ dispatch, commit }, payload) {
        const id = library.getLibrary;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$get('/library', payload);
            commit(library.SET_LIBRARY, res)
            dispatch("handleSuccess", {  }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     *Get Category List
     *
     *
     */
    async [library.getCategory]({ dispatch, commit }, payload) {
        const id = library.getCategory;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$get('/category', payload);
            commit(library.SET_CATEGORY, res)
            dispatch("handleSuccess", {  }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Remove item from library
     *
     * @param {string} payload._id id of the item
     */
    [library.removeFromLibrary]({ dispatch, commit }, payload) {
        const id = library.removeFromLibrary;

        try {
            dispatch("start", id, { root: true });

        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Add new Consultation
     *
     * @param {string} payload.category under which category the item will be saved (e.g. consultation/diagnosis/treatment..)
     *
     */
    async [library.addConsultation]({ dispatch, commit }, payload) {
        const id = library.addConsultation;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$post('/consultation', payload);
            dispatch("handleSuccess", { text: 'A new Consultation Successfully added!' }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Get Consultation By Id
     *
     *
     */
    async [library.getConsultation]({ dispatch, commit }, payload) {
        const id = library.getConsultation;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$get(`/consultation/${payload.id}`);
            commit(library.SET_CONSULTATION, res);
            // dispatch("handleSuccess", { text: 'A new Consultation Successfully added!' }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * update Consultation
     *
     * @param {string} payload.category under which category the item will be saved (e.g. consultation/diagnosis/treatment..)
     *
     */
    async [library.updateConsultation]({ dispatch, commit }, payload) {
        const id = library.updateConsultation;
        
        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$put(`/consultation/${payload.id}`, payload.data);
            dispatch("handleSuccess", { text: 'Consultation updated Successfully added!' }, { root: true });
            Promise.resolve(res);
            return res;
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * remove Consultation
     *
     * @param {string} payload.category under which category the item will be saved (e.g. consultation/diagnosis/treatment..)
     *
     */
    async [library.removeConsultation]({ dispatch, commit }, payload) {
        const id = library.removeConsultation;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$delete(`/consultation/${payload.id}`);
            dispatch("handleSuccess", { text: 'Consultation remove Successfully!' }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Add new Treatment
     *
     * @param {string} payload.category under which category the item will be saved (e.g. consultation/diagnosis/treatment..)
     *
     */
    async [library.addTreatment]({ dispatch, commit }, payload) {
        const id = library.addTreatment;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$post('/treatment', payload);
            dispatch("handleSuccess", { text: 'A new Treatment Successfully added!' }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Get Treatment By Id
     *
     *
     */
    async [library.getTreatment]({ dispatch, commit }, payload) {
        const id = library.getTreatment;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$get(`/treatment/${payload.id}`);
            commit(library.SET_TREATMENT, res);
            // dispatch("handleSuccess", { text: 'A new Consultation Successfully added!' }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * update Treatment
     *
     * @param {string} payload.category under which category the item will be saved (e.g. consultation/diagnosis/treatment..)
     *
     */
    async [library.updateTreatment]({ dispatch, commit }, payload) {
        const id = library.updateTreatment;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$put(`/treatment/${payload.id}`, payload.data);
            dispatch("handleSuccess", { text: 'Treatment updated Successfully added!' }, { root: true });
            Promise.resolve(res);
            return res;
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * remove Treatment
     *
     * @param {string} payload.category under which category the item will be saved (e.g. consultation/diagnosis/treatment..)
     *
     */
    async [library.removeTreatment]({ dispatch, commit }, payload) {
        const id = library.removeTreatment;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$delete(`/treatment/${payload.id}`);
            dispatch("handleSuccess", { text: 'Treatment remove Successfully!' }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Add new Diagnose
     *
     * @param {string} payload.category under which category the item will be saved (e.g. consultation/diagnosis/treatment..)
     *
     */
    async [library.addDiagnose]({ dispatch, commit }, payload) {
        const id = library.addDiagnose;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$post('/diagnose', payload);
            dispatch("handleSuccess", { text: 'A new Diagnose Successfully added!' }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Get Diagnose By Id
     *
     *
     */
    async [library.getDiagnose]({ dispatch, commit }, payload) {
        const id = library.getDiagnose;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$get(`/diagnose/${payload.id}`);
            commit(library.SET_DIAGNOSE, res);
            // dispatch("handleSuccess", { text: 'A new Consultation Successfully added!' }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * update Treatment
     *
     * @param {string} payload.category under which category the item will be saved (e.g. consultation/diagnosis/treatment..)
     *
     */
    async [library.updateDiagnose]({ dispatch, commit }, payload) {
        const id = library.updateDiagnose;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$put(`/diagnose/${payload.id}`, payload.data);
            dispatch("handleSuccess", { text: 'Diagnose updated Successfully added!' }, { root: true });
            Promise.resolve(res);
            return res;
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * remove Diagnose
     *
     * @param {string} payload.category under which category the item will be saved (e.g. consultation/diagnosis/treatment..)
     *
     */
    async [library.removeDiagnose]({ dispatch, commit }, payload) {
        const id = library.removeDiagnose;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$delete(`/diagnose/${payload.id}`);
            dispatch("handleSuccess", { text: 'Diagnose remove Successfully!' }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },


    /**
     * Add new Prescription
     *
     * @param {string} payload.category under which category the item will be saved (e.g. consultation/diagnosis/treatment..)
     *
     */
    async [library.addPrescription]({ dispatch, commit }, payload) {
        const id = library.addPrescription;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$post('/prescription', payload);
            dispatch("handleSuccess", { text: 'A new Prescription Successfully added!' }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * update Treatment
     *
     * @param {string} payload.category under which category the item will be saved (e.g. consultation/diagnosis/treatment..)
     *
     */
    async [library.updatePrescription]({ dispatch, commit }, payload) {
        const id = library.updatePrescription;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$put(`/prescription/${payload.id}`, payload.data);
            dispatch("handleSuccess", { text: 'Prescription updated Successfully added!' }, { root: true });
            Promise.resolve(res);
            return res;
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * remove Diagnose
     *
     * @param {string} payload.category under which category the item will be saved (e.g. consultation/diagnosis/treatment..)
     *
     */
    async [library.removePrescription]({ dispatch, commit }, payload) {
        const id = library.removePrescription;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$delete(`/prescription/${payload.id}`);
            dispatch("handleSuccess", { text: 'Prescription remove Successfully!' }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    [library.addPrescribedMedicine] ({ commit, dispatch }, payload) {
        commit(library.ADD_PRESCRIBED_MEDICINE, payload);
    },

    [library.updatePrescribedMedicine] ({ commit, dispatch }, payload) {
        commit(library.UPDATE_PRESCRIBED_MEDICINE, payload);
    },

    [library.deletePrescribedMedicine] ({ commit, dispatch }, payload) {
        commit(library.DELETE_PRESCRIBED_MEDICINE, payload);
    },

    [library.clearPrescribedMedicine] ({ commit }) {
        commit(library.CLEAR_PRESCRIBED_MEDICINE);
    },

    [library.setPrescribedMedicineList] ({ commit }, payload) {
        commit(library.SET_PRESCRIBED_MEDICINE_LIST, payload)
    },

    [library.setActiveTab] ({ commit }, payload) {
        commit(library.SET_ACTIVE_TAB, payload);
    },

    [library.setLibraryData] ({ commit }, payload) {
        commit(library.SET_LIBRARY_DATA, payload)
    },

    [library.setOnGetFromLibrary] ({ commit }, payload) {
        commit(library.SET_ON_GET_FROM_LIBRARY, payload)
    }

}
