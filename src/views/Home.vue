<template>
  <div class="home">
    <Weather />
  </div>
</template>

<script>
import Weather from "../components/Weather";
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    Weather,
  },
};
</script>
