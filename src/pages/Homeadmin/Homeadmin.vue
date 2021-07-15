<template>
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
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="dance">
            <Table
              :title="tab.toUpperCase()"
              :data="dataDances"
              :columns="columns"
            />
          </q-tab-panel>

          <q-tab-panel name="instruments">
            <Table
              :title="tab.toUpperCase()"
              :data="dataInstruments"
              :columns="columns"
            />
          </q-tab-panel>

          <q-tab-panel name="pictures">
            <Table :title="tab.toUpperCase()" :data="dataPictures" :columns="columns" />
          </q-tab-panel>

          <q-tab-panel name="songs">
            <Table :title="tab.toUpperCase()" :data="dataSongs" :columns="columns" />
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
      <AddInstrumentDialog />
      <AddDanceDialog />
      <AddPictureDialog />
      <AddSongDialog />
    </q-page>
  </q-scroll-area>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import AddDanceDialog from 'src/components/AddDanceDialog.vue';
import AddInstrumentDialog from 'src/components/AddInstrumentDialog.vue';
import AddPictureDialog from 'src/components/AddPictureDialog.vue';
import AddSongDialog from 'src/components/AddSongDialog.vue';
import Table from 'src/components/Table.vue';
import { DanceDto, InstrumentDto, PictureDto, SongDto } from 'src/services/rest-api';

@Component({
  components: {
    AddDanceDialog,
    AddInstrumentDialog,
    AddPictureDialog,
    AddSongDialog,
    Table
  },
  computed: {
    ...mapState('dance', ['dances']),
    ...mapState('instrument', ['instruments']),
    ...mapState('picture', ['pictures']),
    ...mapState('song', ['songs'])
  },
  methods: {
    ...mapActions('dance', ['getAllDances']),
    ...mapActions('instrument', ['getAllInstruments']),
    ...mapActions('picture', ['getAllPictures']),
    ...mapActions('song', ['getAllSongs']),
    ...mapActions('uiNav', ['addDancePopups']),
    ...mapActions('uiNav', ['addInstrumentPopups']),
    ...mapActions('uiNav', ['addPicturePopups']),
    ...mapActions('uiNav', ['addSongPopups'])
  }
})
export default class Homeadmin extends Vue {
  dances!: DanceDto[];
  instruments!: InstrumentDto[];
  pictures!: PictureDto[];
  songs!: SongDto[];
  getAllDances!: () => Promise<void>;
  getAllInstruments!: () => Promise<void>;
  getAllPictures!: () => Promise<void>;
  getAllSongs!: () => Promise<void>;
  addDancePopups!: (show: boolean) => void;
  addInstrumentPopups!: (show: boolean) => void;
  addPicturePopups!: (show: boolean) => void;
  addSongPopups!: (show: boolean) => void;
  tab = 'dance';
  loading = false;
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

  async created() {
    await this.getAllDances();
    this.dataDances = this.dances;
    await this.getAllInstruments();
    this.dataInstruments = this.instruments;
    await this.getAllPictures();
    this.dataPictures = this.pictures;
    await this.getAllSongs();
    this.dataSongs = this.songs;
  }

  async showDialog() {
    if (this.tab.toLowerCase() == 'dance') {
      this.addDancePopups(true);
    } else if (this.tab.toLowerCase() == 'instruments') {
      this.addInstrumentPopups(true);
    } else if (this.tab.toLowerCase() == 'pictures') {
      this.addPicturePopups(true);
    } else {
      this.addSongPopups(true);
    }
  }
}
</script>
