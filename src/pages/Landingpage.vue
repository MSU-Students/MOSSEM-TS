<template>
  <q-page class="bg-img">
    <div class="q-gutter-md">
      <div class="row justify-between">
        <div class="col">
          <q-img
            elevated
            :class="$q.screen.lt.md ? '' : ''"
            src="~assets/background/landingpage.jpg"
            :ratio="16 / 9"
          >
            <transition appear enter-active-class="animated fadeIn">
              <div class="transparent q-mt-xl">
                <div
                  :class="
                    $q.screen.lt.md
                      ? 'font1 full text-center text-h6 text-white text-weight-bolder'
                      : 'font1 col text-left text-h4 text-white text-weight-bolder q-mt-xl q-pt-lg'
                  "
                >
                  <h1 v-if="!$q.screen.lt.md" class="text-center text-white">
                    Sining Pananadem
                  </h1>
                  <div v-else-if="$q.screen.lt.md" class="q-mt-xl q-pt-md">
                    Sining pananadem
                  </div>
                  <h3 v-if="!$q.screen.lt.md" class="text-white text-center">
                    A Web-Based Musical Arts Repository System for Sining
                    Pananadem Cultural Group of MSU-MARAWI
                  </h3>
                  <div v-else-if="$q.screen.lt.md" class="text-h6">
                    A Web-Based Musical Arts Repository System for Sining
                    Pananadem Cultural Group of MSU-MARAWI
                  </div>
                </div>
              </div>
            </transition>
          </q-img>
        </div>
      </div>
      <div class="row">
        <div
          class="q-pl-xl q-pt-xl col"
          data-aos="fadeIn"
          data-aos-easing="fadeOut"
          data-aos-duration="1500"
        >
          <q-img
            class="box"
            src="~assets/background/SP Group.jpeg"
            style="max-width: 1000px; height: 400px"
          >
          </q-img>
        </div>
        <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
          <q-card class="my-card Glassmorphismright col">
            <q-card-section class="q-gutter-md text-white">
              <div class="font3 text-bold text-h4">What Is Culture?</div>
              <div class="font1 text-subtitle2">
                Culture is the characteristics and knowledge of a particular
                group of people, encompassing language, religion, cuisine,
                social habits, music and arts. Culture is where people come
                from, who they are now, and where they are going. culture is
                what makes people unique, interesting individuals.
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row">
        <div class="q-pl-xl q-pt-xl col box">
          <q-img
            data-aos="fadeIn"
            data-aos-easing="fadeOut"
            data-aos-duration="1500"
            src="~assets/background/SP Group Pic.jpeg"
            style="
              max-width: 1000px;
              height: 400px;
              position: relative;
              top: 10px;
              left: 450px;
            "
          >
          </q-img>
        </div>
        <div data-aos="fade-up" data-aos-duration="1300" data-aos-delay="500">
          <q-card class="my-card-next Glassmorphism col">
            <q-card-section class="q-gutter-md text-white">
              <div class="font3 text-bold text-h4">
                What Is Sining Pananadem?
              </div>
              <div class="font1 text-subtitle2">
                Sining Pananadem is composed of young M’ranao artists, and its
                primary objectives are: to Preserve, Promote, to Protect and to
                Popularize the M’ranao indigenous culture of the south, it was
                established to counter act the effects of the exploitative force
                of westernization, moreover, the Sining Pananadem is aimed at
                promoting a culture of peace through cultural solidarity among
                all Filipino and the rest of the citizens of the world.
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="q-pt-xl text-white">
        <q-carousel
          animated
          v-model="slide"
          navigation
          infinite
          arrows
          keep-alive
          :autoplay="autoplay"
          transition-prev="slide-right"
          transition-next="slide-left"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide :name="1"
            ><q-video
              class="absolute-full"
              src="https://www.youtube.com/embed/kkMhBhfBuHU"
          /></q-carousel-slide>

          <q-carousel-slide :name="2"
            ><q-video
              class="absolute-full"
              src="https://www.youtube.com/embed/kkMhBhfBuHU"
          /></q-carousel-slide>
          <q-carousel-slide :name="3"
            ><q-video
              class="absolute-full"
              src="https://www.youtube.com/embed/kkMhBhfBuHU"
          /></q-carousel-slide>
          <q-carousel-slide :name="4"
            ><q-video
              class="absolute-full"
              src="https://www.youtube.com/embed/kkMhBhfBuHU"
          /></q-carousel-slide>
        </q-carousel>
      </div>
    </div>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  computed: {
    layout() {
      return this.$q.screen.lt.sm
        ? 'dense'
        : this.$q.screen.lt.md
        ? 'comfortable'
        : 'loose';
    }
  }
})
export default class LandingPage extends Vue {
  slide = 1;
  autoplay = true;
}
</script>

<style scopes>
.landing-bg {
  background-image: url('~assets/background/landingpage.jpg');
  background-position: center;
}

.my-card-next {
  background: transparent;
  width: 100%;
  max-width: 550px;
  position: relative;
  top: 150px;
  left: -800px;
}

.my-card {
  background: transparent;
  width: 100%;
  max-width: 500px;
  position: relative;
  top: 140px;
  left: -200px;
}
.bg-img {
  background-image: url('~assets/background/BackGroundBlur.jpg');
  padding: 0px;
}
.radius {
  border-radius: 28px;
}
.Glassmorphism {
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  background-image: linear-gradient(
    155deg,
    rgba(190, 190, 190) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border-radius: 28px;
  border-bottom: 1.8px solid rgba(255, 255, 255, 0.79);
  border-left: 1.8px solid rgba(255, 255, 255, 0.79);
  text-shadow: 2px 2px 10px #000000;
}
.Glassmorphismright {
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  background-image: linear-gradient(
    155deg,
    rgb(190, 190, 190) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border-radius: 28px;
  border-bottom: 1.8px solid rgba(255, 255, 255, 0.79);
  border-right: 1.8px solid rgba(255, 255, 255, 0.79);
  text-shadow: 2px 2px 10px #000000;
}
.box {
  transition: all 0.4s ease-in-out;
}
.make-it-fast {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
.make-it-fast::after {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.make-it-fast:hover::after {
  opacity: 1;
}
.box:hover {
  transform: scale(1.1, 1.1);
}
.box:hover::after {
  opacity: 1;
}
</style>
