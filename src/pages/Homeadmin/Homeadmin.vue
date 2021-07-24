<template>
  <transition appear enter-active-class="animated fadeIn">
    <q-scroll-area style="height: 600px">
      <q-page class="text-center text-h4 q-pa-lg">
        <q-card class="q-pa-md">
          <div class="row">
            <div class="col"></div>
          </div>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="dance" label="Dances" />
            <q-tab name="instruments" label="Instruments" />
            <q-tab name="pictures" label="Gallery" />
            <q-tab name="songs" label="Songs" />
            <q-tab name="equipments" label="Equipments" />
          </q-tabs>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="dance">
              <Table
                :title="tab.toUpperCase()"
                :data="dataDances"
                :columns="columns"
                @view="view"
              />
            </q-tab-panel>

            <q-tab-panel name="instruments">
              <Table
                :title="tab.toUpperCase()"
                :data="dataInstruments"
                :columns="columns"
                @view="view"
              />
            </q-tab-panel>

            <q-tab-panel name="pictures">
              <Table
                :title="tab.toUpperCase()"
                :data="dataPictures"
                :columns="columns"
              />
            </q-tab-panel>

            <q-tab-panel name="songs">
              <Table
                :title="tab.toUpperCase()"
                :data="dataSongs"
                :columns="columns"
              />
            </q-tab-panel>

            <q-tab-panel name="equipments">
              <Table
                :title="tab.toUpperCase()"
                :data="dataEquipments"
                :columns="columns"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>

        <q-page-sticky position="bottom-right" :offset="[28, 26]">
          <q-btn
            rounded
            color="primary"
            :label="tab"
            icon="add"
            @click="showDialog()"
          />
        </q-page-sticky>
        <AddInstrumentDialog :payload="payload" />
        <AddDanceDialog />
        <AddPictureDialog />
        <AddSongDialog />
        <AddEquipmentDialog />
      </q-page>
    </q-scroll-area>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import AddDanceDialog from 'src/components/AddDanceDialog.vue';
import AddInstrumentDialog from 'src/components/AddInstrumentDialog.vue';
import AddPictureDialog from 'src/components/AddPictureDialog.vue';
import AddSongDialog from 'src/components/AddSongDialog.vue';
import AddEquipmentDialog from 'src/components/AddEquipmentDialog.vue';
import Table from 'src/components/Table.vue';
import {
  DanceDto,
  InstrumentDto,
  PictureDto,
  SongDto,
  EquipmentDto
} from 'src/services/rest-api';

@Component({
  components: {
    AddDanceDialog,
    AddInstrumentDialog,
    AddPictureDialog,
    AddSongDialog,
    AddEquipmentDialog,
    Table
  },
  computed: {
    ...mapState('dance', ['dances']),
    ...mapState('instrument', ['instruments']),
    ...mapState('picture', ['pictures']),
    ...mapState('song', ['songs']),
    ...mapState('equipment', ['equipments'])
  },
  methods: {
    ...mapActions('dance', ['getAllDances']),
    ...mapActions('instrument', ['getAllInstruments']),
    ...mapActions('picture', ['getAllPictures']),
    ...mapActions('song', ['getAllSongs']),
    ...mapActions('equipment', ['getAllEquipments']),
    ...mapActions('uiNav', ['addDancePopups']),
    ...mapActions('uiNav', ['addInstrumentPopups']),
    ...mapActions('uiNav', ['addPicturePopups']),
    ...mapActions('uiNav', ['addSongPopups']),
    ...mapActions('uiNav', ['addEquipmentPopups'])
  }
})
export default class Homeadmin extends Vue {
  dances!: DanceDto[];
  instruments!: InstrumentDto[];
  pictures!: PictureDto[];
  songs!: SongDto[];
  equipments!: EquipmentDto[];
  getAllDances!: () => Promise<void>;
  getAllInstruments!: () => Promise<void>;
  getAllPictures!: () => Promise<void>;
  getAllSongs!: () => Promise<void>;
  getAllEquipments!: () => Promise<void>;
  addDancePopups!: (show: boolean) => void;
  addInstrumentPopups!: (show: boolean) => void;
  addPicturePopups!: (show: boolean) => void;
  addSongPopups!: (show: boolean) => void;
  addEquipmentPopups!: (show: boolean) => void;
  tab = 'dance';
  loading = false;
  payload = {};
  // dances
  columns = [
    {
      name: 'name',
      align: 'center',
      label: 'Name',
      field: 'name',
      sortable: true
    },
    {
      name: 'description',
      align: 'center',
      label: 'Description',
      field: 'description',
      sortable: true
    }
  ];
  data = [
    {
      id: '1',
      name: 'Malong-Malong',
      description: 'Description',
      url: 'Url here'
    },
    {
      id: '2',
      name: 'Sagayan',
      description: 'Description',
      url: 'Url here'
    },
    {
      id: '3',
      name: 'Kapag-apir',
      description: 'Description',
      url: 'Url here'
    },
    {
      id: '4',
      name: 'Kapag-apir',
      description: 'Description',
      url: 'Url here'
    },
    {
      id: '5',
      name: 'Kapag-apir',
      description: 'Description',
      url: 'Url here'
    }
  ];

  dataDances: DanceDto[] = [];
  dataInstruments: InstrumentDto[] = [];
  dataPictures: PictureDto[] = [];
  dataSongs: SongDto[] = [];
  dataEquipments: EquipmentDto[] = [];

  async created() {
    await this.getAllDances();
    this.dataDances = this.dances;
    await this.getAllInstruments();
    this.dataInstruments = this.instruments;
    await this.getAllPictures();
    this.dataPictures = this.pictures;
    await this.getAllEquipments();
    this.dataEquipments = this.equipments;
    await this.getAllSongs();
    this.dataSongs = this.songs;
  }

  view(payload: any) {
    this.payload = payload;
  }
}
</script>
