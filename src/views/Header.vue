<template>
  <div class="header">
    <div>
      <h2 @click.prevent="$router.push({ path: '/' })">Barbearia</h2>
    </div>
    <div>
      <button
        @click.prevent="$router.push({ path: '/fazer-login' })"
        v-if="buttonLogin"
      >
        Fazer Login
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'header',
  data: () => ({
    buttonLogin: true,
  }),
  created() {
    if (this.$router.history.current.name == 'login') {
      this.buttonLogin = false;
    }
  },
  methods: {},
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
