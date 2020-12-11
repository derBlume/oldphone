<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    {{ count }}
</template>

<script>
    import axios from "axios";
    import HelloWorld from "./components/HelloWorld.vue";

    export default {
        name: "App",
        components: {
            HelloWorld,
        },
        computed: {
            count() {
                return this.$store.state.count;
            },
        },
        mounted() {
            axios.get("/api/test");
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
