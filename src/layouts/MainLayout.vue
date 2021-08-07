<template>
  <q-layout class="bg-img" view="hHh LpR fFf">
    <!-- header -->
    <transition appear enter-active-class="animated fadeInDown">
      <q-header elevated class="header-bg">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />

          <!-- Title -->
          <q-avatar size="42px">
            <img src="~assets/logo/splogo.png" />
          </q-avatar>

          <q-toolbar-title>Sining Pananadem</q-toolbar-title>
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="text = ''"
            />
          </template>

          <!-- Menu -->
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
                @click="logout()"
              >
              </q-btn>
            </q-menu>
          </q-btn>
          <q-btn
            outline
            class="radius"
            icon="home"
            label="Home"
            color="orange"
            text-color="white"
            to="/"
          >
          </q-btn>
          <!-- menu end -->
        </q-toolbar>
      </q-header>
    </transition>

    <q-drawer
      v-model="drawer"
      show-if-above
      :height="100"
      :width="250"
      :breakpoint="500"
      elevated
      overlay
    >
      <q-scroll-area class="fullscreen text-white" content-style="">
        <transition appear enter-active-class="animated fadeIn">
          <div>
            <q-list padding>
              <div>
                <q-item class="my-menu-link-title">
                  <q-item-section class="text-h5 text-bold text-shadow-title">
                    Intangible Inventory
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-separator />
                <q-item
                  dense
                  to="Dances"
                  clickable
                  v-ripple
                  @click="link = 'Dances'"
                  active-class="my-menu-link"
                >
                  <q-item-section avatar>
                    <q-img
                      style="height: 48px; width: 38px"
                      src="~assets/logo/icon.png"
                    />
                  </q-item-section>

                  <q-item-section class="text-h6"> Dances </q-item-section>
                </q-item>

                <q-separator />

                <q-item
                  to="Songs"
                  clickable
                  v-ripple
                  @click="link = 'Songs'"
                  active-class="my-menu-link"
                >
                  <q-item-section avatar>
                    <q-img
                      style="height: 48px; width: 38px"
                      src="~assets/logo/icon.png"
                    />
                  </q-item-section>

                  <q-item-section class="text-h6"> Songs </q-item-section>
                </q-item>

                <q-separator />
              </div>
              <q-separator />
              <q-separator />
              <div>
                <q-item class="my-menu-link-title">
                  <q-item-section class="text-h5 text-bold text-shadow-title">
                    Tangible Inventory
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-separator />
                <q-item
                  to="Equipments"
                  clickable
                  v-ripple
                  @click="link = 'Equipments'"
                  active-class="my-menu-link"
                >
                  <q-item-section avatar>
                    <q-img
                      style="height: 48px; width: 38px"
                      src="~assets/logo/icon.png"
                    />
                  </q-item-section>

                  <q-item-section class="text-h6"> Equipments </q-item-section>
                </q-item>
                <q-item
                  to="Instruments"
                  clickable
                  v-ripple
                  @click="link = 'Instruments'"
                  active-class="my-menu-link"
                >
                  <q-item-section avatar>
                    <q-img
                      style="height: 48px; width: 38px"
                      src="~assets/logo/icon.png"
                    />
                  </q-item-section>

                  <q-item-section class="text-h6"> Instruments </q-item-section>
                </q-item>
                <q-item class="my-menu-link-title">
                  <q-item-section class="text-h5 text-bold text-shadow-title"
                    >Performances</q-item-section
                  >
                </q-item>
                <q-separator />
                <q-separator />
                <q-item
                  to="Pictures"
                  clickable
                  v-ripple
                  @click="link = 'Pictures'"
                  active-class="my-menu-link"
                >
                  <q-item-section avatar>
                    <q-img
                      style="height: 48px; width: 38px"
                      src="~assets/logo/icon.png"
                    />
                  </q-item-section>

                  <q-item-section class="text-h6"> Gallery </q-item-section>
                </q-item>
              </div>
              <q-separator />
            </q-list>
          </div>
        </transition>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="custom-page-container">
      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <component :is="Component" />
        </transition>
      </router-view>
      <transition appear enter-active-class="animated fadeIn">
        <q-page-sticky position="bottom-left" :offset="[18, 18]">
          <q-btn
            color="primary"
            rounded
            @click="$q.fullscreen.toggle()"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            :label="
              $q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'
            "
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
export default class MainLayout extends Vue {
  drawer = false;
  miniState = true;
  link = '';
  text = '';

  async logout() {
    await authService.logoutUser();
  }
}
</script>

<style scoped>
.my-menu-link {
  background: linear-gradient(
    90deg,
    rgba(104, 19, 2, 0.13) 0%,
    rgba(104, 19, 2, 0) 44%,
    rgba(255, 255, 255, 0.3039454770891854) 100%
  );
}
.my-menu-link-title {
  background: linear-gradient(to top, #e4830433 1%, #e483042f 64%);
}
.bg-img {
  background-image: url('~assets/background/BackGroundBlur.jpg');
  padding: 0px;
}
.bg-img1 {
  background-image: url('~assets/background/BackGroundBlur.jpg');
  padding: 0px;
  box-shadow: 0 0 0 1000px rgb(0 0 0 / 25%) inset;
}
.header-bg {
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.082),
      rgba(7, 7, 7, 0.73)
    ),
    url('~assets/background/TribalPattern.jpg');
  background-position: center;
  box-shadow: 0 0 0 1000px rgb(0 0 0 / 45%) inset;
}
.drawer-bg {
  background-image: linear-gradient(
    to right,
    rgba(245, 246, 252, 0.267),
    rgba(0, 0, 0, 0.459)
  );
  background-position-y: center;
  box-shadow: 0 0 0 1000px rgb(0 0 0 / 45%) inset;
}
.text-shadow-title {
  text-shadow: 2px 2px 6px #000000;
}
.q-drawer-container > :nth-child(1) {
  background-color: rgb(104 19 2 / 20%);
  backdrop-filter: blur(3px);
}
</style>
