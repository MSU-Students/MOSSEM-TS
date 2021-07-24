<template>
  <q-dialog
    v-model="ShowInstrumentDialog"
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
          ><span v-if="payload.onUpdate">UPDATE INSTRUMENT</span>
          <span v-else>ADD INSTRUMENT</span></q-toolbar-title
        >
        <q-btn
          color="primary"
          icon="close"
          size="md"
          @click="addInstrumentPopups(false), (checkerror = false)"
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
      <div class="q-pl-sm q-pb-lg q-pr-sm">
        <q-input
          v-model="instrument.dateaquired"
          ref="dateaquired"
          type="date"
          hint="Date Aquired"
          filled
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <div class="q-pl-sm q-pb-lg q-pr-sm">
        <q-select
          label="Instrument Status"
          transition-show="jump-up"
          transition-hide="jump-up"
          filled
          v-model="instrument.status"
          :options="options"
        />
      </div>
      <div class="q-pl-sm q-pb-lg q-pr-sm">
        <q-input
          v-model.number="instrument.quantity"
          type="number"
          label="Instrument Quantity"
          filled
        />
      </div>

      <div class="q-pl-sm q-pb-md q-pr-sm" style="max-width: 1000px">
        <q-input
          v-model="instrument.description"
          filled
          type="Description"
          label="Instrument Description"
          autogrow
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
          @update:model-v]alue="fileChoose($event)"
        >
          <template v-slot:append>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
      <div v-show="checkerror" class="text-center" style="max-width: 1000px">
        <q-dialog v-model="checkerror" auto-close seamless position="top">
          <q-card style="width: 350px">
            <q-linear-progress :value="1" color="white" />

            <q-card-section class="bg-white ">
              <div>
                <div class="text-weight-bold text-red text-center">
                  Oops! Check your input field you forgot something!
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
            @click="payload.onUpdate ? editInstrument() : addInstrument()"
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
import { InstrumentDto } from 'src/services/rest-api';

@Component({
  computed: {
    ...mapState('uiNav', ['ShowInstrumentDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['addInstrumentPopups']),
    ...mapActions('instrument', ['createInstrument', 'updateInstrument'])
  }
})
export default class AddInstrumentDialog extends Vue {
  @Prop({ type: Object, default: {} }) readonly payload!: any;
  ShowInstrumentDialog!: boolean;
  addInstrumentPopups!: (show: boolean) => void;
  createInstrument!: (payload: InstrumentDto) => Promise<void>;
  updateInstrument!: (payload: any) => Promise<void>;

  checkerror = false;
  options = ['In good condition', 'damaged'];
  instrument: any = {
    id: '',
    url: '',
    name: '',
    description: '',
    dateaquired: '',
    quantity: '',
    status: ''
  };

  file: any = [];

  showDialog() {
    this.instrument = { ...this.payload, url: [] };
    console.log(this.instrument);
  }

  hideDialog() {
    this.instrument = {
      id: '',
      url: '',
      name: '',
      description: '',
      dateaquired: '',
      quantity: '',
      status: ''
    };
  }

  fileChoose(val: any) {
    this.file = val;
  }

  async addInstrument() {
    if (
      (this.instrument.name == '' && this.instrument.description == '') ||
      this.instrument.name == '' ||
      this.instrument.description == ''
    ) {
      this.checkerror = true;
    } else {
      const resUrl: any = await uploadService.uploadFile(
        this.file,
        'instrument'
      );
      if (typeof resUrl == 'string' || resUrl.name != 'FirebaseError') {
        await this.createInstrument({
          ...this.instrument,
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
      this.addInstrumentPopups(false);
    }
  }

  async editInstrument() {
    delete this.instrument.onUpdate;
    if (this.instrument.url.length != 0) {
      const resUrl: any = await uploadService.uploadFile(
        this.file,
        'instrument'
      );
      if (typeof resUrl == 'string' || resUrl.name != 'FirebaseError') {
        await this.updateInstrument({
          ...this.instrument,
          url: resUrl,
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
      await this.updateInstrument({
        ...this.instrument,
        url: this.payload.url,
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
