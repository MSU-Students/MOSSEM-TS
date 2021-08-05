<template>
  <q-dialog
    v-model="ShowEquipmentDialog"
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
          ><span v-if="data.isUpdating">UPDATE EQUIPMENT</span>
          <span v-else>ADD EQUIPMENT</span></q-toolbar-title
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
          v-model="equipment.name"
          ref="firstName"
          filled
          label="Equipment Name"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <div class="q-pl-sm q-pb-lg q-pr-sm">
        <q-input
          v-model="equipment.dateaquired"
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
          label="Equipment Status"
          transition-show="jump-up"
          transition-hide="jump-up"
          filled
          v-model="equipment.status"
          :options="options"
        />
      </div>
      <div class="q-pl-sm q-pb-lg q-pr-sm">
        <q-input
          v-model.number="equipment.quantity"
          type="number"
          label="Equipment Quantity"
          filled
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
      <div class="q-pl-sm q-pr-sm" style="max-width: 1000px">
        <q-input
          v-model="equipment.description"
          filled
          type="Description"
          label="Equipment Description"
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
            @click="data.isUpdating ? editEquipment() : addEquipment()"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import { EquipmentDto } from 'src/services/rest-api';
import { FileTypes, IUploadFile } from 'src/store/upload-module/state';

@Component({
  computed: {
    ...mapState('uiNav', ['ShowEquipmentDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['addEquipmentPopups']),
    ...mapActions('equipment', [
      'createEquipment',
      'updateEquipment',
      'getAllEquipments'
    ]),
    ...mapActions('uploads', ['uploadFile'])
  }
})
export default class AddEquipmentDialog extends Vue {
  @Prop({ type: Object, default: {} }) readonly data!: { payload: EquipmentDto, isUpdating: boolean};
  ShowEquipmentDialog!: boolean;
  uploadFile!:(payload:{file: File, type: FileTypes, title: string}) => Promise<IUploadFile>;
  addEquipmentPopups!: (show: boolean) => void;
  createEquipment!: (payload: EquipmentDto) => Promise<void>;
  updateEquipment!: (payload: any) => Promise<void>;
  getAllEquipments!: () => Promise<void>;

  checkerror = false;
  options = ['In good condition', 'damaged'];
  equipment: EquipmentDto = {
    id: '',
    url: '',
    name: '',
    description: '',
    dateaquired: '',
    quantity: '',
    status: ''
  };

  file: File = new File([], 'Select File');

  fileChoose(val: any) {
    this.file = val;
  }

  showDialog() {
    this.equipment = { ...this.data.payload };
  }

  hideDialog() {
    this.$emit('clearData', this.equipment);
  }

  async addEquipment() {
    try {
      if (
        (this.equipment.name == '' && this.equipment.description == '') ||
        this.equipment.name == '' ||
        this.equipment.description == ''
      ) {
        this.checkerror = true;
      } else {
        const res = await this.uploadFile(
          {
            file: this.file,
            type: 'image',
            title: this.equipment.name
          }

        );
        const resUrl = res.url;
        if (typeof resUrl == 'string') {
          await this.createEquipment({
            ...this.equipment,
            url: resUrl
          });
          this.$q.notify({
            type: 'positive',
            message: 'Upload Success!'
          });
          this.resetForm();
        } else {
          throw 'Something wrong!';
        }
      }
    } catch (error) {
      this.$q.notify({
        type: 'negative',
        message: 'Something wrong!',
        caption: error.message
      });
    } finally {
      this.addEquipmentPopups(false);
    }
  }

  async editEquipment() {
    try {
      if (this.file.size > 0) {
        const res = await this.uploadFile({
          file:  this.file,
          type: 'image',
          title: this.equipment.name
        });
        this.equipment.url = res.url;
      } 
      await this.updateEquipment({
        ...this.equipment
      });
      this.$q.notify({
        type: 'positive',
        message: 'Edited Successfully!'
      });
      this.resetForm();
      await this.getAllEquipments();
      this.addEquipmentPopups(false);
    } catch (error) {
      this.$q.notify({
        type: 'negative',
        message: 'Something wrong!',
        caption: error.message || error
      });
    }
  }
  resetForm() {
    this.equipment = {
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
  closeDialog() {
    this.addEquipmentPopups(false);
    this.checkerror = false;
    this.resetForm();
  }
}
</script>

<style scoped>
.__card {
  max-width: 100%;
  width: 500px;
}
</style>
