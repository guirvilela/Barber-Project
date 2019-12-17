<template>
  <div>
    <Header />

    <div class="hour">
      <div class="btns">
        <button @click.prevent="$router.push({ path: '/cadastrar-barbearia' })">
          Desejo Cadastrar minha barbearia
        </button>
        <button @click.prevent="$router.push({ path: '/perfil-barbearia' })" v>
          Meu Perfil
        </button>
        <div class="btns">
          <button
            v-if="barberStatus == 1"
            @click.prevent="$router.push({ path: '/lista-barbeiros' })"
          >
            Visualizar Horários
          </button>
          <button
            v-if="barberStatus == 0"
            @click.prevent="$router.push({ path: '/lista-barbeiros' })"
          >
            Quero Reservar um horário
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '@/services/api.js';
import CurrentToken from '@/services/CurrentToken.js';
export default {
  name: 'before-create',
  components: {
    Header: () => import('@/views/Header/HeaderBar.vue'),
  },
  data: () => ({
    status: false,
  }),
  computed: {
    barber() {
      return this.$store.state.user.barber.data;
    },
    barberStatus() {
      return this.$store.state.user.userStore.barber;
    },
  },

  methods: {},
};
</script>
<style lang="scss">
@import '@/assets/scss/index.scss';
.hour {
  height: calc(100vh - 71px);
  display: flex;
  justify-content: center;
  align-self: center;
  .btns {
    display: flex;
    justify-content: center;
    flex-direction: column;
    button {
      margin: 30px 0;
      @include button;
      height: 50px;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
