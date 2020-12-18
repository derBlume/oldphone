<template>
    <div class="Device">
        <DevicePicker />

        <Swiper
            :slides-per-view="1"
            auto-height
            :pagination="{ clickable: true }"
            v-if="device"
        >
            <SwiperSlide>
                <DeviceOverview />
            </SwiperSlide>
            <SwiperSlide>
                <DeviceTimeline />
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import SwiperCore, { Pagination } from "swiper";
    import { Swiper, SwiperSlide } from "swiper/vue";
    import "swiper/swiper-bundle.min.css";
    SwiperCore.use([Pagination]);

    import DevicePicker from "@/components/DevicePicker";
    import DeviceOverview from "@/components/DeviceOverview";
    import DeviceTimeline from "../components/DeviceTimeline.vue";
    export default {
        components: {
            DevicePicker,
            DeviceOverview,
            DeviceTimeline,
            Swiper,
            SwiperSlide,
        },
        computed: {
            ...mapState(["device"]),
        },
    };
</script>

<style>
    .Device {
        width: 100%;
        height: 100%;
        overflow: scroll;
    }
    .swiper-pagination {
        position: fixed;
        bottom: 60px !important;
    }
</style>
