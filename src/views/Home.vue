<template>
    <div class="Home">
        <img src="@/assets/illu-home.svg" alt="" />
        <p>
            The most sustainable phone is the one you already have. But how long
            will it receive updates? <br />
        </p>
        <p>
            <RouterLink to="/device">Find out now!</RouterLink>
        </p>
    </div>
</template>

<style scoped>
    .Home {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        height: 100%;
        width: 90%;
        text-align: center;
    }
    a {
        background-color: var(--text-emph-color);
        height: 25px;
        padding: 5px;
        margin: 5px auto;

        border-radius: 3px;
        font-weight: bold;
        color: white;
    }

    img {
        width: 90%;
        max-width: 500px;
        max-height: 50%;
    }
</style>
