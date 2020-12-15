<template>
    <div class="BackendUpdatesApprover">
        <!-- <form>
            <input
                type="radio"
                name="approved"
                value="true"
                v-model="approved"
            />
            <input type="radio" name="approved" value="null" />
            <input type="radio" name="approved" value="false" />
        </form> -->
        {{ id }}
        <!-- <span v-if="approved === null">? </span>
        <span v-if="approved === true">O </span>
        <span v-if="approved === false">X</span> -->
    </div>
</template>

<script>
    export default {
        name: "BackendUpdatesApprover",
        props: ["id"],
    };
</script>

<style></style>
