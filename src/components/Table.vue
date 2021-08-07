<template>
  <q-table
    :title="title"
    :data="data"
    :columns="columns"
    :filter="search"
    row-key="id"
  >
    <template v-slot:top-right>
      <q-input
        dense
        debounce="300"
        color="primary"
        label="Search"
        clearable
        v-model="search"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th auto-width />
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-btn
            size="sm"
            color="primary"
            round
            dense
            @click="props.expand = !props.expand"
            :icon="props.expand ? 'remove' : 'add'"
          />
        </q-td>
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>
        <q-td auto-width>
          <q-btn
            rounded
            color="primary"
            label="Update"
            @click="editItem(props.row)"
          />
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%" style="white-space: none !important">
          <div class="q-pa-md">
            <q-video
              style="height: 30vw; width: 100% ,"
              v-if="title.toLowerCase() == 'dance'"
              :src="convertUrl(props.row.url)"
            />
            <div
              v-else-if="
                title.toLowerCase() == 'songs' &&
                typeof props.row.url == 'string'
              "
              class="row"
            >
              <div class="col-6">
                <q-media-player
                  style="max-width: 380px; width: 100%"
                  class="bg-transparent shadow-24"
                  color="orange"
                  shadow-color="green"
                  type="audio"
                  :source="props.row.url"
                />
              </div>
              <div class="col text-center">
                <div>
                  {{ props.row.description }}
                </div>
              </div>
            </div>
            <div v-else class="row">
              <div class="col-6">
                <q-img
                  v-if="props.row.url != '' && typeof props.row.url == 'string'"
                  :src="props.row.url"
                  basic
                  style="border: 1px solid black"
                ></q-img>
              </div>
              <div class="col-6 text-center">
                <div>
                  {{ props.row.description }}
                </div>
              </div>
            </div>
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import helperService from 'src/services/helper.service';
import { mapState, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState('dance', ['dances']),
    ...mapState('instrument', ['instruments']),
    ...mapState('picture', ['pictures']),
    ...mapState('song', ['songs']),
    ...mapState('equipment', ['equipments']),
  },
  methods: {
    ...mapActions('uiNav', ['addDancePopups']),
    ...mapActions('uiNav', ['addInstrumentPopups']),
    ...mapActions('uiNav', ['addPicturePopups']),
    ...mapActions('uiNav', ['addSongPopups']),
    ...mapActions('uiNav', ['addEquipmentPopups']),
  },
})
export default class List extends Vue {
  // @Prop({ type: Boolean, required: true }) readonly loading!: boolean;
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: Array, required: true }) readonly data!: any[];
  @Prop({ type: Array, required: true }) readonly columns!: any[];

  addDancePopups!: (show: boolean) => void;
  addInstrumentPopups!: (show: boolean) => void;
  addPicturePopups!: (show: boolean) => void;
  addSongPopups!: (show: boolean) => void;
  addEquipmentPopups!: (show: boolean) => void;

  search = '';

  convertUrl(url: string) {
    return helperService.convertUrl(url);
  }

  async editItem(payload: any) {
    this.$emit('view', { payload: payload, isUpdating: true });
    await this.$router.push('/admin/' + this.title.toLowerCase() + '/edit');
  }
}
</script>

<style scoped>
.q-table--no-wrap th,
.q-table--no-wrap td {
  white-space: normal;
}
</style>
