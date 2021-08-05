<template>
  <q-page class="q-pa-md">
    <div
      :class="
        $q.screen.lt.md
          ? 'text-h4 text-center text-white'
          : 'text-white text-h2 text-center'
      "
    >
      INSTRUMENTS
    </div>
    <q-scroll-area
      :style="$q.screen.lt.md ? 'height: 700px' : 'height: 620px'"
      style="width: 100%"
    >
      <div
        v-if="instruments.length != 0"
        :class="$q.screen.lt.md ? '' : 'row justify-center items-center'"
        style="height: 620px"
      >
        <template>
          <div class="col-6 flex flex-center text-center">
            <template v-for="(instrument, index) in instruments">
              <q-card
                v-if="instrument.name == slide"
                :key="index"
                class="no-shadow bg-transparent"
              >
                <q-card-section class="bg-card" horizontal>
                  <q-card-section class="q-pt-xs text-white">
                    <div class="text-overline">Description</div>
                    <div
                      class="text-h2 text-white text-capitalize q-mt-sm q-mb-xs"
                    >
                      {{ instrument.name }}
                    </div>
                    <div class="text-subtitle1 text-white">
                      {{ instrument.description }}
                    </div>
                  </q-card-section>
                </q-card-section>
                <q-btn
                  label="View Details"
                  icon="keyboard_arrow_right"
                  color="primary"
                  @click="viewdetails = true"
                />
                <div
                  v-show="viewdetails"
                  class="text-center"
                  style="max-width: 1000px"
                >
                  <q-dialog v-model="viewdetails" seamless position="left">
                    <q-card style="width: 350px" class="bg-grey">
                      <q-btn
                        dense
                        flat
                        color="white"
                        align="right"
                        icon="close"
                        v-close-popup
                      >
                        <q-tooltip content-class="bg-white text-primary"
                          >Close</q-tooltip
                        >
                      </q-btn>
                      <q-card-section class="header-bg ">
                        <div>
                          <div
                            class="text-h3 text-center text-shadow text-white text-capitalize q-mt-sm q-mb-xs"
                          >
                            {{ instrument.name }}
                          </div>
                          <div
                            class="text-h5  q-pl-sm text-shadow text-white text-bold q-mt-sm q-mb-xs"
                          >
                            Date Aquired:
                          </div>
                          <div
                            class="text-h5 text-shadow text-white text-capitalize q-pl-sm q-mt-sm q-mb-xs"
                          >
                            -
                            {{ instrument.dateaquired }}
                          </div>
                          <div
                            class="text-h5  q-pl-sm text-shadow text-white text-bold q-mt-sm q-mb-xs"
                          >
                            Instrument Status:
                          </div>
                          <div class="text-h5 text-shadow q-pl-sm text-white">
                            - {{ instrument.status }}
                          </div>
                          <div
                            class="text-h5 text-shadow  q-pl-sm text-white text-bold q-mt-sm q-mb-xs"
                          >
                            Instrument Quantity:
                          </div>
                          <div class="text-shadow text-h5 q-pl-sm text-white">
                            - {{ instrument.quantity }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-dialog>
                </div>
              </q-card>
            </template>
          </div>
          <div class="col-6">
            <transition appear enter-active-class="animated fadeInRight">
              <q-carousel
                v-model="slide"
                transition-prev="jump-left"
                transition-next="jump-right"
                swipeable
                infinite
                animated
                control-color="white"
                navigation
                padding
                arrows
                width="100px"
                height="500px"
                class="bg-transparent text-white rounded-borders"
                @transition="moveCarousel(slide)"
              >
                <q-carousel-slide
                  v-for="(instrument, index) in instruments"
                  :name="instrument.name"
                  class="column no-wrap flex-center"
                  :key="index"
                >
                  <img
                    :src="instrument.url"
                    style="max-width: 650px; height: 550px"
                  />
                </q-carousel-slide>
              </q-carousel>
            </transition>
          </div>
        </template>
      </div>
      <div class="text-h5 text-center text-white" v-else>
        NO CONTENT
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { InstrumentDto } from 'src/services/rest-api';
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState('instrument', ['instruments'])
  },
  methods: {
    ...mapActions('instrument', ['getAllInstruments'])
  }
})
export default class Instrument extends Vue {
  slide = '';
  title = '';
  instruments!: InstrumentDto[];
  getAllInstruments!: () => Promise<void>;

  viewdetails = false;

  async created() {
    await this.getAllInstruments();
    if (this.instruments.length != 0) {
      this.slide = this.instruments[0].name;
    }
  }

  moveCarousel(newVal: string) {
    this.title = newVal;
  }
}
</script>

<style scoped>
.bg-img {
  background-image: url('~assets/background/BackGroundBlur.jpg');
  padding: 10px;
}
.text-shadow {
  text-shadow: 1px 1px 6px #000000;
}
.header-bg {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.082), rgba(7, 7, 7, 0.73)), url('~assets/background/TribalPattern.jpg');
  background-position: center;
  box-shadow: 0 0 0 1000px rgb(0 0 0 / 45%) inset;
}
</style>
