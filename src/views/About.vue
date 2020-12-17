<template>
    <div class="about">
        <p>
            made by <br />
            Journalist and Web Developer
        </p>
        <p class="strong">Patrick Blume</p>
        <p>it all started as a final project at</p>
        <p class="strong">SPICED Academy Stuttgart</p>
        <div>
            <p>Built with:</p>
            <img src="@/assets/logo_vue.png" alt="" />
            <p class="strong">Vue.js</p>
            <p>Vuex</p>
        </div>
        <div>
            <img src="@/assets/logo_node.png" alt="" />
            <p class="strong">Node.js</p>
        </div>

        <p></p>
    </div>
</template>

<style scoped>
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
