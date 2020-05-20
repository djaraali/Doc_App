import types from "~/types/index";
const appointments = types.appointments

export const state = () => ({
    upcomingAppointments: [],
    appointmentList: [],
    appointment: {},
    getData: null,
    saveAbleData: { }
});

export const getters =  {

};

export const mutations =  {
    [appointments.SET_APPOINTMENTS_LIST](state, payload) {
        state.upcomingAppointments = payload
    },
    [appointments.SET_APPOINTMENTS_DATE](state, payload) {
        state.appointmentList = payload
    },
    [appointments.SET_A_Appointment] (state, payload) {
        state.appointment = payload;
    },
    [appointments.GET_APP_DATA] (state) {
        state.getData = Math.random();
    },
    [appointments.SET_SAVE_ABLE_DATA] (state, payload) {
        state.saveAbleData[payload.tab] = payload.mainData;
    }
};

export const actions = {

    /**
     * Get Upcoming Appointment List
     */
    async [appointments.getUpcomingAppointment]({ commit, dispatch }, payload) {
        const id = appointments.getUpcomingAppointment;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$get('/appointments/upcoming', payload);
            commit(appointments.SET_APPOINTMENTS_LIST, res)
            // dispatch('handleSuccess', { text: 'A new Sentence Successfully added!'}, { root: true })
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Get Appointment List
     */
    async [appointments.getAppointmentList]({ commit, dispatch }, payload) {
        const id = appointments.getAppointmentList;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$get('/appointments/list', {params: {date: payload}});
            commit(appointments.SET_APPOINTMENTS_DATE, res)
            // dispatch('handleSuccess', { text: 'A new Sentence Successfully added!'}, { root: true })
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Change Appointment Date
     */
    async [appointments.changeAppointmentDate]({ commit, dispatch }, payload) {
        const id = appointments.changeAppointmentDate;

        try {
            dispatch("start", id, { root: true });
            let res = await this.$axios.$put(`/appointments/${payload.id}`, { date_time: payload.data });
            // commit(appointments.SET_APPOINTMENTS_LIST, res)
            dispatch('handleSuccess', { text: 'Appointment Changed Successfully!'}, { root: true })
        } catch(e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", id, { root: true });
        }
    },

    /**
     * Get a single Appointment Data
     * @param { string } payload Id of a patient
     */
    async [appointments.getAAppointment] ({ commit, dispatch }, payload) {
        try {
            dispatch('start', appointments.getAAppointment, { root: true });
            let res = await this.$axios.$get(`appointments/single/${payload}`);
            commit(appointments.SET_A_Appointment, res);
        } catch (e) {
            dispatch("handleErrors", e, { root: true });
        } finally {
            dispatch("end", appointments.getAAppointment, { root: true });
        }
    },

    [appointments.getAppData] ({ commit }) {
        commit(appointments.GET_APP_DATA)
    },

    [appointments.setSaveAbleData] ({ commit }, payload) {
        commit(appointments.SET_SAVE_ABLE_DATA, payload)
    }

}
