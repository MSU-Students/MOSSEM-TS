<template>
  <q-page class="q-px-lg flex flex-center">
    <q-ajax-bar
      class="absolute-top"
      ref="bar"
      position="top"
      color="white"
      size="5px"
      skip-hijack
    />
    <div class="q-gutter-md">
      <transition appear enter-active-class="animated fadeInRight">
        <q-carousel
          v-model="slide"
          transition-prev="slide-left"
          transition-next="slide-right"
          swipeable
          animated
          control-color="primary"
          navigation
          padding
          arrows
          infinite
          :fullscreen.sync="fullscreen"
          height="310px"
          class="text-white shadow-24 transparent radius"
        >
          <template v-slot:navigation-icon="{ active, btnProps, onClick }">
            <q-btn
              v-if="active"
              size="lg"
              icon="home"
              color="primary"
              flat
              round
              dense
              @click="onClick"
            />
            <q-btn
              v-else
              size="sm"
              :icon="btnProps.icon"
              color="dark"
              flat
              round
              dense
              @click="onClick"
            />
          </template>
          <q-carousel-slide
            v-for="(dance, index) in dances"
            :key="index"
            :name="dance.name"
          >
            <div class="q-pa-md">
              <q-video class="absolute-full" :src="convertUrl(dance.url)" />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </transition>
      <template v-for="dance in dances">
        <q-card
          class="bg-img radius"
          v-if="dance.name == slide"
          :key="dance.id"
          style="width: 80vw"
          ><transition appear enter-active-class="animated fadeIn">
            <q-card-section>
              <div class="text-h2 text-center text-white">
                {{ dance.name }}
              </div>
              <div style="font-size: 1.5em" class="text-center text-white">
                {{ dance.description }}
              </div>
            </q-card-section>
          </transition>
        </q-card>
        <q-tooltip :key="dance.id" anchor="top left" self="center right" :offset="[10, 10]">
          <strong>Hover Here!</strong>
          (<q-icon name="keyboard_arrow_left"/>)
        </q-tooltip>
      </template>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import helperService from 'src/services/helper.service';
import { DanceDto } from 'src/services/rest-api';

interface RefsVue extends Vue {
  start(): void;
  stop(): void;
}

@Component({
  computed: {
    ...mapState('dance', ['dances'])
  },
  methods: {
    ...mapActions('dance', ['getAllDances'])
  }
})
export default class Dance extends Vue {
  $refs!: {
    bar: RefsVue;
  };
  // vuex here
  dances!: DanceDto[];
  getAllDances!: () => Promise<DanceDto[]>;

  // local data here
  slide = 'Maranao';
  fullscreen = false;
  loading = false;
  title = '';

  async mounted() {
    this.$refs.bar.start();
    const dance = await this.getAllDances();
    this.slide = dance[0].name;
    this.$refs.bar.stop();
  }

  convertUrl(url: string) {
    return helperService.convertUrl(url);
  }

  moveCarousel(newVal: string) {
    this.title = newVal;
  }
}
</script>

<style scoped>
.page-pos {
  position: fixed;
}

.bg-img {
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(7, 7, 7, 0.5)
    ),
    url('~assets/background/TribalPatternWithEffect.jpg');
}
</style>
