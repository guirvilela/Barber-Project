<template>
  <div>
    <Header />
    <div class="home">
      <h1>Garanta seu corte sem sair de casa</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    Header: () => import('@/views/Header.vue'),
    Login: () => import('@/components/HandleUser/UserLogin/Login.vue'),
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
