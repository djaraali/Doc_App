import types from "~/types/index";
const medicines = types.medicines
export const state = () => ({
    medicines: []
});

export const mutations =  {
    [medicines.SET_MEDICINE_LIST](state, payload) {
        state.medicines = payload;
    },
    [medicines.ADD_NEW_MEDICINE](state, payload) {
        state.medicines.unshift(payload)
    },
    [medicines.REMOVE_MEDICINE](state, payload) {
        payload.map(id => {
            let index = state.medicines.findIndex(med => med._id == id);
            state.medicines.splice(index, 1);
        })
    },
    [medicines.UPDATE_MEDICINE](state, payload) {
        let index = state.medicines.findIndex(med => med._id == payload._id);
        Object.assign(state.medicines[index], payload)
    },
};

export const actions = { 

    /**
     * Get Medicine List
    */
    async [medicines.getMedicineList]({ commit, dispatch }, payload) { 
        const id = medicines.getMedicineList;
        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$get('/medicines/list', payload);
            commit(medicines.SET_MEDICINE_LIST, res)
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * 
     * @param {string} payload.medicine_name 
     * @param {string} payload.medicine_type type of medicine like Syrup,  
     * @param {string} payload.strength medicine power like 200mg 100mg
     */
    async [medicines.addNewMedicine]({ commit, dispatch }, payload) {
        const id = medicines.addNewMedicine;
        try {
            dispatch('start', id, { root: true });
            let res = await this.$axios.$post('/medicines', payload);
            commit(medicines.ADD_NEW_MEDICINE, res)
            dispatch('handleSuccess', { text: 'A new Medicine Successfully added!' }, { root: true })
        } catch (error) {
            dispatch("handleErrors", error, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Delete Medicine 
     * 
     * @param {string} payload.id edited item ID 
     * @param {object} payload.data edited medicine 
     * 
     */
    async [medicines.removeMedicine]({ commit, dispatch }, payload) {
        try {
            dispatch('start', medicines.removeMedicine, { root: true })
            await this.$axios.$delete('/medicines', { data: payload });
            commit(medicines.REMOVE_MEDICINE, payload)
            dispatch('handleSuccess', { text: 'Successfully removed Medicine!'}, { root: true })
        } catch (e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch('end', medicines.removeMedicine, { root: true })
        }
    },

    /**
     * Update Sentence In List
     */
    async [medicines.updateMedicine]({ commit, dispatch }, payload) { 
        try {
            dispatch("start", medicines.updateMedicine, { root: true });
            let res = await this.$axios.$put(`/medicines/${payload.id}`, payload.data);
            res._id = payload.id;
            commit(medicines.UPDATE_MEDICINE, res)
            dispatch('handleSuccess', { text: 'Medicine updated!'}, { root: true })
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", medicines.updateMedicine, { root: true });
        }
    },
}