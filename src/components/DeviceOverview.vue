<template>
    <div class="DeviceOverview">
        <p>{{ device.brand }} {{ device.model }}</p>
        <p>released:</p>
        <p>{{ release }}</p>
        <p>major OS versions received</p>
        <p>current version OR EOL-message</p>
        <p>expected updates</p>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        computed: {
            ...mapState(["device"]),
            /* release() {
                return this.device.release_date;
            }, */
        },
    };
</script>

<style></style>
