<template>
  <q-page class="q-pa-md">
    <div
      :class="
        $q.screen.lt.md
          ? 'text-h4 text-center text-white'
          : 'text-white text-h2 text-center'
      "
    >
      EQUIPMENTS
    </div>
    <q-scroll-area
      :style="$q.screen.lt.md ? 'height: 700px' : 'height: 620px'"
      style="width: 100%"
    >
      <div
        v-if="equipments.length != 0"
        :class="$q.screen.lt.md ? '' : 'row justify-center items-center'"
        style="height: 620px"
      >
        <template>
          <div class="col-6 flex flex-center text-center">
            <template v-for="(equipment, index) in equipments">
              <q-card
                v-if="equipment.name == slide"
                :key="index"
                class="no-shadow bg-transparent"
              >
                <q-card-section class="bg-card" horizontal>
                  <q-card-section class="q-pt-xs text-white">
                    <div class="text-overline">Description</div>
                    <div
                      class="text-h2 text-white text-capitalize q-mt-sm q-mb-xs"
                    >
                      {{ equipment.name }}
                    </div>
                    <div class="text-subtitle1 text-white">
                      {{ equipment.description }}
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
                    <q-card style="width: 350px" class="bg-white">
                      <q-btn
                        dense
                        flat
                        icon="close"
                        v-close-popup
                      >
                        <q-tooltip content-class="bg-white text-primary"
                          >Close</q-tooltip
                        >
                      </q-btn>
                      <q-card-section class="bg-img ">
                        <div>
                          <div
                            class="text-h3 text-center text-shadow text-white text-capitalize q-mt-sm q-mb-xs"
                          >
                            {{ equipment.name }}
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
                            {{ equipment.dateaquired }}
                          </div>
                          <div
                            class="text-h5  q-pl-sm text-shadow text-white text-bold q-mt-sm q-mb-xs"
                          >
                            Equipment Status:
                          </div>
                          <div class="text-h5 text-shadow q-pl-sm text-white">
                            - {{ equipment.status }}
                          </div>
                          <div
                            class="text-h5 text-shadow  q-pl-sm text-white text-bold q-mt-sm q-mb-xs"
                          >
                            Equipment Quantity:
                          </div>
                          <div class="text-shadow text-h5 q-pl-sm text-white">
                            - {{ equipment.quantity }}
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
                  v-for="(equipment, index) in equipments"
                  :name="equipment.name"
                  class="column no-wrap flex-center"
                  :key="index"
                >
                  <img
                    :src="equipment.url"
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
import { EquipmentDto } from 'src/services/rest-api';
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState('equipment', ['equipments'])
  },
  methods: {
    ...mapActions('equipment', ['getAllEquipments'])
  }
})
export default class Equipment extends Vue {
  slide = '';
  title = '';
  equipments!: EquipmentDto[];
  getAllEquipments!: () => Promise<void>;

  viewdetails = false;

  async created() {
    await this.getAllEquipments();
    if (this.equipments.length != 0) {
      this.slide = this.equipments[0].name;
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
</style>
