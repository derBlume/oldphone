<template>
    <div v-if="device" class="myDevice">
        <p class="legend">My device:</p>
        <p class="device">
            {{ device.brand }} {{ device.model }}
            <a href="" @click.prevent="setDevice(null)">(X)</a>
        </p>
    </div>
    <div v-else class="devicePicker">
        <p class="legend">Type Name and/or Brand of device:</p>
        <input v-model="input" @input="findDevice(input)" type="text" />
        <div class="results">
            <div class="result" v-for="result in results" :key="result.id">
                <a href="" @click.prevent="setDevice(result.id)">
                    {{ result.brand }} {{ result.model }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapState } from "vuex";

    export default {
        data() {
            return {
                input: "",
                results: [],
            };
        },
        computed: {
            ...mapState(["device"]),
        },
        methods: {
            async findDevice(query) {
                if (query) {
                    const { data } = await axios.get("/api/devices/", {
                        params: { search: query },
                    });
                    this.results = data;
                } else {
                    this.results = [];
                }
            },
            setDevice(device_id) {
                this.$store.dispatch("fetchDevice", device_id);
                this.results = [];
                this.input = "";
            },
        },
    };
</script>

<style scoped>
    .myDevice,
    .devicePicker {
        width: 100%;
    }

    input,
    p.device {
        width: 100%;
        height: 1.8em;
        border: 2px solid var(--text-emph-color);
        border-radius: 5px;
        font-size: inherit;
        padding: 0 5px;
    }
</style>
