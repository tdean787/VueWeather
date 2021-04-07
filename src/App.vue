<template>
  <div v-on:changebackground="changeNav()" class="top">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
  <router-view />
</template>
<script>
export default {
  data() {
    return {
      backgroundColor: undefined,
    };
  },
  methods: {
    changeNav() {
      console.log("changed");
    },
  },
};
</script>
<style>
html,
body {
  padding: 0px;
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background: lightgrey;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #3141d0;
}
</style>
