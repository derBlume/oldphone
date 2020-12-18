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
                    <span :class="{ active: row.approved === true }">✓ </span>
                    <span :class="{ active: row.approved === null }">? </span>
                    <span :class="{ active: row.approved === false }"> ✗ </span>

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

<style scoped>
    table {
        width: 100%;
        margin: 20px 0;
    }
    th,
    td {
        border: 1px solid black;
    }

    th:first-child,
    td:first-child {
        width: 60px;
        text-align: center;
    }

    th:nth-child(4),
    td:nth-child(4) {
        width: 180px;
    }
    .active {
        font-weight: bold;
    }
</style>
