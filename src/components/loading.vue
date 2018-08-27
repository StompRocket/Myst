<template>
  <div id="loading">
    <img src="@/assets/logo.svg" alt="Myst">
    <h1>loading</h1>
    <p v-if="$parent.checkLoc" class="warning">Make sure that location services are enabled</p>
    <p v-if="$parent.checkInternet" class="warning">Check your internet connection</p>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data() {
    return  {
      checkLoc: false,
      checkInternet: false
    }
  },
  mounted() {
    if (!navigator.geolocation) {
      this.$parent.checkLoc = true
    }
    if (!navigator.onLine) {
      this.$parent.checkInternet = true
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes loading {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
#loading {
  height: 84%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 20%;
    height: auto;
    animation-name: loading;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  h1 {
    font-family: roboto_slab--bold, sans-serif;
    margin-top: 2%;
    color: #222f3e;
  }
  p {
    text-align: center;
    font-size: 0.8em;
    margin: 2% 4%;
  }
  .warning {
    color: #ee5253;
  }
}
</style>
