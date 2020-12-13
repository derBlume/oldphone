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
    mutations: {
        setDevice(state, data) {
            state.device = data;
        },
        getUpdates(state, data) {
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

        async getUpdates({ commit }, device) {
            const { data } = await axios.get(
                `/api/updates-by-device/${device}`
            );

            data.forEach((item) => {
                console.log(item.release_date);
            });

            commit("getUpdates", data);
        },
    },
});

const app = createApp(App);

// Install the store instance as a plugin
app.use(store);
app.mount("#app");
