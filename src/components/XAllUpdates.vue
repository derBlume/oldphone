<template>
    <p>All Updates for iPhone:</p>
    <button @click="getUpdates('iPhone SE')">Load</button>

    <table>
        <tr>
            <th>Model</th>
            <th>Software</th>
            <th>Date</th>
        </tr>
        <tr v-for="row in updates" :key="row.id">
            <td>{{ row.device }}</td>
            <td>{{ row.software }}</td>
            <td>{{ row.release_date }}</td>
        </tr>
    </table>
</template>

<script>
    import { mapActions, mapState } from "vuex";

    export default {
        name: "AllUpdates",
        methods: {
            ...mapActions(["getUpdates"]),
        },
        computed: {
            ...mapState(["updates"]),
        },
    };
</script>

<style></style>
