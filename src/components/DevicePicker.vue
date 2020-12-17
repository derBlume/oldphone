<template>
    <div v-if="device" class="myDevice">
        <p class="legend">My device:</p>
        <div class="device">
            <p>{{ device.brand }} {{ device.model }}</p>
            <a href="" @click.prevent="setDevice(null)">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 100 125"
                    style="enable-background:new 0 0 100 100;"
                    xml:space="preserve"
                >
                    <path
                        d="M50,15.7c-19.9,0-36,16.1-36,36s16.1,36,36,36s36-16.1,36-36S69.8,15.7,50,15.7z M50,85.7c-18.7,0-34-15.3-34-34  s15.3-34,34-34s34,15.3,34,34S68.7,85.7,50,85.7z"
                    />
                    <path
                        d="M66.2,35.2c-0.4-0.4-1-0.4-1.4,0L50,50.1L35.1,35.2c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l14.8,14.8L33.7,66.3  c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3L50,52.9l14.8,14.8c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3  c0.4-0.4,0.4-1,0-1.4L51.4,51.5l14.8-14.8C66.6,36.3,66.6,35.6,66.2,35.2z"
                    />
                </svg>
            </a>
        </div>
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

    .devicePicker {
        display: flex;
        flex-direction: column;
    }

    input,
    div.device {
        width: 100%;
        height: 1.8em;
        border: 2px solid var(--text-emph-color);
        border-radius: 5px;
        font-size: inherit;
        padding: 0 5px;
    }

    div.device {
        display: flex;
        justify-content: space-between;
    }

    svg {
        height: 1.8em;
    }

    .results {
        width: 90%;
        align-self: center;
    }
</style>
