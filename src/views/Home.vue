<template>
  <div :class="background">
    <Weather v-on:changebackground="test" />
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
  data() {
    return {
      background: undefined,
    };
  },
  methods: {
    test(data) {
      this.background = data;
    },
  },
};
</script>

<style>
.home {
  height: 100vh;
  /* background: lightgreen; */
}
</style>
