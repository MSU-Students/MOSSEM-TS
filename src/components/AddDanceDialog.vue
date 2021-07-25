<template>
  <q-dialog
    v-model="ShowDanceDialog"
    transition-show="scale"
    persistent
    @show="showDialog()"
    @hide="hideDialog()"
  >
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-img
          style="width: 70px"
          :ratio="1"
          class="rounded-borders"
          src="~assets/logo/splogo1.png"
        />
        <q-toolbar-title class="text-weight-bold text-primary "
          ><span v-if="payload.onUpdate">UPDATE DANCE</span>
          <span v-else>ADD DANCE</span></q-toolbar-title
        >
        <q-btn
          color="primary"
          icon="close"
          size="md"
          @click="addDancePopups(false), (checkerror = false)"
        ></q-btn>
      </q-toolbar>
      <div class="q-pl-sm q-pr-sm">
        <q-input
          v-model="dance.name"
          ref="name"
          label="Dance Name"
          filled
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <div class="q-pl-sm q-pr-sm" style="max-width: 1000px">
        <q-input
          v-model="dance.url"
          ref="url"
          label="Dance Url"
          filled
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <div class="q-pl-sm q-pr-sm" style="max-width: 1000px">
        <q-input
          v-model="dance.description"
          ref="description"
          label="Dance Description"
          filled
          autogrow
        />
      </div>
      <div v-show="checkerror" class="text-center" style="max-width: 1000px">
        <q-dialog v-model="checkerror" auto-close seamless position="top">
          <q-card style="width: 350px">
            <q-linear-progress :value="1" color="white" />

            <q-card-section class="bg-white ">
              <div>
                <div class="text-weight-bold text-red text-center">
                  Oops! Check your input field you forgot something
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
      <q-card-actions class="row q-col-gutter-md">
        <div class="col-12">
          <q-btn
            class="full-width"
            :label="payload.onUpdate ? 'Update' : 'Add'"
            color="primary"
            text-color="white"
            @click="payload.onUpdate ? editDance() : addDance()"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import uploadService from 'src/services/upload.service';
import { DanceDto } from 'src/services/rest-api/api';
// import uploadService from 'src/services/upload.service';
@Component({
  computed: {
    ...mapState('uiNav', ['ShowDanceDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['addDancePopups']),
    ...mapActions('dance', ['createDance', 'updateDance'])
  }
})
export default class AddDanceDialog extends Vue {
  // vuex
  @Prop({ type: Object, default: {} }) readonly payload!: any;
  ShowDanceDialog!: boolean;
  addDancePopups!: (show: boolean) => void;
  createDance!: (payload: DanceDto) => Promise<void>;
  updateDance!: (payload: any) => Promise<void>;
  // local data
  checkerror = false;
  shouldShow = false;
  dance: any = {
    id: '',
    url: '',
    name: '',
    description: ''
  };
  file: any = [];
  fileChoose(val: any) {
    this.file = val;
  }

  showDialog() {
    this.dance = { ...this.payload, url: [] };
    console.log(this.dance);
  }

  hideDialog() {
    this.dance = {
      id: '',
      url: '',
      name: '',
      description: ''
    };
    this.$emit('clearData', this.dance);
  }

  async addDance() {
    if (
      (this.dance.name == '' &&
        this.dance.description == '' &&
        this.dance.url == '') ||
      this.dance.name == '' ||
      this.dance.description == '' ||
      this.dance.url == ''
    ) {
      this.checkerror = true;
    } else {
      const response = await this.createDance(this.dance);
      console.log('response: ', response);
      this.addDancePopups(false);
      console.log('response: ', response);
      this.$q.notify({
        type: 'positive',
        message: 'Upload Success!'
      });
      this.dance = {
        id: '',
        url: '',
        name: '',
        description: ''
      };
    }
  }
  async editDance() {
    delete this.dance.onUpdate;
    if (this.dance.url.length != 0) {
      const resUrl: any = await uploadService.uploadFile(this.file, 'dance');
      if (typeof resUrl == 'string' || resUrl.name != 'FirebaseError') {
        await this.updateDance({
          ...this.dance,
          url: resUrl
        });
        this.$q.notify({
          type: 'positive',
          message: 'Upload Success!'
        });
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Something wrong!'
        });
      }
    } else {
      await this.updateDance({
        ...this.dance,
        url: this.payload.url
      });
      this.$q.notify({
        type: 'positive',
        message: 'Upload Success!'
      });
    }
  }
}
</script>

<style scoped>
.__card {
  max-width: 100%;
  width: 500px;
}
</style>
