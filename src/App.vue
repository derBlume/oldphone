<template>
    <AppHeader />
    <main>
        <RouterView />
    </main>

    <AppFooter />
</template>

<script>
    import AppFooter from "./components/AppFooter.vue";
    import AppHeader from "./components/AppHeader.vue";
    export default {
        name: "App",
        components: { AppHeader, AppFooter },
    };
</script>

<style>
    :root {
        --text-main-color: rgb(44, 62, 80);
        --text-emph-color: rgb(55, 173, 112);
        --text-light-color: rgb(73, 103, 133);
        --footer-height: 50px;
        --header-height: 50px;
        --main-elm-padding: 5px;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        display: flex;
        flex-direction: column;
        color: var(--text-main-color-color);
    }
    main {
        position: fixed;
        top: var(--header-height);
        bottom: var(--footer-height);
        overflow: scroll;
        width: 100vw;
        padding: var(--main-elm-padding);
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
