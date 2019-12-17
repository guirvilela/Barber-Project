<template>
  <div class="list-actions">
    <button
      @click.prevent="$router.push({ path: '/fazer-login' })"
      v-if="$route.name != 'login'"
    >
      Fazer Login
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    redirect() {
      this.$router.push({
        name: '/',
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/index.scss';
.list-actions {
  button {
    @include button;
  }
}
</style>
