<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
    crossorigin="anonymous"
  />
  <div class="weather" :class="skyBackground">
    <div v-if="locationRetrieved">
      <h2>{{ apiCity }}</h2>
      <p>Current temperature: {{ currentTemp.temp }} °F</p>
      <p>Feels like: {{ currentTemp.feels_like }} °F</p>
      <p>Humidity: {{ currentTemp.humidity }}%</p>
      <p>Sky: {{ skyBackground }}</p>
    </div>

    <form v-on:submit="cityManualEntry">
      <input type="text" v-model="city" placeholder="Type your city in here" />
      <button @click="cityManualEntry">Manually Enter City Instead</button>
    </form>
    <i @click="getLocation" class="fas fa-location-arrow fa-2x"></i>
  </div>
</template>

<script>
require("dotenv").config();
export default {
  name: "Weather",
  data() {
    return {
      city: null,
      locationRetrieved: false,
      key: process.env.VUE_APP_WEATHER_APIKEY,
      info: null,
      currentTemp: undefined,
      skyBackground: null,
      latitude: null,
      longitude: null,
      apiCity: null,
    };
  },
  methods: {
    async cityManualEntry(event) {
      event.preventDefault();
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.key}&units=imperial`
        )
        .then(
          (response) => (
            (this.info = response.data.weather),
            (this.currentTemp = response.data.main),
            (this.skyBackground = response.data.weather[0].main),
            (this.apiCity = response.data.name)
          )
        )
        .catch((error) => {
          alert("Invalid city entered");
        });
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    },
    onSuccess: function (position) {
      this.locationRetrieved = true;
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.getData();
    },
    onError() {
      console.log("error");
      alert("error");
    },
    async getData() {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.key}&units=imperial`
        )
        .then(
          (response) => (
            (this.info = response.data.weather),
            (this.currentTemp = response.data.main),
            (this.skyBackground = response.data.weather[0].main),
            (this.apiCity = response.data.name)
          )
        );
    },
  },
  created() {
    this.getLocation();
    this.$emit("changebackground", this.skyBackground);
  },
};
</script>

<style scoped>
p {
  margin-top: 2em;
}

i {
  margin: 1em;
  display: block;
  cursor: pointer;
}
.weather {
  height: 100vh;
  padding-top: 20px;
}
.controls {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
}

.controls button,
input {
  margin: 5px;
  padding: 10px;
}

.Clouds {
  background-image: url("https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260");
  background-size: cover;
  color: white;
}
.Clear {
  background-image: url("https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-size: cover;
  color: white;
}
</style>
