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
          ><span v-if="data.isUpdating">UPDATE INSTRUMENT</span>
          <span v-else>ADD INSTRUMENT</span></q-toolbar-title
        >
        <q-btn
          color="primary"
          icon="close"
          size="md"
          to="/admin/instruments"
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
            :label="data.isUpdating ? 'Update' : 'Add'"
            color="primary"
            text-color="white"
            @click="data.isUpdating ? editInstrument() : addInstrument()"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import uploadService from 'src/services/upload.service';
import { InstrumentDto } from 'src/services/rest-api';
import { FileTypes, IUploadFile } from 'src/store/upload-module/state';

@Component({
  computed: {
  },
  methods: {
    ...mapActions('instrument', [
      'createInstrument',
      'updateInstrument',
      'getAllInstruments'
    ]),
    ...mapActions('uploads', ['uploadFile'])
  }
})
export default class AddInstrumentDialog extends Vue {
  @Prop({ type: Object, default: {} }) readonly data!: { payload: InstrumentDto, isUpdating: boolean};
  get ShowInstrumentDialog() : boolean {
    return /^\/admin\/instruments\/(edit|new)$/.exec(this.$route.path) != null;
  }
  uploadFile!:(payload:{file: File, type: FileTypes, title: string}) => Promise<IUploadFile>;
  createInstrument!: (payload: InstrumentDto) => Promise<void>;
  updateInstrument!: (payload: any) => Promise<void>;
  getAllInstruments!: () => Promise<void>;

  checkerror = false;
  options = ['In good condition', 'Damaged'];
  instrument: InstrumentDto = {
    id: '',
    url: '',
    name: '',
    description: '',
    dateaquired: '',
    quantity: '',
    status: ''
  };

  file: File = new File([], 'Select File');

  showDialog() {
    this.instrument = { ...this.data.payload };
  }

  hideDialog() {
    this.$emit('clearData', this.instrument);
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
      try {
        const res = await this.uploadFile({
          file: this.file,
          type: 'image',
          title: this.instrument.name
        });
        const resUrl = res.url;
        if (typeof resUrl == 'string') {
          await this.createInstrument({
            ...this.instrument,
            url: resUrl
          });
          this.$q.notify({
            type: 'positive',
            message: 'Upload Success!'
          });
        } else {
          throw 'No image uploaded';
        }
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Something wrong!',
          caption: error.message || error
        });
      } finally {
        await this.closeDialog();
      }
    }
  }

  private resetForm() {
    this.instrument={
      id: '',
      url: '',
      name: '',
      description: '',
      dateaquired: '',
      quantity: '',
      status: ''
    };
    this.file = new File([], 'Select File');
  }

  async editInstrument() {
    try {
      if (this.file.size > 0) {
        
        const res = await uploadService.uploadFile(
          this.file,
          'instrument'
        );
        this.instrument.url = res.url;
          
      } 
      
      await this.updateInstrument({
        ...this.instrument
      });
      this.$q.notify({
        type: 'positive',
        message: 'Edited Successfully!'
      });
      this.resetForm();
      await this.getAllInstruments();
    } catch (error) {
      this.$q.notify({
        type: 'negative',
        message: 'Something wrong!',
        caption: error.message
      });
    } finally {
      await this.$router.replace('/admin/instruments');
    }
  }

  async closeDialog() {
    this.checkerror = false;
    this.resetForm();
    await this.$router.replace('/admin/instruments')
  }
}
</script>

<style scoped>
.__card {
  max-width: 100%;
  width: 500px;
}
</style>
