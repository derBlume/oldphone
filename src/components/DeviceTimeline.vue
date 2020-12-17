<template>
    <div class="DeviceTimeline">
        <div class="timeline">
            <header class="timeline-header">
                <span class="tag is-medium is-primary">{{
                    $dates.year(device.release_date)
                }}</span>
            </header>
            <div class="timeline-item">
                <div class="timeline-marker is-primary is-icon"></div>
                <div class="timeline-content">
                    <p class="heading">
                        {{ $dates.monthYear(device.release_date) }}
                    </p>
                    <p>Introduction of {{ device.model }}</p>
                    <p>with iOS {{ device.first_os }}</p>
                </div>
            </div>

            <div
                v-for="(update, index) in [...device.updates].reverse()"
                :key="update.id"
            >
                <!-- NEW YEAR -->
                <header
                    class="timeline-header"
                    v-if="
                        index > 0 &&
                            $dates.year(update.release_date) >
                                $dates.year(
                                    [...device.updates].reverse()[index - 1]
                                        .release_date
                                )
                    "
                >
                    <span class="tag is-primary">{{
                        $dates.year(update.release_date)
                    }}</span>
                </header>
                <!-- TIMELINE ITEM -->
                <div class="timeline-item">
                    <div
                        class="timeline-marker"
                        :class="{
                            'is-primary is-icon':
                                /iOS \d+(?!.)/gi.test(update.software) ||
                                /iOS \d+.0(?!.)/gi.test(update.software),
                        }"
                    ></div>
                    <div class="timeline-content">
                        <p class="heading">
                            {{ $dates.monthYear(update.release_date) }}
                        </p>
                        <p>
                            {{ update.software }}
                        </p>
                    </div>
                </div>
            </div>

            <div v-if="!latestOsReceived">
                <div class="timeline-item">
                    <div class="timeline-marker is-danger"></div>
                    <div class="timeline-content">
                        <p class="heading">support ended</p>
                        <p>This phone did not receive any more updates</p>
                    </div>
                </div>

                <header class="timeline-header">
                    <span class="tag is-medium is-primary is-danger">{{
                        $dates.year(device.updates[0].release_date)
                    }}</span>
                </header>
            </div>
            <div v-else>
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <p class="heading">currently supported</p>
                        <p>
                            This phone received the latest version of iOS, which
                            will get support at least until September 2021!
                        </p>
                    </div>
                </div>

                <header class="timeline-header">
                    <span class="tag is-medium is-primary">{{
                        $dates.year(device.updates[0].release_date)
                    }}</span>
                </header>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from "vuex";

    export default {
        computed: {
            ...mapState(["device"]),
            ...mapGetters([
                "majorUpdates",
                "latestOsReceived",
                "supportTimeLeft",
            ]),
        },
    };
</script>

<style scoped>
    .DeviceTimeline {
        padding-top: 10px;
    }

    #app .is-primary {
        background-color: var(--text-emph-color) !important;
    }
</style>
