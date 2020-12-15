import axios from "axios";
import { createApp } from "vue";
import { createStore } from "vuex";

import App from "./App.vue";

// Create a new store instance.
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
    },
    mutations: {
        setDevice(state, data) {
            state.device = data;
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
    },
});

const app = createApp(App);

// Install the store instance as a plugin
app.use(store);

app.config.globalProperties.$dates = {
    monthYear(dateString) {
        if (!dateString) return;

        return new Date(dateString).toLocaleDateString("en-us", {
            month: "long",
            year: "numeric",
        });
    },
};

app.mount("#app");
