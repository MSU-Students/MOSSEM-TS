<template>
  <q-scroll-area style="height: 750px; max-width: 3000px">
    <div class="q-pa-md">
      <div class="row justify-center q-gutter-sm">
        <q-intersection
          v-for="(picture, index) in pictures"
          :key="index"
          transition="scale"
          class="example-item"
        >
          <q-card
            clickable
            v-ripple
            persistent
            transition-show="flip-down"
            transition-hide="flip-up"
            class="q-ma-sm radius backgroung-card text-white box"
            @click="showDialog(picture)"
          >
            <img :src="picture.url" height="205" />

            <q-card-section>
              <div class="text-h5">{{ picture.name }}</div>
            </q-card-section>
          </q-card>
        </q-intersection>
      </div>

      <q-dialog
        class="shadow-24"
        v-model="showImage"
        transition-show="scale"
        transition-hide="fade"
        @hide="showImage = false"
      >
        <q-card class="bg-transparent no-shadow text-white">
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>

          <q-card-section class="q-pt-none text-center">
            <img :src="dialogData.url" style="max-width: 100%" />
            <div class="text-h2">{{ dialogData.name }}</div>
            <div class="text-subtitle2">{{ dialogData.description }}</div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-scroll-area>
</template>

<script lang="ts">
import { PictureDto } from 'src/services/rest-api';
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState('picture', ['pictures'])
  },
  methods: {
    ...mapActions('picture', ['getAllPictures'])
  }
})
export default class Picture extends Vue {
  showImage = false;
  dialogData: PictureDto = {
    id: '',
    url: '',
    name: '',
    description: ''
  };
  pictures!: PictureDto[];
  getAllPictures!: () => Promise<void>;

  async created() {
    await this.getAllPictures();
    // this.slide = this.pictures[0].name;
  }

  showDialog(picture: PictureDto) {
    this.showImage = true;
    this.dialogData = picture;
  }
}
</script>

<style scoped>
.example-item {
  height: 290px;
  width: 290px;
}
.backgroung-card {
  background-image: url('~assets/background/TribalPattern.jpg');
  background-position: center;
  box-shadow: 0 0 0 1000px rgb(0 0 0 / 45%) inset;
}
.box {
  background-color: #fff;
  transition: all 0.4s ease-in-out;
}

/* The fast way */

.make-it-fast {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

/* Pre-render the bigger shadow, but hide it */

.make-it-fast::after {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

/* Transition to showing the bigger shadow on hover */

.make-it-fast:hover::after {
  opacity: 1;
}

/* Scale up the box */
.box:hover {
  transform: scale(1.1, 1.1);
}

/* Fade in the pseudo-element with the bigger shadow */
.box:hover::after {
  opacity: 1;
}

/*Misc.*/
body {
  background: #f4f4f6;
}
</style>
