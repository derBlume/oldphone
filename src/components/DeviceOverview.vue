<template>
    <div class="DeviceOverview">
        <p class="legend">released:</p>
        <p>{{ $dates.monthYear(device.release_date) }}</p>
        <p class="legend" v-if="device.discontinued_date">discontinued:</p>
        <p>{{ $dates.monthYear(device.discontinued_date) }}</p>
        <p class="legend">first OS:</p>
        <p>{{ device.first_os }}</p>
        <p class="legend">major OS versions received:</p>
        <ul>
            <li v-for="update in this.majorUpdates" :key="update.id">
                {{ update.software }} ({{
                    $dates.monthYear(update.release_date)
                }})
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters, mapState } from "vuex";

    export default {
        computed: {
            ...mapState(["device"]),
            ...mapGetters(["majorUpdates"]),
        },
    };
</script>

<style>
    .DeviceOverview {
        padding-top: 10px;
    }
</style>
