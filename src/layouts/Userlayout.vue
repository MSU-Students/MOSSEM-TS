<template>
  <q-layout view="hHh lpR fff">
    <transition appear enter-active-class="animated fadeInDown">
      <q-header
        v-if="$route.name != 'login-page'"
        class="backdrop-filter text-white"
      >
        <div :class="$q.screen.lt.md ? '' : 'row'">
          <div
            :class="
              $q.screen.lt.md
                ? 'col text-center text-h4 text-white text-weight-bolder q-pl-md q-pt-md'
                : 'col text-left text-h4 text-white text-weight-bolder q-pl-md q-pt-lg'
            "
          >
            <q-icon size="xl">
              <img src="~assets/logo/splogo.png" />
              <q-tooltip
                anchor="bottom middle"
                self="top middle"
                transition-show="rotate"
                transition-hide="rotate"
                :offset="[10, 10]"
              >
                <strong>Assalamualaikum</strong>
              </q-tooltip>
            </q-icon>
            MOSSEM
          </div>
          <div
            :class="
              $q.screen.lt.md ? 'col q-pl-md q-pt-md' : 'col q-pl-md q-pt-lg'
            "
          >
            <q-toolbar>
              <q-toolbar-title> </q-toolbar-title>
              <q-btn
                icon="dashboard"
                outline
                class="glow-on-hover"
                dense
                style="font-size: 1.2em"
                color="orange"
                label="Sining Pananadem"
                text-color="white"
                to="Dances"
              >
              <q-tooltip
                anchor="bottom middle"
                self="top middle"
                :offset="[10, 10]"
              >
                <strong>Bolos ka ko Repository o Sining Pananadem!</strong>
              </q-tooltip>
              </q-btn>

              <q-btn
                style="font-size: 1.2em"
                icon="person"
                flat
                class="radius"
                label="Login"
                text-color="white"
                to="login"
              >
              <q-tooltip
                anchor="bottom middle"
                self="top middle"
                :offset="[10, 10]"
              >
                <strong>Only For Admin!</strong>
              </q-tooltip>
              </q-btn>
            </q-toolbar>
          </div>
        </div>
      </q-header>
    </transition>

    <q-footer v-if="$route.name != 'login-page'" class="backdrop-filter">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/logo/splogo.png" />
          </q-avatar>
          Home
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container class="user-layout">
      <transition appear leave-active-class="animated fadeOut">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class UserLayout extends Vue {}
</script>

<style scoped>
.backdrop-filter {
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  background-color: #fe7a1500;
}
.body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0);
}

.glow-on-hover {
    width: 220px;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 50px;
}

.glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #FE7A15, #ff7300, #FE7A15, #ffffff41, #FE7A15, #FE7A15, #ffffff46, #fafafa50, #FE7A15);
    position: absolute;
    top: -2px;
    left:-2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 50px;
}

.glow-on-hover:active {
    color: rgb(255, 247, 247)
}

.glow-on-hover:active:after {
    background: transparent;
}

.glow-on-hover:hover:before {
    opacity: 1;
}

.glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.13);
    left: 0;
    top: 0;
    border-radius: 50px;
}

@keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
}
</style>
