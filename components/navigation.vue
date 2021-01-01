<template>
  <nav>
    <div class="nav-item next-link" @click="$emit('goToNext')">
      {{ nextPage }}
    </div>
    <div class="current nav-item">{{ currentPage }}</div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import gsap from "gsap";

export default {
  props: ["pageIndex"],
  computed: {
    ...mapState(["currentPage", "nextPage", "direction"])
  },
  watch: {
    currentPage() {
      const tl = gsap.timeline();
      tl.fromTo(
        ".nav-item.current",
        {
          duration: 1.2,
          opacity: 0,
          letterSpacing: "22px",
          y: this.direction === "up" ? -100 : 200,
          ease: "power4.out"
        },
        {
          opacity: 1,
          y: 0,
          letterSpacing: 0
        }
      );
      gsap.fromTo(
        ".nav-item.next-link",
        {
          duration: 1.2,
          opacity: 0,
          letterSpacing: "22px",
          y: this.direction === "up" ? -100 : 200,
          ease: "power4.out"
        },
        {
          y: 0,
          letterSpacing: 0,
          opacity: 0.2
        },
        "-=1.2"
      );
    },
    pageIndex() {
      const tl = gsap.timeline();
      tl.to(".nav-item", {
        duration: 0.5,
        opacity: 0,
        y: this.direction === "up" ? 100 : -200,
        ease: "power4.out"
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
