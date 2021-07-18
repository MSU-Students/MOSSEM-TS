<template>
  <q-layout class="bg-img" view="hHh LpR fFf">
    <transition appear enter-active-class="animated fadeInDown">
      <q-header elevated class="bg-transparent">
        <q-toolbar>
          <q-toolbar-title>Admin Page</q-toolbar-title>
          <q-btn
            v-if="$route.name == 'Homeadmin-page'"
            outline
            icon="person"
            label="Account"
            text-color="white"
          >
            <q-menu fit :offset="[0, 10]">
              <q-btn
                class="full-width"
                label="logout"
                color="primary"
                text-color="white"
                to="/login"
              >
              </q-btn>
            </q-menu>
          </q-btn>
          <q-btn
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
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class extends Vue {}
</script>

<style scoped>
.bg-img {
  background-image: url('~assets/background/BackGroundBlur.jpg');
  padding: 0px;
}
</style>
