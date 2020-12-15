<template>
    <div class="BackendUpdatesRawGrouped">
        <table>
            <tr>
                <th>OK?</th>
                <th>{{ data.software }}</th>
                <th>{{ data.devices }}</th>
                <th>{{ data.release_date }}</th>
            </tr>
            <tr v-for="row in data.clean_rows" :key="row.id">
                <td>
                    <span v-if="row.approved === null">? </span>
                    <span v-if="row.approved === true">O </span>
                    <span v-if="row.approved === false">X</span>
                    <BackendUpdatesApprover :id="row.id" />
                </td>
                <td>{{ row.software }}</td>
                <td>{{ row.device }} (ID: {{ row.device_id }})</td>
                <td>{{ row.release_date }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import BackendUpdatesApprover from "./BackendUpdatesApprover.vue";
    export default {
        components: { BackendUpdatesApprover },
        name: "BackendUpdatesRawGrouped",
        props: ["data"],
    };
</script>

<style>
    th,
    td {
        border: 1px solid black;
    }
</style>
