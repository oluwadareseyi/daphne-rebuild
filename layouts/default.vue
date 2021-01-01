<template>
  <div>
    <div ref="cursor" :class="`cursor ${hovered ? 'scale' : ''}`">
      <div></div>
      <span v-if="hovered">{{ hoverText }}</span>
    </div>
    <Nuxt />
  </div>
</template>

<script>
import { mapState } from "vuex";
import gsap from "gsap";

export default {
  data() {
    return {
      targets: ["a", "nav-item next-link"],
      hovered: false,
      hoverText: "Next"
    };
  },
  mounted() {
    const cursorRef = this.$refs.cursor;
    document.addEventListener("mousemove", e => {
      cursorRef.setAttribute(
        "style",
        `transform: translate3d(${e.pageX - 30}px, ${e.pageY - 30}px, 0px)`
      );
      if (
        (this.targets.length > 0 &&
          this.targets.includes(e.target.className.toLowerCase())) ||
        this.targets.includes(e.target.tagName.toLowerCase())
      ) {
        this.hovered = true;
      } else {
        this.hovered = false;
      }
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
