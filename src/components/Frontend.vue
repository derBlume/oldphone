<template>
    <div class="Frontend">
        <p>Frontend</p>
        <DevicePicker />
        <DeviceOverview v-if="device" />
    </div>
</template>

<script>
    import DevicePicker from "./DevicePicker";
    import DeviceOverview from "./DeviceOverview";
    export default {
        components: { DevicePicker, DeviceOverview },
    };
</script>

<style></style>
