<template>
  <q-page class="flex flex-center bg-img q-px-md">
    <q-card
      class="shadow-24 text-white flex flex-center Glassmorphismlogin"
      style="background: linear-gradient(to top right, #fe7a15 55%, #d9d9d9 110%)"
      :class="$q.screen.lt.md ? '' : 'row'"
      :style="$q.screen.lt.md ? '' : 'width: 800px;'"
    >
      <transition appear enter-active-class="animated fadeInRight">
        <q-img
          v-if="!$q.screen.lt.md"
          src="~assets/background/splogincover.jpg"
          class="col-6 login-photo"
        />
      </transition>

      <div
        class="q-px-xl"
        :class="$q.screen.lt.md ? ' q-pa-xl' : 'login-field'"
      >
        <transition appear enter-active-class="animated fadeInUp">
          <q-img
            style="max-width: 400px; height: 170px"
            src="~assets/logo/splogo1.png"
          />
        </transition>
        <div class="text-center text-h3">Login</div>

        <q-card-section class="q-gutter-y-md">
          <q-input
            v-model="username"
            label="Username"
            bg-color="white"
            color="red"
            rounded
            standout="bg-primary text-white"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            label="Password"
            bg-color="white"
            color="red"
            :type="hidePassword ? '' : 'password'"
            rounded
            standout="bg-primary text-white"
            @keypress.enter="login()"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>

            <template v-slot:append>
              <q-icon
                :name="hidePassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="hidePassword = !hidePassword"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions>
          <q-btn
            rounded
            icon="login"
            class="full-width"
            label="login"
            color="white"
            text-color="primary"
            :loading="loading"
            :disable="loading"
            @click="login()"
          >
          </q-btn>
        </q-card-actions>
      </div>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import authService from 'src/services/auth.service';
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class Login extends Vue {
  username = '';
  password = '';
  loading = false;

  hidePassword = false;

  async login() {
    //
    try {
      this.loading = true;
      await authService.loginUser(this.username, this.password);
      await this.$router.replace('/admin');
      this.$q.notify({
        type: 'positive',
        message: 'Login Successfully!',
        timeout: 2000
      });
      this.loading = false;
    } catch (error) {
      this.$q.notify({
        type: 'negative',
        message: 'Invalid Username or Password!',
        timeout: 2000
      });
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.login-photo {
  height: 100%;
  width: 50%;
}
.login-field {
  height: 100%;
  width: 50%;
}
.bg-img {
  background-image: url('~assets/background/loginbackground.jpg');
  height: 100%;
  width: 100%;
}

.Glassmorphismlogin {
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  background-image: linear-gradient(
    155deg,
    rgba(255, 255, 255, 0.36) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border-bottom: 1.8px solid rgba(255, 255, 255, 0.79);
  border-right: 1.8px solid rgba(255, 255, 255, 0.79);
}
</style>
