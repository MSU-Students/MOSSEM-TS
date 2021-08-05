<template>
  <q-dialog
    v-model="ShowSongDialog"
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
          ><span v-if="data.isUpdating">UPDATE SONG</span>
          <span v-else>ADD SONG</span></q-toolbar-title
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
          v-model="song.name"
          ref="song name"
          filled
          label="Song Name"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <div class="q-pl-sm q-pr-sm">
        <q-input
          v-model="song.songwriter"
          ref="song writer"
          filled
          label="Song Writer"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <div class="q-pl-sm q-pb-lg q-pr-sm">
        <q-input
          v-model="song.performedplaces"
          ref="Performed Places"
          filled
          label="Performed Places"
          lazy-rules
          hint="Ex. Malaysia, USA, Philippines"
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <div class="q-pl-sm q-pb-lg q-pr-sm">
        <q-input
          v-model="song.datecreated"
          ref="datecreated"
          type="date"
          hint="Date Created"
          filled
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
          accept=".mp3"
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
          label="Song Lyrics"
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
            @click="data.isUpdating ? editSong() : addSong()"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import { SongDto } from 'src/services/rest-api';
import { FileTypes, IUploadFile } from 'src/store/upload-module/state';

@Component({
  computed: {
  },
  methods: {
    ...mapActions('song', ['createSong', 'updateSong', 'getAllSongs']),
    ...mapActions('uploads', ['uploadFile'])
  }
})
export default class AddSongDialog extends Vue {
  @Prop({ type: Object, default: {} }) readonly data!: { payload: SongDto, isUpdating: boolean};
  get ShowSongDialog(): boolean {
    return /^\/admin\/songs\/(edit|new)$/.exec(this.$route.path) != null;
  };
  uploadFile!:(payload:{file: File, type: FileTypes, title: string}) => Promise<IUploadFile>;
  createSong!: (payload: SongDto) => Promise<void>;
  updateSong!: (payload: any) => Promise<void>;
  getAllSongs!: () => Promise<void>;

  shouldShow = false;
  checkerror = false;

  song: SongDto = {
    id: '',
    url: '',
    name: '',
    description: '',
    datecreated: '',
    songwriter: '',
    performedplaces: ''
  };

  file: File = new File([], 'Select File');

  fileChoose(val: File) {
    this.file = val;
  }

  showDialog() {
    this.resetForm();
    this.song = { ...this.data.payload };
  }

  hideDialog() {
    this.$emit('clearData', this.song);
  }

  async addSong() {
    try {
      if (
        (this.song.name == '' && this.song.description == '') ||
        this.song.name == '' ||
        this.song.description == ''
      ) {
        this.checkerror = true;
      } else if (this.file.size) {
        const upload = await this.uploadFile({
          file: this.file,
          type: 'audio',
          title: this.song.name
        })
        const resUrl = upload.url; 
        if (typeof resUrl == 'string') {
          await this.createSong({
            ...this.song,
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
      await this.closeDialog();
    }
  }

  private resetForm() {
    this.song={
      id: '',
      url: '',
      name: '',
      description: '',
      datecreated: '',
      songwriter: '',
      performedplaces: ''
    };
    this.file=new File([], 'Select File');
  }

  async editSong() {
    try {
      if (this.file.size) {
        const upload = await this.uploadFile({
          file: this.file,
          type: 'audio',
          title: this.song.name
        })
        this.song.url = upload.url;
      } 
      await this.updateSong(this.song);
      this.$q.notify({
        type: 'positive',
        message: 'Edited Successfully!'
      });
      await this.getAllSongs();
    } catch (error) {
      this.$q.notify({
        type: 'negative',
        message: 'Something wrong!',
        caption: error.message
      });
    } finally {
      await this.closeDialog();
    }
  }

  async closeDialog() {
    this.checkerror = false;
    this.resetForm();
    await this.$router.replace('/admin/songs')
  }
}
</script>

<style scoped>
.__card {
  max-width: 100%;
  width: 500px;
}
</style>
