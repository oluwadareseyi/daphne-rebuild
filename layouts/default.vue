<template>
  <div>
    <div ref="cursor" class="cursor"></div>
    <Nuxt />
  </div>
</template>

<script>
import { mapState } from "vuex";
import gsap from "gsap";

export default {
  mounted() {
    const cursorRef = this.$refs.cursor;
    document.addEventListener("mousemove", e => {
      cursorRef.setAttribute(
        "style",
        `transform: translate3d(${e.pageX - 10}px, ${e.pageY - 10}px, 0px)`
      );
    });
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
