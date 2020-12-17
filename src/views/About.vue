<template>
    <div class="about">
        <div>
            <p>
                made by <br />
                Journalist and Web Developer
            </p>
            <p class="strong">Patrick Blume</p>
        </div>
        <div>
            <p>it all started as a final project at</p>
            <p class="strong">SPICED Academy Stuttgart</p>
        </div>
        <div>
            <p>Built with:</p>
            <img src="@/assets/logo_vue.png" alt="" />
            <p class="strong">Vue.js</p>
            <p>Vuex</p>
            <p>vue-router</p>
            <p>bulma-timeline</p>
            <p>Swiper</p>
        </div>
        <div>
            <img src="@/assets/logo_node.png" alt="" />
            <p class="strong">Node.js</p>
            <p>Express</p>
            <p>jsdom</p>
        </div>
        <div>
            <p class="strong">Icons:</p>
            <p>
                Made by Made <br />
                from the Noun Project
            </p>
        </div>

        <p></p>
    </div>
</template>

<style scoped>
    div {
        margin: 10px;
    }
    .about {
        display: flex;
        flex-direction: column;
        align-content: center;
        text-align: center;
    }
    .strong {
        font-weight: bold;
    }

    img {
        height: 100px;
    }
</style>
