<template>
    <div class="Frontend">
        <DevicePicker />
        <DeviceOverview v-if="device" />
    </div>
</template>

<script>
    import DevicePicker from "@/components/DevicePicker";
    import DeviceOverview from "@/components/DeviceOverview";
    import { mapState } from "vuex";
    export default {
        components: { DevicePicker, DeviceOverview },
        computed: {
            ...mapState(["device"]),
        },
    };
</script>

<style></style>
