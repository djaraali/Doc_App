import types from "~/types/index";
var profile = types.profile;

export const state = () => ({
    profile: null
});

export const mutations =  {
    // [sentence.UPDATE_PROFILE](state, payload) {
    //     let index = state.sentences.findIndex(sen => sen._id == payload._id);
    //     Object.assign(state.sentences[index], payload)
        
    // },
    [profile.SET_PROFILE](state, payload) {
        state.profile = payload
    },
};

export const actions = {
    
    /**
     * Get Profile
     */
    async [profile.getProfile]({ commit, dispatch }, payload) { 
        const id = profile.getProfile;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$get('/profile', payload);
            commit(profile.SET_PROFILE, res)
            // dispatch('handleSuccess', { text: 'A new Sentence Successfully added!'}, { root: true })
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Update Profile
     * 
     * @param {string} payload.firstname profile first name
     * @param {string} payload.lastname profile last name
     * @param {string} payload.specialist Doctor Speciality on
     * @param {string} payload.profile Doctor profile image
     * @param {string} payload.about content
     */
    async [profile.updateProfile]({ dispatch, commit }, payload) {
        const id = profile.updateProfile;

        try {
            dispatch("start", id, { root: true });
            console.log(payload)
            let res = await this.$axios.$put(`/profile`, payload);
            // commit(profile.UPDATE_PROFILE, res)

            dispatch("handleSuccess", { text: 'Profile successfully updated!' }, { root: true });
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },
    

    
}