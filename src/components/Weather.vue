<template>
  <div class="weather" :class="skyBackground">
    <h3>Weather App</h3>
    <div class="controls">
      <form v-on:submit="submitCity">
        <input
          type="text"
          v-model="city"
          placeholder="Type your city in here"
        />
        <button type="submit" @click="submitCity">Get Weather</button>
      </form>
    </div>

    <div v-if="currentTemp">
      <p>Current temperature: {{ currentTemp.temp }} °F</p>
      <p>Feels like: {{ currentTemp.feels_like }} °F</p>
      <p>Humidity: {{ currentTemp.humidity }}%</p>
      {{ skyBackground }}
    </div>
  </div>
</template>

<script>
require("dotenv").config();
export default {
  name: "Weather",
  data() {
    return {
      city: localStorage.getItem("city"),
      key: process.env.VUE_APP_WEATHER_APIKEY,
      info: null,
      currentTemp: undefined,
      skyBackground: null,
      jsonData: null,
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
    async getData() {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.key}&units=imperial`
        )
        .then(
          (response) => (
            (this.info = response.data.weather),
            (this.currentTemp = response.data.main),
            (this.skyBackground = response.data.weather[0].main)
          )
        );
      // console.log(response);
      // console.log(this.skyBackground);
    },
    async submitCity(event) {
      event.preventDefault();
      localStorage.setItem("city", this.city);
      if (this.city === null) {
        alert("You'll need to enter your city in first.");
      }
      await this.getData();
      this.$emit("changebackground", this.skyBackground);
    },
  },
  async mounted() {
    await this.getData();
    this.$emit("changebackground", this.skyBackground);
  },
};
</script>

<style>
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
