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
                to="/login"
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

    <q-footer v-if="$route.name != 'login-page'" class="bg-primary q-pb-md">
      <q-toolbar>
        <q-toolbar-title>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <div class="social_links">
            <a href="https://www.instagram.com/developer_sah/" target="_blank">
              <span class="fa-stack fa-lg ig combo">
                <i class="fa fa-circle fa-stack-2x circle"></i>
                <i class="fa fa-instagram fa-stack-1x fa-inverse icon"></i>
              </span>
            </a>
            <a
              href="https://www.facebook.com/SPCulturalDanceTroupe"
              target="_blank"
            >
              <span class="fa-stack fa-lg fb combo">
                <i class="fa fa-circle fa-stack-2x circle"></i>
                <i class="fa fa-facebook fa-stack-1x fa-inverse icon"></i>
              </span>
            </a>
            <a href="#" target="_blank">
              <span class="fa-stack fa-lg yt combo">
                <i class="fa fa-circle fa-stack-2x circle"></i>
                <i class="fa fa-youtube-play fa-stack-1x fa-inverse icon"></i>
              </span>
            </a>
            <a href="https://twitter.com/developer_sah" target="_blank">
              <span class="fa-stack fa-lg tw combo">
                <i class="fa fa-circle fa-stack-2x circle"></i>
                <i class="fa fa-twitter fa-stack-1x fa-inverse icon"></i>
              </span>
            </a>
          </div>
        </q-toolbar-title>
      </q-toolbar>
      <div class="q-pt-md text-center">Developed By: Abdul Matin Moreno Maruhom</div>
      <div class="q-pt-sm text-center text-h6 text-bold">Special Thanks To: ITSMarawi Family <q-icon name="favorite" /> </div>
    </q-footer>

    <q-page-container class="user-layout">
      <transition appear leave-active-class="animated fadeOut">
        <router-view />
      </transition>
      <transition appear enter-active-class="animated fadeInUp">
        <q-page-sticky position="bottom-left" :offset="[18, 18]">
          <q-btn
            rounded
            color="primary"
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
  background: linear-gradient(
    45deg,
    #fe7a15,
    #ff7300,
    #fe7a15,
    #ffffff41,
    #fe7a15,
    #fe7a15,
    #ffffff46,
    #fafafa50,
    #fe7a15
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 50px;
}

.glow-on-hover:active {
  color: rgb(255, 247, 247);
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
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
body {
  height: 100vh;
  width: 100%;
  background: #171717;
  display: flex;
  align-items: center;
  border-radius: 20px;
  justify-content: center;
  flex-direction: column;
}
h1 {
  color: white;
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 0rem;
  letter-spacing: 1px;
  word-spacing: 2px;
  margin-bottom: 0.7rem;
}
p {
  font-size: 0.9rem;
  color: #d8d8d8;
}
.social_links {
  padding: 1rem;
  background: #e9e9e9;
  border-radius: 1rem;
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.social_links .combo {
  transform: scale(0.9);
  transition: 0.4s ease-in;
  margin: 0 0.5rem;
  height: 3em;
  width: 3em;
  line-height: 3em;
}
.combo .circle {
  color: #f9f9f9;
  transition: 0.4s ease-in;
  font-size: 3em;
}
.combo .icon {
  color: #444343;
  font-size: 2rem;
  transform: translateY(1px);
  transition: 0.2s ease-in;
}
.combo:hover {
  transform: scale(1.1);
}
.combo:hover,
.combo:hover .icon {
  color: white;
}
.ig:hover,
.ig:hover .circle {
  color: #e91e63;
}
.fb:hover,
.fb:hover .circle {
  color: #2196f3;
}
.yt:hover,
.yt:hover .circle {
  color: #f44336;
}
.tw:hover,
.tw:hover .circle {
  color: #2196f3;
}
.gt:hover,
.gt:hover .circle {
  color: #1f1f1f;
}
</style>
