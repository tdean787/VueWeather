<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
    crossorigin="anonymous"
  />
  <div class="about">
    <h2>This is a weather app</h2>
    <p><i class="fab fa-vuejs"></i> Created with the Vue framework</p>
    <p>Learn more about Vue here: <a href="https://vuejs.org/">vuejs.org</a></p>
    <a target="_blank" href="https://github.com/tdean787/VueWeather">
      <i class="fab fa-github"></i>View the code/Github repo</a
    >
    <p>
      Data is pulled from <a href="https://openweathermap.org/">OpenWeather</a>
    </p>
    <p>
      The current city is saved to localStorage for repeat visits to the website
    </p>
  </div>
</template>

<style scoped>
i {
  padding: 10px;
}
a {
  color: inherit;
}
.about {
  display: block;
  margin: 0 auto;
  max-width: 400px;
}
</style>
