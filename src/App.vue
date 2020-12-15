<template>
    <div id="nav">
        <RouterLink to="/">Frontend</RouterLink> |
        <RouterLink to="/backend">Backend</RouterLink> |
        <RouterLink to="/about">About</RouterLink>
    </div>
    <RouterView />
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "App",
        components: {},
        mounted() {
            //Axios.get("/api/test");
        },
        computed: {
            ...mapState(["device"]),
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
        margin: 10px;
    }
    a {
        text-decoration: none;
        color: inherit;
    }

    a.router-link-exact-active {
        color: var(--text-emph-color);
    }

    .legend {
        color: var(--text-light-color);
        font-size: 0.7em;
    }
</style>
