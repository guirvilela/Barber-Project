<template>
  <div class="list-actions">
    <ul>
      <li>
        <button @click.prevent="isbarber()">{{ user }}</button>
      </li>
      <li>
        <button @click.prevent="destroy()">Sair</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import * as Cookies from 'js-cookie';

export default {
  name: '',
  computed: {
    user() {
      return this.$store.state.user.userStore.name.replace(/ .*/, '');
    },
    Barber() {
      return this.$store.state.user.userStore.barber;
    },
  },
  methods: {
    ...mapActions({
      destroySession: 'user/destroy',
    }),
    ...mapMutations({
      setPlan: 'dashboard/SET_PLAN',
    }),
    destroy() {
      this.destroySession({
        data: {},
        callback: () => {
          this.$router.push({
            path: '/',
          });
        },
      });
    },

    isbarber() {
      if (this.Barber == true) {
        this.$router.push({
          path: '/criar-barbearia',
        });
      } else {
        this.$router.push({
          path: '/perfil-cliente/dados-pessoais',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.list-actions ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  @include button;
}
li {
  list-style-type: none;
}
li:first-child {
  margin-right: 20px;
}
</style>
