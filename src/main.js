import axios from "axios";
import { createApp } from "vue";
import { createStore } from "vuex";
import "bulma/css/bulma.min.css";
import "bulma-timeline/dist/css/bulma-timeline.min.css";

import App from "./App.vue";
import router from "./router";

const store = createStore({
    state() {
        return {
            device: null,
            updates: { raw: [], clean: [] },
        };
    },

    getters: {
        majorUpdates(state) {
            const majorUpdates = state.device.updates.filter(
                (update) =>
                    /iOS \d+(?!.)/gi.test(update.software) ||
                    /iOS \d+.0(?!.)/gi.test(update.software)
            );
            return majorUpdates.reverse();
        },

        cleanGroupedByRaw(state) {
            const composed = { used: [], ignored: [] };
            state.updates.raw.forEach((raw_row) => {
                const clean_rows = state.updates.clean.filter(
                    (clean_row) => clean_row.raw_id === raw_row.id
                );
                if (clean_rows.length) {
                    composed.used.push({ ...raw_row, clean_rows });
                } else {
                    composed.ignored.push(raw_row);
                }
            });
            return composed;
        },

        approvedById: (state) => (id) => {
            const approved = state.updates.clean.find(
                (clean_row) => clean_row.id === id
            ).approved;
            return approved;
        },
    },

    mutations: {
        setDevice(state, data) {
            state.device = data;
        },

        setUpdates(state, data) {
            state.updates = data;
        },
        setApproved(state, payload) {
            state.updates.clean.find(
                (clean_row) => clean_row.id === payload.id
            ).approved = payload.approved;
        },
    },

    actions: {
        async fetchDevice({ commit }, device_id) {
            if (device_id) {
                const device = await axios.get("/api/devices/", {
                    params: { id: device_id },
                });

                commit("setDevice", device.data);
            } else {
                commit("setDevice", null);
            }
        },

        async fetchUpdates({ commit }) {
            const { data } = await axios.get("/api/admin/updates/", {
                params: { raw: "all", clean: "all" },
            });
            commit("setUpdates", data);
        },

        async updateApproved({ commit }, payload) {
            try {
                const { data } = await axios.post(
                    "/api/admin/updates/approve",
                    payload
                );

                commit("setApproved", {
                    id: data.id,
                    approved: data.approved,
                });
            } catch (error) {
                console.log("Error updating Approved-Status: ", error);
            }
        },
    },
});

const app = createApp(App);
app.use(router);
app.use(store);

app.config.globalProperties.$dates = {
    year(dateString) {
        if (!dateString) return;

        return new Date(dateString).toLocaleDateString("en-us", {
            year: "numeric",
        });
    },
    monthYear(dateString) {
        if (!dateString) return;

        return new Date(dateString).toLocaleDateString("en-us", {
            month: "long",
            year: "numeric",
        });
    },
    dayMonthYear(dateString) {
        if (!dateString) return;

        return new Date(dateString).toLocaleDateString("en-us", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    },
};

app.mount("#app");
