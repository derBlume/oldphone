<template>
    <header>
        <h1 class="title">oPhone<span>o</span></h1>
    </header>
</template>

<script>
    export default {
        name: "AppHeader",
    };
</script>

<style scoped>
    header {
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
        background-color: white;
    }
    h1 {
        width: 100%;
        text-align: center;
        padding: 5px;
        color: inherit;
    }
    span {
        visibility: hidden;
    }
</style>
