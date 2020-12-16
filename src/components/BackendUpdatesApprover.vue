<template>
    <div class="BackendUpdatesApprover">
        <form>
            <input
                type="radio"
                name="approved"
                :value="true"
                v-model="approved"
            />
            <input
                type="radio"
                name="approved"
                :value="null"
                v-model="approved"
            />
            <input
                type="radio"
                name="approved"
                :value="false"
                v-model="approved"
            />
        </form>
    </div>
</template>

<script>
    export default {
        name: "BackendUpdatesApprover",
        props: ["id"],
        computed: {
            approved: {
                get() {
                    return this.$store.getters.approvedById(this.id);
                },
                set(value) {
                    this.$store.dispatch("updateApproved", {
                        id: this.id,
                        approved: value,
                    });
                },
            },
        },
    };
</script>

<style></style>
