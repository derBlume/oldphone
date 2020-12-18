<template>
    <div class="DeviceOverview">
        <div class="double">
            <div class="double-content">
                <p class="legend">released:</p>
                <p>{{ $dates.monthYear(device.release_date) }}</p>
            </div>
            <div class="double-content">
                <p class="legend" v-if="device.discontinued_date">
                    available until:
                </p>
                <p>{{ $dates.monthYear(device.discontinued_date) }}</p>
            </div>
        </div>
        <div class="single">
            <p class="legend">major OS versions:</p>
            <ul>
                <li class="first">iOS {{ device.first_os }}</li>
                <li
                    class="update"
                    v-for="update in majorUpdates"
                    :key="update.id"
                >
                    {{ update.software }}
                    <span class="update-date">
                        ({{ $dates.monthYear(update.release_date) }})
                    </span>
                </li>
            </ul>
        </div>
        <div class="single">
            <p class="good-news" v-if="latestOsReceived">
                Your phone can run the latest version of iOS wich will get
                support at least until September 2021!
            </p>

            <p class="bad-news" v-else>
                Your phone did not receive the latest major version of iOS. So
                it's probably a good idea to get a newer device soon.
            </p>
        </div>
        <div class="single">
            <p class="good-news" v-if="supportTimeLeft > 12">
                Outlook: <br />
                It is likely, that your phone will receive support for another
                {{ (y = Math.floor(supportTimeLeft / 12)) }} year<span
                    v-if="y > 1"
                    >s</span
                >
                and {{ (m = supportTimeLeft % 12) }} month<span v-if="m > 1"
                    >s</span
                >.
            </p>
        </div>

        <div class="single">
            <p
                class="insecure-news"
                v-if="supportTimeLeft < 12 && latestOsReceived"
            >
                Outlook: <br />
                It is unlikely, that your phone will receive the next major OS
                version. <br />
                It is uncertain, if the current OS will still receive updates
                then.
            </p>
        </div>
        <!-- TIMELINE -->
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
    .DeviceOverview {
        padding: 10px 5px;
    }

    .double,
    .single {
        padding: 5px 0;
    }

    .double {
        display: flex;
        justify-content: space-between;
    }

    .double-content {
        width: 45%;
    }

    .update:before {
        content: "→";
        padding-right: 0.5em;
    }
    .first:before {
        content: "→";
        padding-right: 0.5em;
        visibility: hidden;
    }

    .good-news {
        color: var(--text-emph-color);
    }

    .bad-news {
        color: tomato;
    }

    .insecure-news {
        color: orange;
    }
</style>
