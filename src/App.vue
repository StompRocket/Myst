<template>
  <div id="app">
    <nav id="app__nav">
      <img src="@/assets/logo.svg" alt="Myst Logo"><h1>Myst</h1>
    </nav>
    <router-view/>
    <footer id="app__footer">
      <p class="version">version {{version}}</p>
      <router-link :to="switchLocation" class="switch" v-text="getSwitchText"></router-link>
      <a class="powerd-by" href="https://darksky.net/poweredby/"><img src="@/assets/poweredby-oneline.png" alt=""></a>
    </footer>
  </div>
</template>
<script>
import 'minireset.css'
import './assets/global.scss'
let pjson = require('../package.json');
console.log(pjson.version);
export default {
  name: 'app',
  data () {
    return {
      version: pjson.version
    }
  },
  computed: {
    getSwitchText() {
      if (this.$route.path == '/') {
        return 'about myst'
      } else {
        return 'forecast'
      }
    },
    switchLocation() {
      if (this.$route.path == '/') {
        return '/about'
      } else {
        return '/'
      }
    }
  }
}
</script>
