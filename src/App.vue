<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { danceService } from 'src/services/dance.service';
import AOS from 'aos';

import 'aos/dist/aos.css';

@Component
export default class App extends Vue {
  async created() {
    AOS.init();
    await danceService.getAbout();
  }
}
</script>
