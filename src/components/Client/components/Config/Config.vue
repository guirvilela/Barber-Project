<template>
  <div class="config">
    <div class="personal-data">
      <div class="name total">
        <h3>Nome e Email:</h3>
        <router-link to="/perfil-cliente/configuracoes/alterar-nome"
          >Alterar meu nome de usuário ou email</router-link
        >
      </div>
      <div class="email total">
        <h3>Senha:</h3>
        <router-link to="/perfil-cliente/configuracoes/alterar-email"
          >Alterar minha senha</router-link
        >
      </div>
      <div class="date total">
        <h3>Quero excluir minha conta</h3>
        <div>
          <a @click.prevent="openDeleteAcc()">Deletar minha conta</a>
          <div class="delete-account" v-if="deleteAcc">
            <p>Tem certeza que deseja excluir sua conta?</p>
            <div class="btn-delete">
              <button @click.prevent="deleteAcc = false">Cancelar</button>
              <button @click.prevent="deleteAccount()">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from '@/services/api.js';

import CurrentToken from '@/services/CurrentToken.js';
import * as Cookies from 'js-cookie';
import { dateFilter } from 'vue-date-fns';
import { mapActions, mapMutations } from 'vuex';
export default {
  name: 'data-client',

  computed: {
    id() {
      return this.$store.state.user.userStore.id;
    },
  },
  data: () => ({
    deleteAcc: false,
    change: true,
    userName: '',
    userEmail: '',
    createdAt: '',
  }),

  methods: {
    ...mapActions({
      destroySession: 'user/destroy',
    }),
    openDeleteAcc() {
      this.$router.push({ path: '/perfil-cliente/configuracoes' });
      if (this.$route.name != 'client-config') {
        this.deleteAcc = false;
      } else {
        this.deleteAcc = true;
      }
    },
    async deleteAccount() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.delete('/user', header);

        this.destroy();
      } catch (err) {
        console.log(err);
      }
    },
    destroy() {
      this.destroySession({
        data: {},
        callback: () => {
          this.$router.go({
            path: '/msdf',
          });
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
.config {
  height: 167px;
  max-height: 167px;
  height: 100%;
  border-bottom: 1px solid #c4c4c4;
  margin-top: 10px;
}
.personal-data {
  padding: 0 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      text-decoration: none;
      cursor: pointer;
      color: purple;
    }
  }
  .date {
    position: relative;
    .delete-account {
      position: absolute;
      top: 64px;
      border-radius: 5px;
      padding: 10px;
      background: #d2691e38;
      right: 0;
    }
    .btn-delete {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      button {
        @include button;
      }
    }
  }
}
</style>
