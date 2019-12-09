<template>
  <div>
    <Header />
    <div class="home">
      <h1>HOME</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    Header: () => import('@/views/Header.vue'),
    Login: () => import('@/components/Home/UserLogin/Login.vue'),
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
