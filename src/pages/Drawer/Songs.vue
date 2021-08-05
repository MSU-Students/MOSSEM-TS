<template>
  <q-page class="q-pa-md">
    <div class="text-white text-h2 text-center">SONGS</div>
    <q-scroll-area
      style="width: 100%"
      :style="$q.screen.lt.md ? 'height: 700px' : 'height: 620px'"
    >
      <div
        :class="$q.screen.lt.md ? '' : 'row justify-center items-center'"
        style="height: 620px"
      >
        <template>
          <div class="col-6">
            <transition appear enter-active-class="animated fadeInLeft">
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
                <template>
                  <q-carousel-slide
                    v-for="(song, index) in songs"
                    :name="song.name"
                    class="column no-wrap flex-center"
                    :key="index"
                  >
                  <!-- <img
                      :src="song.img"
                      style="max-width: 350px; height: 250px"
                    /> -->
                    <q-media-player
                      class="q-mt-sm"
                      radius="1rem"
                      :show-big-play-button="true"
                      type="audio"
                      color="white"
                      background-color="orange-6"
                      :source="song.url"
                    />
                  </q-carousel-slide>
                </template>
              </q-carousel>
            </transition>
          </div>
          <div class="col-6 flex flex-center text-center">
            <template v-for="(song, index) in songs">
              <q-card
                v-if="song.name == slide"
                :key="index"
                class="no-shadow bg-transparent"
              >
                <q-card-section class="bg-card" horizontal>
                  <q-card-section class="q-pt-xs text-white">
                    <div class="text-outlined">Lyrics</div>
                    <div
                      class="text-h2 text-white text-capitalize q-mt-sm q-mb-xs"
                    >
                      {{ song.name }}
                    </div>
                    <div class="text-subtitle1 text-white">
                      {{ song.description }}
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
                  <q-dialog v-model="viewdetails" seamless position="right" >
                    <q-card style="width: 350px" class="bg-white">
                      <q-btn dense flat icon="close" v-close-popup>
                        <q-tooltip content-class="bg-white text-primary"
                          >Close</q-tooltip
                        >
                      </q-btn>
                      <q-card-section class="bg-img ">
                        <div>
                          <div
                            class="text-h5 text-shadow text-white text-bold q-mt-sm q-mb-xs"
                          >
                            Song Writer/Composer:
                          </div>
                          <div
                            class="text-h5 text-shadow text-white text-capitalize q-pl-sm q-mt-sm q-mb-xs"
                          >-
                            {{ song.songwriter }}
                          </div>
                          <div
                            class="text-h5 text-shadow text-white text-bold q-mt-sm q-mb-xs"
                          >
                            Performed Places:
                          </div>
                          <div class="text-h5 text-shadow q-pl-sm text-white">
                            - {{ song.performedplaces }}
                          </div>
                          <div
                            class="text-h5 text-shadow text-white text-bold q-mt-sm q-mb-xs"
                          >
                            Date Created:
                          </div>
                          <div class=" text-h5 text-shadow q-pl-sm text-white">
                            - {{ song.datecreated }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-dialog>
                </div>
              </q-card>
            </template>
          </div>
        </template>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { SongDto } from 'src/services/rest-api';
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState('song', ['songs'])
  },
  methods: {
    ...mapActions('song', ['getAllSongs'])
  }
})
export default class Song extends Vue {
  slide = '';
  title = '';
  songs!: SongDto[];
  getAllSongs!: () => Promise<void>;
  viewdetails = false;

  async created() {
    await this.getAllSongs();
    this.slide = this.songs[0].name;
    console.log(this.slide);
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
</style>
