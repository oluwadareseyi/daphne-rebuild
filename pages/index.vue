<template>
  <main @wheel.prevent="wheelListener" v-touch:swipe="swipeListener">
    <navigation :pageIndex="pageIndex" @goToNext="goToNext" />
    <section class="slider">
      <component
        v-for="(page, index) in pages"
        :is="`home-${page}`"
        :class="
          `${index === previousIndex || index === nextIndex ? 'next' : ''}`
        "
        :key="page"
      ></component>
    </section>
    <div class="indicator">
      <span>{{ numberIndex + 1 }}</span> / {{ pagesLength }}
    </div>
    <div class="hover-circle" @mouseover="hoverCircle" @mouseout="leaveCircle">
      <div class="circle"></div>
      <span>Enter</span>
    </div>
    <div class="collections">
      <div
        class="collection"
        v-for="collect in collection[currentPage]"
        :key="collect"
      >
        {{ collect }}
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import HomeBeauty from "@/components/homeBeauty.vue";
import HomeFashion from "@/components/homeFashion.vue";
import HomeOutdoor from "@/components/homeOutdoor.vue";
import HomeProject from "@/components/homeProject.vue";
import HomeWorks from "@/components/homeWorks.vue";
import gsap from "gsap";
import Navigation from "@/components/navigation.vue";

export default {
  components: {
    HomeBeauty,
    HomeFashion,
    HomeOutdoor,
    HomeProject,
    HomeWorks,
    Navigation
  },
  data() {
    return {
      isScrolling: false,
      pageIndex: 0,
      numberIndex: 0
    };
  },
  computed: {
    ...mapState(["pages", "currentPage", "direction", "collection"]),
    ...mapGetters(["pagesLength"]),
    nextIndex() {
      return this.pageIndex === this.pagesLength - 1 ? 0 : this.pageIndex + 1;
    },
    previousIndex() {
      return this.pageIndex === 0 ? this.pagesLength - 1 : this.pageIndex - 1;
    },
    currentComponent() {
      return this.pages[this.pageIndex];
    }
  },
  mounted() {
    gsap.set(".home-beauty", { opacity: 1 });
    gsap.from(`.home-${this.currentComponent}`, {
      duration: 1.5,
      scale: 1.2,
      ease: "power4.out"
    });
  },
  methods: {
    wheelListener(e) {
      if (this.isScrolling) return;
      if (e.deltaY === -0) return;

      this.isScrolling = true;
      if (e.deltaY > 0) {
        this.$store.commit("updateDirection", "up");
        if (this.pageIndex === this.pagesLength - 1) {
          this.pageIndex = 0;
        } else {
          this.pageIndex++;
        }
      } else if (e.deltaY < 0) {
        this.$store.commit("updateDirection", "down");
        if (this.pageIndex === 0) {
          this.pageIndex = this.pagesLength - 1;
        } else {
          this.pageIndex--;
        }
      }

      setTimeout(() => {
        this.isScrolling = false;
      }, 2000);
    },
    swipeListener(direction) {
      if (this.isScrolling) return;

      this.isScrolling = true;
      if (direction === "bottom") {
        this.$store.commit("updateDirection", "up");

        if (this.pageIndex === this.pagesLength - 1) {
          this.pageIndex = 0;
        } else {
          this.pageIndex++;
        }
      } else if (direction === "top") {
        this.$store.commit("updateDirection", "down");
        if (this.pageIndex === 0) {
          this.pageIndex = this.pagesLength - 1;
        } else {
          this.pageIndex--;
        }
      }
      setTimeout(() => {
        this.isScrolling = false;
      }, 2000);
    },
    hoverCircle(e) {
      this.stopAnimations();
      gsap.to(".hover-circle .circle", {
        duration: 1,
        scale: 1.3,
        ease: "power4.out"
      });
      gsap.to(`.home-${this.currentComponent}`, {
        duration: 1,
        delay: 0.1,
        scale: 1.05,
        ease: "power4.out"
      });
    },
    leaveCircle() {
      this.stopAnimations();
      gsap.to(".hover-circle .circle", {
        duration: 0.5,
        scale: 1,
        ease: "power4.inOut"
      });
      gsap.to(`.home-${this.currentComponent}`, {
        duration: 0.5,
        scale: 1,
        ease: "power4.inOut"
      });
    },
    goToNext() {
      this.$store.commit("updateDirection", "up");

      if (this.pageIndex === this.pagesLength - 1) {
        this.pageIndex = 0;
      } else {
        this.pageIndex++;
      }
    },
    stopAnimations() {
      gsap.killTweensOf(".hover-circle .circle");
      gsap.killTweensOf(`.home-${this.currentComponent}`);
    }
  },
  watch: {
    pageIndex(newValue, oldValue) {
      const oldComponent = this.pages[oldValue];
      const newComponent = this.pages[newValue];
      const resetComponent = () => {
        gsap.set(`.home-${oldComponent}`, { yPercent: 0, opacity: 0 });
      };
      setTimeout(() => {
        this.numberIndex = this.pageIndex;
      }, 700);
      const tl = gsap.timeline();
      gsap.set(`.home-${newComponent}`, { opacity: 1 });
      tl.to(`.home-${oldComponent}`, {
        duration: 1,
        yPercent: this.direction === "up" ? 100 : -100,
        ease: "power4.out",
        onComplete: resetComponent
      }).from(
        `.home-${newComponent}`,
        {
          duration: 1,
          scale: 1.2,
          ease: "power4.out"
        },
        "-=1"
      );

      gsap.to(".collections .collection", {
        duration: 0.5,
        opacity: 0,
        stagger: 0.05
      });
      setTimeout(() => {
        gsap.set(".collections", { opacity: 0 });
      }, 400);

      setTimeout(() => {
        this.$store.commit("updatePages", {
          current: this.currentComponent,
          next: this.pages[this.nextIndex],
          previous: this.pages[this.previousIndex]
        });
      }, 500);
    },
    numberIndex() {
      const tl = gsap.timeline();
      tl.from(".indicator span", {
        duration: 0.5,
        opacity: 0,
        y: -10
      });
      gsap.set(".collections", { opacity: 1 });
      gsap.fromTo(
        ".collections .collection",
        {
          duration: 0.5,
          opacity: 0
        },
        {
          duration: 0.5,
          opacity: 1,
          stagger: 0.05
        }
      );
    },
    currentPage() {}
  }
};
</script>

<style lang="scss" scoped></style>
