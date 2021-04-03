<template>
  <h3>Weather App</h3>
  <input type="text" v-model="city" placeholder="City" />
  <button @click="submitCity">enter city</button>
  <button @click="getLocation">Get Coords</button>
</template>

<script>
require("dotenv").config();
export default {
  name: "Weather",
  data() {
    return {
      city: "San Antonio",
      key: process.env.WEATHER_APIKEY,
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
      console.log("click");
      console.log(process.env.WEATHER_APIKEY);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=6caa22c818debc357a212d85570225b5`
      )
        .then((res) => console.log(res))
        .then((data) => console.log(data));
    },
  },
};
</script>

<style></style>
