<template>
    <div class="Backend">
        <BackendUpdates />
    </div>
</template>

<script>
    import BackendUpdates from "../components/BackendUpdates.vue";
    export default {
        components: { BackendUpdates },
        name: "Backend",
    };
</script>

<style>
    .Backend {
        font-size: smaller;
    }
</style>
