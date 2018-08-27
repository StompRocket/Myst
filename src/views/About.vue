<template>
<div class="about page">
  <img src="@/assets/wordmark.svg" alt="Myst">
  <p>Myst is a beautiful, lightweight, open source weather app developed by <a href="https://brainstormincstudio.com">Ronan Furuta</a> @ <a href="https://stomprocket.io">Stomp Rocket</a>.</p>

</div>
</template>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 80%;
  }
  p {
    text-align: center;
    margin-top: 4%;
    font-size: 0.9em;
    width: 80%;
  }
  a {
    color: #1dd1a1;
    font-family: roboto_slab, sans-serif;
    text-decoration: none;
  }
}
</style>
