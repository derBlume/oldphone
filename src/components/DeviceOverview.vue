<template>
    <a class="switch" @click.prevent="toggleView">Summary | Timeline</a>
    <div class="DeviceOverview">
        <p class="legend">released:</p>
        <p>{{ $dates.monthYear(device.release_date) }}</p>
        <p class="legend" v-if="device.discontinued_date">available until:</p>
        <p>{{ $dates.monthYear(device.discontinued_date) }}</p>
        <p class="legend">first OS:</p>
        <p>{{ device.first_os }}</p>
        <p class="legend">major OS versions received:</p>
        <ul>
            <li v-for="update in majorUpdates" :key="update.id">
                {{ update.software }} ({{
                    $dates.monthYear(update.release_date)
                }})
            </li>
        </ul>
        <p class="good-news" v-if="latestOsReceived">
            Your phone can run the latest version of iOS wich will get support
            at least until September 2021!
        </p>
        <p class="bad-news" v-else>
            Your phone did not receive the latest major version of iOS. So it's
            probably a good idea to get a newer device soon.
        </p>

        <p v-if="supportTimeLeft > 0">
            It is likely, that your phone will receive another
            {{ supportTimeLeft }} months of support.
        </p>

        <!-- TIMELINE -->
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
        data() {
            return {
                lastYear: 0,
                showTimeline: false,
            };
        },
        methods: {
            setYear(year) {
                this.lastYear = year;
            },
            toggleView() {
                this.showTimeline = !this.showTimeline;
            },
        },
        computed: {
            ...mapState(["device"]),
            ...mapGetters(["majorUpdates"]),
            latestOsReceived() {
                const latest = this.device.latest_os.match(/\d+/i);
                const device = this.device.updates[0].software.match(/\d+/i);
                console.log(latest);
                console.log(device);

                return latest[0] === device[0];
            },
            supportTimeLeft() {
                const duration = this.device.avg_support;

                const gone = new Date() - new Date(this.device.release_date);

                return Math.floor(
                    (duration - gone) / (1000 * 60 * 60 * 24 * (365 / 12))
                );
            },
        },
    };
</script>

<style>
    .DeviceOverview {
        padding-top: 10px;
    }

    .good-news {
        color: var(--text-emph-color);
    }

    .bad-news {
        color: tomato;
    }
</style>
