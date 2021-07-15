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
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%" style="height: 300px">
          <div class="q-pa-md">
            <q-video
              v-if="title.toLowerCase() == 'dance'"
              class="absolute-full"
              :src="convertUrl(props.row.url)"
            />
            <div v-else class="row">
              <div class="col-8">
                <q-img
                  :src="props.row.url"
                  basic
                  style="border: 1px solid black"
                ></q-img>
              </div>
              <div class="col text-center">
                {{ props.row.description }}
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

@Component({})
export default class List extends Vue {
  @Prop({ type: Boolean, required: true }) readonly loading!: boolean;
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: Array, required: true }) readonly data!: any[];
  @Prop({ type: Array, required: true }) readonly columns!: any[];

  search = '';

  convertUrl(url: string) {
    return helperService.convertUrl(url);
  }
}
</script>

<style></style>
