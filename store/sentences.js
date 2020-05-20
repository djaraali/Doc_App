import types from "~/types/index";
const sentence = types.sentences

export const state = () => ({
    sentences: [],
});

export const mutations =  {
    [sentence.ADD_NEW_SENTENCE](state, payload) {
        state.sentences.unshift(payload)
    },

    [sentence.SET_SENTENCES_LIST](state, payload) {
        state.sentences = payload
    },

    [sentence.REMOVE_SENTENCE](state, payload) {
        payload.map(id => {
            let index = state.sentences.findIndex(sen => sen._id == id);
            state.sentences.splice(index, 1);
        })
    },
    [sentence.UPDATE_SENTENCE](state, payload) {
        let index = state.sentences.findIndex(sen => sen._id == payload._id);
        Object.assign(state.sentences[index], payload)
        
    },
};

export const actions = { 

    /**
     * Add New Sentence
     * 
     * @param {string} payload.sentence user inputs a string of sentence
     * 
     */
    async [sentence.addNewSentence]({ commit, dispatch }, payload) { 
        const id = sentence.addNewSentence;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$post('/sentences', payload);
            commit(sentence.ADD_NEW_SENTENCE, res)
            dispatch('handleSuccess', { text: 'A new Sentence Successfully added!'}, { root: true })
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Get Sentences List
     */
    async [sentence.getSentencesList]({ commit, dispatch }, payload) { 
        const id = sentence.getSentencesList;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$get('/sentences/list', payload);
            commit(sentence.SET_SENTENCES_LIST, res)
            // dispatch('handleSuccess', { text: 'A new Sentence Successfully added!'}, { root: true })
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Remove Sentence From List
     */
    async [sentence.removeSentence]({ commit, dispatch }, payload) { 
        const id = sentence.removeSentence;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$delete(`/sentences`, { data: payload });
            
            commit(sentence.REMOVE_SENTENCE, payload)
            dispatch('handleSuccess', { text: 'Successfully removed!'}, { root: true })
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },
    
    /**
     * Update Sentence In List
     */
    async [sentence.updateSentense]({ commit, dispatch }, payload) { 
        const id = sentence.updateSentense;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$put(`/sentences/${payload.id}`, payload.data);
            res.sentence = payload.data.sentence
            commit(sentence.UPDATE_SENTENCE, res)
            dispatch('handleSuccess', { text: 'Sentence updated!'}, { root: true })
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },
}