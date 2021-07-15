<template>
  <q-dialog v-model="ShowSongDialog" transition-show="scale" persistent>
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-img
          style="width: 70px"
          :ratio="1"
          class="rounded-borders"
          src="~assets/logo/splogo1.png"
        />
        <q-toolbar-title class="text-weight-bold text-primary "
          >ADD NEW SONG</q-toolbar-title
        >
        <q-btn
          color="primary"
          icon="close"
          size="md"
          @click="addSongPopups(false)"
        ></q-btn>
      </q-toolbar>
      <div class="q-pl-sm q-pr-sm">
        <q-input
          v-model="song.name"
          ref="song name"
          filled
          label="Song Name"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
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
          @update:model-value="fileChoose($event)"
        >
          <template v-slot:append>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
      <div class="q-pl-sm q-pr-sm" style="max-width: 1000px">
        <q-input
          v-model="song.description"
          filled
          type="Description"
          label="Song Description"
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
            @click="addSong()"
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
import { SongDto } from 'src/services/rest-api';

@Component({
  computed: {
    ...mapState('uiNav', ['ShowSongDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['addSongPopups']),
    ...mapActions('song', ['createSong'])
  }
})
export default class AddInstrumentDialog extends Vue {
  ShowSongDialog!: boolean;
  shouldShow = false;
  addSongPopups!: (show: boolean) => void;
  createSong!: (payload: SongDto) => Promise<void>;

  song: SongDto = {
    id: '',
    url: '',
    name: '',
    description: ''
  };

  file: any = [];

  fileChoose(val: any) {
    this.file = val;
  }

  async addSong() {
    const resUrl: string = await uploadService.uploadFile(
      this.file,
      'song'
    );
    console.log('resUrl: ', resUrl);
    console.log({ ...this.song, url: resUrl });
    const response = await this.createSong({
      ...this.song,
      url: resUrl
    });
    console.log('response: ', response);
    this.addSongPopups(false);
  }
}
</script>

<style scoped>
.__card {
  max-width: 100%;
  width: 500px;
}
</style>
