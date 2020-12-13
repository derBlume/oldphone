<template>
    <PickDevice />
    <AllUpdates v-if="false" />
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
</template>

<script>
    //import Axios from "axios";

    import AllUpdates from "./components/AllUpdates";
    import PickDevice from "./components/PickDevice";

    export default {
        name: "App",
        components: {
            AllUpdates,
            PickDevice,
        },
        mounted() {
            //Axios.get("/api/test");
        },
    };
</script>

<style>
    :root {
        --text-main-color: rgb(44, 62, 80);
        --text-emph-color: rgb(55, 173, 112);
        --text-light-color: rgb(73, 103, 133);
    }
    * {
        margin: 0;
        box-sizing: border-box;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        display: flex;
        flex-direction: column;
        color: var(--text-main-color-color);
        margin-top: 10px;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    .legend {
        color: var(--text-light-color);
        font-size: 0.7em;
    }
</style>
