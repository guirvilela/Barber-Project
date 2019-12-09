<template>
  <div class="header">
    <div>
      <h2>Barbearia</h2>
    </div>
    <div>
      <button @click.prevent="$router.push({ path: '/fazer-login' })">
        Fazer Login
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'header',

  methods: {
    routerLogin() {},
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
  height: 70px;
  align-items: center;
  padding: 0 40px;
}
</style>
