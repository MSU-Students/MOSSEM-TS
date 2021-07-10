<template>
  <q-page class="q-px-lg flex flex-center">
    <div class="q-gutter-md">
      <transition appear enter-active-class="animated fadeInRight">
        <q-carousel
          v-model="slide"
          transition-prev="slide-down"
          transition-next="slide-up"
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
              color="yellow"
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
            {{ convertUrl(dance.url) }}
            <div class="q-pa-md">
              <q-video class="absolute-full" :src="convertUrl(dance.url)" />
            </div>
          </q-carousel-slide>

          <template v-slot:control>
            <q-carousel-control position="bottom-right" :offset="[18, 18]">
              <q-btn
                push
                round
                dense
                color="white"
                text-color="primary"
                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="fullscreen = !fullscreen"
              />
            </q-carousel-control>
          </template>
        </q-carousel>
      </transition>
      <template v-for="(dance, index) in dances">
        <q-card
          class="bg-img radius"
          v-if="dance.name == slide"
          :key="index"
          style="width: 80vw"
        >
          <q-card-section>
            <div class="text-h2 text-center text-white">
              {{ dance.name }}
            </div>
            <div style="font-size: 1.5em" class="text-center text-white">
              {{ dance.description }}
            </div>
          </q-card-section>
        </q-card>
      </template>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import helperService from 'src/services/helper.service';

interface IDance {
  url: string;
  name: string;
  description: string;
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
  // vuex here
  dances!: IDance[];
  getAllDances!: () => Promise<IDance[]>;

  // local data here
  slide = 'Maranao';
  fullscreen = false;
  title = '';

  async created() {
    const dance = await this.getAllDances();
    this.slide = dance[0].name;
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
  background-image: url('~assets/background/TribalPatternWithEffect.jpg');
}
</style>
