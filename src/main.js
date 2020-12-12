import Axios from "axios";
import { createApp } from "vue";
import { createStore } from "vuex";

import App from "./App.vue";

// Create a new store instance.
const store = createStore({
    state() {
        return {
            updates: [],
        };
    },
    mutations: {
        getUpdates(state, data) {
            state.updates = data;
        },
    },
    actions: {
        async getUpdates({ commit }, device) {
            const { data } = await Axios.get(
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
