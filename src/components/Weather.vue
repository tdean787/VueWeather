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
      <div v-if="!celsius">
        <p>Current temperature: {{ currentTemp.temp }} °F</p>
        <p>Feels like: {{ currentTemp.feels_like }} °F</p>
      </div>

      <div v-if="celsius">
        <p>Current temperature: {{ celsiusTemp.temp }} °C</p>
        <p>Feels like: {{ celsiusTemp.feels_like }} °C</p>
      </div>

      <p>Humidity: {{ currentTemp.humidity }}%</p>
      <p>Sky: {{ skyBackground }}</p>
    </div>

    <form v-on:submit="cityManualEntry">
      <input type="text" v-model="city" placeholder="Type your city in here" />
      <br />
      <button class="button" @click="cityManualEntry">
        Manually Enter City Instead
      </button>
    </form>
    <i @click="getLocation" class="fas fa-location-arrow fa-2x"></i>
    <h3>Change Weather Unit of Measurement</h3>
    <div class="weatherToggle">
      <p>Fahrenheit</p>
      <label class="switch">
        <input type="checkbox" v-model="celsius" />
        <span class="slider"></span>
      </label>
      <p>Celsius</p>
    </div>
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
      currentTemp: undefined,
      celsiusTemp: undefined,
      skyBackground: null,
      latitude: null,
      longitude: null,
      apiCity: null,
      celsius: false,
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
            (this.currentTemp = response.data.main),
            (this.skyBackground = response.data.weather[0].main),
            (this.apiCity = response.data.name)
          )
        )
        .catch((error) => {
          alert("Invalid city entered");
        });
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.key}&units=metric`
        )
        .then((response) => (this.celsiusTemp = response.data.main))
        .catch((error) => {
          alert("Invalid city entered");
        });
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    },
    onSuccess: function(position) {
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
            (this.currentTemp = response.data.main),
            (this.skyBackground = response.data.weather[0].main),
            (this.apiCity = response.data.name)
          )
        );
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.key}&units=metric`
        )
        .then((response) => (this.celsiusTemp = response.data.main));
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
  /* margin-top: 2em; */
  font-size: 1.5em;
}

i {
  margin: 1em;
  display: block;
  cursor: pointer;
}

h3 {
  text-shadow: black 1px 1px;
  color: white;
}

.button {
  box-shadow: 3px 4px 0px 0px #1564ad;
  background: linear-gradient(to bottom, #79bbff 5%, #378de5 100%);
  background-color: #79bbff;
  border-radius: 5px;
  border: 1px solid #337bc4;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  font-weight: bold;
  padding: 12px 24px;
  margin: 15px 0;
  text-decoration: none;
  text-shadow: 0px 1px 0px #528ecc;
}
.button:hover {
  background: linear-gradient(to bottom, #378de5 5%, #79bbff 100%);
  background-color: #378de5;
}
.button:active {
  position: relative;
  top: 1px;
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
.Haze {
  background-image: url("https://images.pexels.com/photos/4406292/pexels-photo-4406292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-size: cover;
  color: black;
}

.Rain {
  background-image: url("https://images.pexels.com/photos/3394939/pexels-photo-3394939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-size: cover;
  color: white;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 35px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.weatherToggle {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0;
  text-shadow: black 1px 1px;
  color: white;
}

.weatherToggle p {
  margin: 0 10px;
}
</style>
