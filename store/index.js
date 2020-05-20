export const strict = false

export const state = () => ({
    snackbar: {
        text: ''
    },
    deleteConfirmationStatus: false,
    wait: {},
    drawings: [],
    showDrawingCard: false
});


export const getters = {
    is(state) {
        return (payload) => {
            return state.wait[payload];
        }
    },
    any(state) {
        for (let key in state.wait) {
            if (state.wait[key]) {
                return true;
            }
        }
    }
}

export const mutations = {
    START_LOADING(state, payload) {
        var obj = {}
        obj[payload] = true;
        state.wait = Object.assign({}, state.wait, obj)
    },
    STOP_LOADING(state, payload) {
        var obj = {}
        obj[payload] = false;
        state.wait = Object.assign({}, state.wait, obj)
    },

    SET_SNACKBAR_TEXT(state, payload) {
        state.snackbar = { text: payload.text, color: payload.color };
    },
    SET_DELETE_CONFIRMATION_STATUS(state, payload) {
        state.deleteConfirmationStatus = payload;
    },
    SET_DRAWINGS(state, payload) {
        state.drawings = payload;
    },
    SET_SHOW_DRAWING(state, payload) {
        state.showDrawingCard = payload;
        console.log(typeof state.showDrawingCard)
    }


}

export const actions = {
    handleErrors({ dispatch, commit }, error) {
        if(error.response && error.response.data && error.response.data.text) {
            commit('SET_SNACKBAR_TEXT', { text: error.response.data.text, color: 'error' })
        }
    },

    handleSuccess({ dispatch, commit }, payload) {
        if(payload.text) {
            payload.color = 'success'
            commit('SET_SNACKBAR_TEXT', payload)
        }
    },

    showInfo({ dispatch, commit }, payload) {

    },
    showDrawing({ dispatch, commit }, payload) {
        commit('SET_SHOW_DRAWING', payload)
    },

    start({ commit }, payload) {
        commit('START_LOADING', payload)
    },
    end({ commit }, payload) {
        commit('STOP_LOADING', payload)
    },
    setDeleteConfirmationStatus({ commit }, payload) {
        commit('SET_DELETE_CONFIRMATION_STATUS', payload)
    },

    async getDrawings({ commit, dispatch }) {
        const id = 'getDrawings';
        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$get('/drawings');
            commit('SET_DRAWINGS', res)
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },
}
