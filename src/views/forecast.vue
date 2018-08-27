<template>
  <div id="forecast" class="page">
    <loading class="loader" v-if="loading"></loading>
    <div v-if="!loading" class="current">
        <p class="current__temp">{{current.temperature}}&#176;</p>
        <p class="current__feels">{{current.summary}}</p>
    </div>
    <div v-if="!loading" class="futureContainer">
      <v-touch  class="future">
          <h1 class="future__type">Weekly</h1>
          <div v-if="forecast" class="future__forecast">
            <div v-for="item in forecast.daily.data" :key="item.dateTime._i" class="day">
              <p>{{day(item.dateTime)}}</p>
              <i class="wi" :class="iconClass(item.icon)"></i>
              <p>{{Math.round(item.apparentTemperatureLow)}}&#176;</p>
              <p>{{Math.round(item.apparentTemperatureHigh)}}&#176;<p/>
            </div>
            
          </div>
        
        </v-touch>
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
    console.log('mounted')
    let position
    if (navigator.geolocation) {
      DarkSkyApi.loadCurrent()
      .then((result) => {
          this.current = result
          this.loading = false
          this.current.temperature = Math.round(this.current.temperature)
      })
      DarkSkyApi.loadForecast()
      .then(result => this.forecast = result);
    } else {
      window.alert('Uh Oh, It looks like you dont have location enabled')
    }
    //this.axios.get(`https://api.darksky.net/forecast/babc1caef4868b2b54563b4140f75c64/${response.data.latitude},${response.data.longitude}`)
   

    
  },
  computed: {
   
  },
  data() {
    return {
      current: null,
      loading: true,
      futureTypeName: 'Weekly',
      futureType: 2,
      forecast: null
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
    },
    onSwipe() {
      console.log('left')
      if (this.futureType == 1) {
        this.futureType = 2
        this.futureTypeName = "Weekly"
      } else {
         this.futureType = 1
         this.futureTypeName = "Hourly"
      }
      
    },
     
  }
}
</script>
