<template>
  <q-layout class="bg-img" view="hHh LpR fFf">
    <transition appear enter-active-class="animated fadeInDown">
      <q-header elevated class="admin-bg">
        <q-toolbar>
          <q-toolbar-title>Admin Page</q-toolbar-title>
          <q-btn
            v-if="$route.name == 'Homeadmin-page'"
            outline
            rounded
            icon="person"
            label="Account"
            text-color="white"
          >
            <q-menu fit :offset="[0, 10]">
              <q-btn
                icon ="logout"
                class="full-width"
                label="logout"
                color="primary"
                text-color="white"
                @click="logout()"
              >
              </q-btn>
            </q-menu>
          </q-btn>
          <q-btn
            v-if="$route.path != '/admin'"
            flat
            class="radius"
            icon="home"
            label="Home"
            color="orange"
            text-color="white"
            to="/"
          >
          </q-btn>
        </q-toolbar>
      </q-header>
    </transition>

    <q-page-container>
      <router-view> </router-view>
      <transition appear enter-active-class="animated fadeInUp">
      <q-page-sticky position="bottom-left" :offset="[18, 18]">
        <q-btn
        rounded
          color="primary"
          @click="$q.fullscreen.toggle()"
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          :label="$q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'"
        />
      </q-page-sticky>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import authService from 'src/services/auth.service';
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class extends Vue {
  async logout() {
    await authService.logoutUser();
    await this.$router.replace('/');
    setTimeout(
    this.$q.notify({
        type: 'positive',
        message: 'Logout Successfully!'
      }), 1000)
  }
}
</script>

<style scoped>
.admin-bg {
   background-color: rgb(104 19 2 / 40%);
  backdrop-filter: blur(3px);
}
.bg-img {
  background-image: url('~assets/background/BackGroundBlur.jpg');
  padding: 0px;
}
</style>
