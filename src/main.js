import axios from "axios";
import { createApp } from "vue";
import { createStore } from "vuex";

import App from "./App.vue";
import router from "./router";

const store = createStore({
    state() {
        return {
            device: null,
            updates: [],
        };
    },
    getters: {
        majorUpdates(state) {
            const majorUpdates = state.device.updates.filter(
                (update) =>
                    /iOS \d+(?!.)/gi.test(update.software) ||
                    /iOS \d+.0(?!.)/gi.test(update.software)
            );
            return majorUpdates;
        },
        rawUsed(state) {
            return state.updates.filter((update) => update.clean_rows.length);
        },
        rawIgnored(state) {
            return state.updates.filter((update) => !update.clean_rows.length);
        },
        cleanById: (state, getters) => (id) => {
            getters.rawUsed.filter((raw) =>
                raw.clean_rows.filter((clean) => clean.id === id)
            );
        },
    },
    mutations: {
        setDevice(state, data) {
            state.device = data;
        },
        setUpdates(state, data) {
            state.updates = data;
        },
    },
    actions: {
        async fetchDevice({ commit }, device_id) {
            if (device_id) {
                const { data } = await axios.get(`/api/devices/`, {
                    params: { id: device_id },
                });
                commit("setDevice", data);
            } else {
                commit("setDevice", null);
            }
        },
        async fetchUpdates({ commit }) {
            const { data } = await axios.get("/api/admin/updates/");
            commit("setUpdates", data);
        },
    },
});

const app = createApp(App);
app.use(router);
app.use(store);

app.config.globalProperties.$dates = {
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
