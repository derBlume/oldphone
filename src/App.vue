<template>
    <AllUpdates />
    <img alt="Vue logo" src="./assets/logo.png" />
</template>

<script>
    import Axios from "axios";
    import AllUpdates from "./components/AllUpdates";

    export default {
        name: "App",
        components: {
            AllUpdates,
        },
        mounted() {
            Axios.get("/api/test");
        },
    };
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
