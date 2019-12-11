<template>
  <div>
    <Header />
    <div class="home">
      <h1>Garanta seu corte sem sair de casa</h1>
    </div>
  </div>
</template>

<script>
import * as Cookies from 'js-cookie';
export default {
  name: 'home',
  components: {
    Header: () => import('@/views/Header/HeaderBar.vue'),
    Login: () => import('@/views/User/HandleUser.vue'),
  },
};
</script>

<style lang="scss">
.home {
  height: calc(100vh - 71px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
