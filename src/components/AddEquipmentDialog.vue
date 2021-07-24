<template>
  <q-dialog v-model="ShowEquipmentDialog" transition-show="scale" persistent>
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-img
          style="width: 70px"
          :ratio="1"
          class="rounded-borders"
          src="~assets/logo/splogo1.png"
        />
        <q-toolbar-title class="text-weight-bold text-primary "
          >ADD NEW EQUIPMENT</q-toolbar-title
        >
        <q-btn
          color="primary"
          icon="close"
          size="md"
          @click="addEquipmentPopups(false), (checkerror = false)"
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
            label="Add"
            color="primary"
            text-color="white"
            @click="addEquipment()"
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
import { EquipmentDto } from 'src/services/rest-api';

@Component({
  computed: {
    ...mapState('uiNav', ['ShowEquipmentDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['addEquipmentPopups']),
    ...mapActions('equipment', ['createEquipment'])
  }
})
export default class AddEquipmentDialog extends Vue {
  ShowEquipmentDialog!: boolean;
  addEquipmentPopups!: (show: boolean) => void;
  createEquipment!: (payload: EquipmentDto) => Promise<void>;

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

  file: any = [];

  fileChoose(val: any) {
    this.file = val;
  }

  async addEquipment() {
    if (
      (this.equipment.name == '' && this.equipment.description == '') ||
      this.equipment.name == '' ||
      this.equipment.description == ''
    ) {
      this.checkerror = true;
    } else {
      const resUrl: any = await uploadService.uploadFile(
        this.file,
        'equipment'
      );
      if (typeof resUrl == 'string' || resUrl.name != 'FirebaseError') {
        await this.createEquipment({
          ...this.equipment,
          url: resUrl
        });
        this.$q.notify({
          type: 'positive',
          message: 'Upload Success!'
        });
        this.equipment = {
          id: '',
          url: '',
          name: '',
          description: '',
          dateaquired: '',
          quantity: '',
          status: ''
        };
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Something wrong!'
        });
      }
      this.addEquipmentPopups(false);
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
