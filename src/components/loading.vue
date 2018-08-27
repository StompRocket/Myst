<template>
  <div id="loading">
    <img src="@/assets/logo.svg" alt="Myst">
    <h1>loading</h1>
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>
<style lang="scss" scoped>
#loading {
  height: 84%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 20%;
    height: auto;
  }
  h1 {
    font-family: roboto_slab--bold, sans-serif;
    margin-top: 2%;
    color: #222f3e;
  }
}
</style>
