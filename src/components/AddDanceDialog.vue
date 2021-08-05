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
          ><span v-if="data.isUpdating">UPDATE DANCE</span>
          <span v-else>ADD DANCE</span></q-toolbar-title
        >
        <q-btn
          color="primary"
          icon="close"
          size="md"
          @click="closeDialog()"
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
          type="textarea"
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
            :label="data.isUpdating ? 'Update' : 'Add'"
            color="primary"
            text-color="white"
            @click="data.isUpdating ? editDance() : addDance()"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import { DanceDto } from 'src/services/rest-api/api';
import { FileTypes, IUploadFile } from 'src/store/upload-module/state';

@Component({
  computed: {
    ...mapState('uiNav', ['ShowDanceDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['addDancePopups']),
    ...mapActions('dance', ['createDance', 'updateDance', 'getAllDances']),
    ...mapActions('uploads', ['uploadFile'])
  }
})
export default class AddDanceDialog extends Vue {
  // vuex
  @Prop({ type: Object, default: {} }) readonly data!: { payload: DanceDto, isUpdating: boolean};
  uploadFile!:(payload:{file: File, type: FileTypes, title: string}) => Promise<IUploadFile>;
  ShowDanceDialog!: boolean;
  addDancePopups!: (show: boolean) => void;
  createDance!: (payload: DanceDto) => Promise<void>;
  updateDance!: (payload: any) => Promise<void>;
  getAllDances!: () => Promise<void>;
  // local data
  checkerror = false;
  shouldShow = false;
  loading = false;
  dance: DanceDto = {
    id: '',
    url: '',
    name: '',
    description: ''
  };
  file: File = new File([], 'Select File');
  fileChoose(val: any) {
    this.file = val;
  }



  showDialog() {
    this.dance = this.data.payload || this.dance;
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
    this.loading = true;
    if (
      (this.dance.name == '' &&
        this.dance.description == '' &&
        this.dance.url == '') ||
      this.dance.name == '' ||
      this.dance.description == '' ||
      this.dance.url == ''
    ) {
      this.checkerror = true;
      this.loading = false;
    } else {
      await this.createDance(this.dance);
      this.addDancePopups(false);
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
      this.loading = false;
    }
  }
  async editDance() {
    this.loading = true;
    try {
      await this.updateDance(this.dance);
      await this.getAllDances();
      this.addDancePopups(false);
      this.$q.notify({
        type: 'positive',
        message: 'Edited Successfully!'
      });
      this.loading = false;
      this.dance = {
        id: '',
        url: '',
        name: '',
        description: ''
      };
    } catch (error) {
      this.$q.notify({
        type: 'negative',
        message: 'Something wrong!'
      });
      this.loading = false;
    }
  }
  closeDialog() {
    this.addDancePopups(false);
    this.checkerror = false;
    this.dance = {
      id: '',
      url: '',
      name: '',
      description: ''
    };
  }
}
</script>

<style scoped>
.__card {
  max-width: 100%;
  width: 500px;
}
</style>
