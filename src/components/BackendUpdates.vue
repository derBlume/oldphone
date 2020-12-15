<template>
    <div class="BackendUpdates">
        <BackendUpdatesRawGrouped
            v-for="update in rawUsed"
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
            ...mapGetters(["rawUsed", "rawIgnored"]),
        },
        methods: {
            ...mapActions(["fetchUpdates"]),
        },
        mounted() {
            this.fetchUpdates();
        },
    };
</script>

<style></style>
