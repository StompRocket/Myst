<template>
  <div id="forecast" class="page">
    <loading class="loader" v-if="loading"></loading>
    <div v-if="!loading" class="current">
      <p class="current__temp">{{data.currently.temperature}}&#176;</p>
      <p class="current__feels"> <i class="wi" :class="iconClass(data.currently.icon)"></i> {{data.currently.summary}}</p>
      <p class="current__summary">{{data.hourly.summary}}</p>
    </div>
    <div v-if="!loading" class="futureContainer">
      <div  class="future">
          <h1 class="future__type">Weekly</h1>
          <p class="forecastLoading" v-if="!data">Loading...</p>
          <div v-if="data" class="future__forecast">
            <div v-for="item in data.daily.data" :key="item.dateTime._i" class="day">
              <p>{{day(item.dateTime)}}</p>
              <i class="wi" :class="iconClass(item.icon)"></i>
              <p>{{Math.round(item.apparentTemperatureLow)}}&#176;</p>
              <p>{{Math.round(item.apparentTemperatureHigh)}}&#176;<p/>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import DarkSkyApi from 'dark-sky-api';
import '@/assets/utilities/css/weather-icons.min.scss'
import loading from '@/components/loading.vue'
import '@/assets/forecast.scss'
import moment from 'moment'
DarkSkyApi.apiKey = 'babc1caef4868b2b54563b4140f75c64';
DarkSkyApi.extendHourly(true);
export default {
  name: 'forecast',
  components: {
    loading
  },
  mounted() {
   // console.log('mounted')
    let position
    if (navigator.geolocation) {
      DarkSkyApi.loadItAll()
      .then(result => {
        this.data = result;
        this.loading = false
        this.data.currently.temperature = Math.round(this.data.currently.temperature)
        });
    } else {
      this.$parent.checkLoc = true
    }
    //this.axios.get(`https://api.darksky.net/forecast/babc1caef4868b2b54563b4140f75c64/${response.data.latitude},${response.data.longitude}`)
   

    
  },
  computed: {
   
  },
  data() {
    return {
      loading: true,
      checkLoc: false,
      checkInternet: false,
      data: null
    }
  },
  methods: {
iconClass(i) {
     return {
      'wi-day-sunny': i == "clear-day",
      'wi-night-clear': i == "clear-night",
      'wi-day-cloudy': i == "partly-cloudy-day",
      'wi-night-alt-cloudy': i == "partly-cloudy-night",
      'wi-cloudy': i == "cloudy",
      'wi-rain': i == "rain",
      'wi-sleet': i == "sleet",
      'wi-snow': i == "snow",
      'wi-wind': i == "wind",
      'wi-fog': i == "fog"
     }
   },
     day(time) {
      return moment(time).format('ddd')
    }
   
  }
}
</script>
