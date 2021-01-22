<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
            For a guide and recipes on how to configure / customize this
            project,<br />
            check out the
            <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
                >vue-cli documentation</a
            >.
        </p>
        <button @click="makeDuh">Test</button>
        <button @click="incrementBy(8)">Add 8</button>
    </div>
</template>

<script>
    import { mapMutations } from "vuex";
    export default {
        name: "HelloWorld",
        data() {
            return {
                testdata: "I'm just a test-text.",
                localCount: 10,
            };
        },
        methods: {
            makeDuh() {
                this.$store.commit("increment");
                if (this.testdata === "Duh!") {
                    this.testdata = "What?";
                } else {
                    this.testdata = "Duh!";
                }
            },
            makeEight() {
                this.$store.commit("incrementBy", 8);
            },
            ...mapMutations(["incrementBy"]),
        },
        props: {
            msg: String,
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
