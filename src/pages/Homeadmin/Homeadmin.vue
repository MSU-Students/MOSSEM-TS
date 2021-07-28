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
                :columns="columnsinstrument"
                @view="view"
              />
            </q-tab-panel>

            <q-tab-panel name="pictures">
              <Table
                :title="tab.toUpperCase()"
                :data="dataPictures"
                :columns="columns"
                @view="view"
              />
            </q-tab-panel>

            <q-tab-panel name="songs">
              <Table
                :title="tab.toUpperCase()"
                :data="dataSongs"
                :columns="columnssong"
                @view="view"
              />
            </q-tab-panel>

            <q-tab-panel name="equipments">
              <Table
                :title="tab.toUpperCase()"
                :data="dataEquipments"
                :columns="columnsequipment"
                @view="view"
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
        <AddInstrumentDialog :payload="payload" @clearData="clearData" />
        <AddDanceDialog :payload="payload" @clearData="clearData" />
        <AddPictureDialog :payload="payload" @clearData="clearData" />
        <AddEquipmentDialog :payload="payload" @clearData="clearData" />
        <AddSongDialog :payload="payload" @clearData="clearData" />
      </q-page>
    </q-scroll-area>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
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
  columnsinstrument = [
    {
      name: 'dateaquired',
      align: 'center',
      label: 'Date aquired',
      field: 'dateaquired',
      sortable: true
    },
    {
      name: 'name',
      align: 'center',
      label: 'Name',
      field: 'name',
      sortable: true
    },
    {
      name: 'status',
      align: 'center',
      label: 'Status',
      field: 'status',
      sortable: true
    },
    {
      name: 'quantity',
      align: 'center',
      label: 'Quantity',
      field: 'quantity',
      sortable: true
    }
  ];
  columnssong = [
    {
      name: 'songwriter',
      align: 'center',
      label: 'Song writer',
      field: 'songwriter',
      sortable: true
    },
    {
      name: 'name',
      align: 'center',
      label: 'Name',
      field: 'name',
      sortable: true
    },
    {
      name: 'performedplaces',
      align: 'center',
      label: 'Performed places',
      field: 'performedplaces',
      sortable: true
    },
    {
      name: 'datecreated',
      align: 'center',
      label: 'Date created',
      field: 'datecreated',
      sortable: true
    }
  ];
  columnsequipment = [
    {
      name: 'dateaquired',
      align: 'center',
      label: 'Date aquired',
      field: 'dateaquired',
      sortable: true
    },
    {
      name: 'name',
      align: 'center',
      label: 'Name',
      field: 'name',
      sortable: true
    },
    {
      name: 'status',
      align: 'center',
      label: 'Status',
      field: 'status',
      sortable: true
    },
    {
      name: 'quantity',
      align: 'center',
      label: 'Quantity',
      field: 'quantity',
      sortable: true
    }
  ];
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
  dataDances: DanceDto[] = [];
  dataInstruments: InstrumentDto[] = [];
  dataPictures: PictureDto[] = [];
  dataSongs: SongDto[] = [];
  dataEquipments: EquipmentDto[] = [];

  @Watch('dances')
  onDancesChanged(val: any) {
    this.dataDances = val;
  }
  @Watch('instruments')
  onInstrumentsChanged(val: any) {
    this.dataInstruments = val;
  }
  @Watch('pictures')
  onPicturesChanged(val: any) {
    this.dataPictures = val;
  }
  @Watch('equipments')
  onEquipmentsChanged(val: any) {
    this.dataEquipments = val;
  }
  @Watch('songs')
  onSongsChanged(val: any) {
    this.dataSongs = val;
  }

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
    console.log(this.dataSongs);
  }

  async showDialog() {
    if (this.tab.toLowerCase() == 'dance') {
      this.addDancePopups(true);
    } else if (this.tab.toLowerCase() == 'instruments') {
      this.addInstrumentPopups(true);
    } else if (this.tab.toLowerCase() == 'pictures') {
      this.addPicturePopups(true);
    } else if (this.tab.toLowerCase() == 'equipments') {
      this.addEquipmentPopups(true);
    } else {
      this.addSongPopups(true);
    }
  }

  clearData(val: any) {
    this.payload = val;
  }

  view(payload: any) {
    console.log(payload);
    this.payload = payload;
  }
}
</script>
