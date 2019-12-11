<template>
  <div class="header">
    <div>
      <h2 @click.prevent="$router.push({ path: '/' })">Barbearia</h2>
    </div>
    <component :is="componentId"></component>
  </div>
</template>
<script>
import * as Cookie from 'js-cookie';
import { mapActions } from 'vuex';
export default {
  name: 'header-bar',
  components: {
    Logged: () => import('@/components/Header/Logged/Logged.vue'),
    NotLogged: () => import('@/components/Header/NotLogged/NotLogged.vue'),
  },
  data: () => ({
    buttonLogin: true,
    log: false,
  }),
  created() {
    const auth = Cookie.get('@Auth:user');
    switch (auth) {
      case 'true':
        this.componentId = 'Logged';
        break;
      default:
        this.componentId = 'NotLogged';
        break;
    }
  },
  computed: {
    user() {
      return this.$store.state.user.userStore.name;
    },
  },
  methods: {
    ...mapActions({
      destroySession: 'user/destroy',
    }),
    destroy() {
      this.destroySession({
        data: {},
        callback: () => {
          this.$router.go({
            path: '/',
          });
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

button {
  @include button;
}

.header {
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 4px #c4c4c4;
  height: 70px;
  align-items: center;
  padding: 0 40px;

  h2 {
    cursor: pointer;
  }
}
</style>
