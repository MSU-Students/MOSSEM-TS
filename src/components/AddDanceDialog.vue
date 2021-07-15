<template>
  <q-dialog v-model="ShowDanceDialog" transition-show="scale" persistent>
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-img
          style="width: 70px"
          :ratio="1"
          class="rounded-borders"
          src="~assets/logo/splogo1.png"
        />
        <q-toolbar-title class="text-weight-bold text-primary "
          >ADD NEW DANCE</q-toolbar-title
        >
        <q-btn
          color="primary"
          icon="close"
          size="md"
          @click="addDancePopups(false)"
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
      <q-card-actions class="row q-col-gutter-md">
        <div class="col-12">
          <q-btn
            class="full-width"
            label="Add"
            color="primary"
            text-color="white"
            @click="addDance()"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import { DanceDto } from 'src/services/rest-api/api';
// import uploadService from 'src/services/upload.service';

@Component({
  computed: {
    ...mapState('uiNav', ['ShowDanceDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['addDancePopups']),
    ...mapActions('dance', ['createDance'])
  }
})
export default class AddDanceDialog extends Vue {
  // vuex
  ShowDanceDialog!: boolean;
  addDancePopups!: (show: boolean) => void;
  createDance!: (payload: DanceDto) => Promise<void>;
  // local data
  shouldShow = false;
  dance: DanceDto = {
    id: '',
    url: '',
    name: '',
    description: ''
  };
  file: any = [];

  fileChoose(val: any) {
    this.file = val;
  }

  async addDance() {
    const response = await this.createDance(this.dance);
    console.log('response: ', response);
    this.addDancePopups(false);
  }
}
</script>

<style scoped>
.__card {
  max-width: 100%;
  width: 500px;
}
</style>
