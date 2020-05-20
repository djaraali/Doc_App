import types from "~/types/index";
const imageUploader = types.imageUploader;

export const state = () => ({
    consultationDrawingImg: '',
    diagnoseDrawingImg: '',
    treatmentDrawingImg: '',
    prescriptionDrawingImg: ''
});

export const mutations =  {
    [imageUploader.SET_DRAWING_LINK](state, payload) {
        console.log(payload)
        state[`${payload.active_tab}DrawingImg`] = payload.url
    },
};

export const actions = { 
    async [imageUploader.uploadImage]({ dispatch, getters, commit }, payload) { 
        try {
            dispatch("start", imageUploader.uploadImage, { root: true });
            let res = await this.$axios.$post(`/files`, payload);
            return res;
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", imageUploader.uploadImage, { root: true });
        }
    },

    async [imageUploader.uploadDrawing]({ dispatch, commit }, payload) {        
        try {
            dispatch("start", imageUploader.uploadDrawing, { root: true });
            let res = await this.$axios.$post(`/drawings`, payload.formData);
            res.active_tab =  payload.activeTab.toLowerCase();
            commit(imageUploader.SET_DRAWING_LINK, res)
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", imageUploader.uploadImage, { root: true });
        }
    },
}