<template>
    <div class="DeviceOverview">
        <p class="legend">released:</p>
        <p>{{ $dates.monthYear(device.release_date) }}</p>
        <p class="legend" v-if="device.discontinued_date">available until:</p>
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
    </div>
</template>

<script>
    import { mapGetters, mapState } from "vuex";

    export default {
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
