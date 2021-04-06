<template>
  <h3>Weather App</h3>
  <input type="text" v-model="city" placeholder="City" />
  <button @click="submitCity">enter city</button>
  <button @click="getLocation">Get Coords</button>
  <h3>{{ currentTemp }}</h3>
  {{ info }}
</template>

<script>
require("dotenv").config();
export default {
  name: "Weather",
  data() {
    return {
      city: "San-Antonio",
      key: process.env.VUE_APP_WEATHER_APIKEY,
      info: null,
      currentTemp: null,
    };
  },
  methods: {
    getLocation() {
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    },
    onSuccess: function(position) {
      const { latitude, longitude } = position.coords;
      console.log(latitude);
    },
    onError() {
      console.log("error");
    },
    submitCity() {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=San-Antonio&appid=${this.key}&units=imperial`
        )
        .then(
          (response) => (
            (this.info = response.data.weather),
            (this.currentTemp = response.data.main)
          )
        );
    },
  },
};
</script>

<style></style>
