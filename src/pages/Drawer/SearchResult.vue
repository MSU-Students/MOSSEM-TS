<template>
    <div>
        <div v-for="item in result" :key="item.content.id">
            <div v-if="item.category == 'picture'">
                {{item.content.name}}
            </div>
            <div v-else-if="item.category == 'song'">
                {{item.content.url}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PictureDto } from 'src/services/rest-api';
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import { ISearchResult} from 'src/store/search-module/state'

@Component({
  computed: {
    ...mapState('search', ['result'])
  }
})
export default class Picture extends Vue {
    result!: ISearchResult[];
}
</script>

<style scoped>

</style>
