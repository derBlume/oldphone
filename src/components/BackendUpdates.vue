<template>
    <div class="BackendUpdates">
        <BackendUpdatesRawGrouped
            v-for="update in cleanGroupedByRaw.used"
            :key="update.id"
            :data="update"
        />
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapState } from "vuex";
    import BackendUpdatesRawGrouped from "../components/BackendUpdatesRawGrouped.vue";
    export default {
        components: { BackendUpdatesRawGrouped },
        name: "BackendUpdates",
        computed: {
            ...mapState(["updates"]),
            ...mapGetters(["cleanGroupedByRaw"]),
        },
        methods: {
            ...mapActions(["fetchUpdates"]),
        },
        mounted() {
            //this.fetchUpdates();
            this.$store.dispatch("fetchUpdates");
        },
    };
</script>

<style></style>
