import types from "~/types/index";
var auth = types.auth;

export const state = () => ({
    token: null,
});

export const getters = {
    isLoggedIn(state) {
        if (state.token || sessionStorage.getItem('token')) return true;
        return false;
    },
}

export const mutations =  {
    [auth.SET_TOKEN](state,payload) {
        state.token = payload
        sessionStorage.setItem('token', payload)
    },

    [auth.LOG_OUT](state) { 
        state.token = null;
        sessionStorage.removeItem('token')
    }
};

export const actions = {

    /**
     * Login To dashboard
     * 
     * @param {string} payload.email under which email is sent
     * @param {string} payload.password  under which password is sent
     * 
     */
    async [auth.login]({ state, dispatch, commit, getters }, payload) {
        const id = auth.login;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$post('/login', payload);
            if(res) {
                commit(auth.SET_TOKEN, res.token);
                $nuxt.$router.push('/')
                setTimeout(() => {
                    dispatch("handleSuccess", { text: 'Successfully login!' }, { root: true });
                }, 500);
            }
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
        
    },

    /**
     * Log Out of Dashboard
     * 
     * Removes Token From Session Storage
     * 
     */
    [auth.logout]({ commit }) {
        commit(auth.LOG_OUT);
        $nuxt.$router.push('/login');
    }
}