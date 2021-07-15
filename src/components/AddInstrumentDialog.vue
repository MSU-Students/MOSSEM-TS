<template>
  <q-dialog v-model="ShowInstrumentDialog" transition-show="scale" persistent>
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-img
          style="width: 70px"
          :ratio="1"
          class="rounded-borders"
          src="~assets/logo/splogo1.png"
        />
        <q-toolbar-title class="text-weight-bold text-primary "
          >ADD NEW INSTRUMENT</q-toolbar-title
        >
        <q-btn
          color="primary"
          icon="close"
          size="md"
          @click="addInstrumentPopups(false)"
        ></q-btn>
      </q-toolbar>
      <div class="q-pl-sm q-pr-sm">
        <q-input
          v-model="instrument.name"
          ref="firstName"
          filled
          label="Instrument Name"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <div class="q-pl-sm q-pr-sm">
        <q-file
          color="red-10"
          ref="docFile"
          v-model="file"
          filled
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
          label="Choose File"
          accept=".png"
          @update:model-value="fileChoose($event)"
        >
          <template v-slot:append>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
      <div class="q-pl-sm q-pr-sm" style="max-width: 1000px">
        <q-input
          v-model="instrument.description"
          filled
          type="Description"
          label="Instrument Description"
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
            @click="addInstrument()"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import uploadService from 'src/services/upload.service';
import { InstrumentDto } from 'src/services/rest-api';

@Component({
  computed: {
    ...mapState('uiNav', ['ShowInstrumentDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['addInstrumentPopups']),
    ...mapActions('instrument', ['createInstrument'])
  }
})
export default class AddInstrumentDialog extends Vue {
  ShowInstrumentDialog!: boolean;
  addInstrumentPopups!: (show: boolean) => void;
  createInstrument!: (payload: InstrumentDto) => Promise<void>;

  instrument: InstrumentDto = {
    id: '',
    url: '',
    name: '',
    description: ''
  };

  file: any = [];

  fileChoose(val: any) {
    this.file = val;
  }
  
  async addInstrument() {
    const resUrl: string = await uploadService.uploadFile(
      this.file,
      'instrument'
    );
    console.log('resUrl: ', resUrl);
    console.log({ ...this.instrument, url: resUrl });
    const response = await this.createInstrument({
      ...this.instrument,
      url: resUrl
    });
    console.log('response: ', response);
    this.addInstrumentPopups(false);
  }
}
</script>

<style scoped>
.__card {
  max-width: 100%;
  width: 500px;
}
</style>
