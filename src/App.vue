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
    const res = await danceService.getAbout();
    console.log(res);
    AOS.init();
  }
}
</script>
