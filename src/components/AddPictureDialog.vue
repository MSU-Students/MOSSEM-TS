<template>
  <q-dialog
    v-model="ShowPictureDialog"
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
          ><span v-if="data.isUpdating">UPDATE PICTURE</span>
          <span v-else>ADD PICTURE</span></q-toolbar-title
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
          v-model="picture.name"
          ref="picture name"
          filled
          label="Picture Name"
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
          v-model="picture.description"
          filled
          type="Description"
          label="Picture Description"
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
            @click="data.isUpdating ? editPicture() : addPicture()"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { PictureDto } from 'src/services/rest-api';
import { FileTypes, IUploadFile } from 'src/store/upload-module/state';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapActions } from 'vuex';

@Component({
  computed: {
  },
  methods: {
    ...mapActions('uiNav', ['addPicturePopups']),
    ...mapActions('picture', [
      'createPicture',
      'updatePicture',
      'getAllPictures'
    ]),
    ...mapActions('uploads', ['uploadFile'])
  }
})
export default class AddPictureDialog extends Vue {
  @Prop({ type: Object, default: {} }) readonly data!: { payload: PictureDto, isUpdating: boolean};

  get ShowPictureDialog(): boolean {
    return /^\/admin\/pictures\/(edit|new)$/.exec(this.$route.path) != null;
  }
  shouldShow = false;
  uploadFile!:(payload:{file: File, type: FileTypes, title: string}) => Promise<IUploadFile>;
  addPicturePopups!: (show: boolean) => void;
  createPicture!: (payload: PictureDto) => Promise<void>;
  updatePicture!: (payload: PictureDto) => Promise<void>;
  getAllPictures!: () => Promise<void>;

  checkerror = false;
  picture: PictureDto = {
    id: '',
    url: '',
    name: '',
    description: ''
  };
  file: File = new File([], 'Select File');

  fileChoose(val: File) {
    this.file = val;
  }

  showDialog() {
    this.picture = { ...this.data.payload };
  }

  hideDialog() {
    this.$emit('clearData', this.picture);
  }

  async addPicture() {
    if (
      (this.picture.name == '' && this.picture.description == '') ||
      this.picture.name == '' ||
      this.picture.description == ''
    ) {
      this.checkerror = true;
    } else {
      const res = await this.uploadFile({
        file: this.file, 
        type: 'image',
        title: this.picture.name
      });
      const resUrl = res.url;
      try {
        if (typeof resUrl == 'string') {
          await this.createPicture({
            ...this.picture,
            url: resUrl
          });
          this.$q.notify({
            type: 'positive',
            message: 'Upload Success!'
          });
          this.resetForm();
        } else {
          throw 'No image uploaded';
        }
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Something wrong!'
        });
      }
      finally {
        await this.$router.replace('/admin/pictures');
      }
    }
  }

  private resetForm() {
    this.picture= {
      id: '',
      url: '',
      name: '',
      description: ''
    };
    this.file=new File([], 'Select File');
  }

  async editPicture() {
    try {
      if (this.file.size > 0) {
        const res = await this.uploadFile({
          file: this.file,
          type: 'image',
          title: this.picture.name
        });
        this.picture.url = res.url;
      } 
      await this.updatePicture({
        ...this.picture
      });
      this.$q.notify({
        type: 'positive',
        message: 'Edited Successfully!'
      });
      this.resetForm();
      await this.getAllPictures();
      this.addPicturePopups(false);
    } catch (error) {
      this.$q.notify({
        type: 'negative',
        message: 'Something wrong!',
        caption: error.message || error
      });
    }
  }

  async closeDialog() {
    this.checkerror = false;
    this.resetForm();
    await this.$router.replace('/admin/gallery')
  }
}
</script>

<style scoped>
.__card {
  max-width: 100%;
  width: 500px;
}
</style>
