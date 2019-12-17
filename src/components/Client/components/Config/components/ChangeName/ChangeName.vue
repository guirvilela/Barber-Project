<template>
  <div class="change-user">
    <span v-if="success" class="success">Alterado com Sucesso</span>
    <div class="x">
      <span
        @click.prevent="$router.push({ path: '/perfil-cliente/configuracoes' })"
      >
        &times;
      </span>
    </div>

    <h2>Alteração de Nome de Usuário ou Email</h2>

    <div>
      <input
        type="text"
        v-model="username"
        placeholder="Digite o Nome desejado"
      />
    </div>
    <div class="field-email">
      <input
        type="text"
        v-model="email"
        placeholder="Digite o Email desejado"
      />
      <p v-if="exist">Email já existe</p>
    </div>
    <div class="btn-change">
      <button @click.prevent="changeName()">Alterar</button>
    </div>
  </div>
</template>
<script>
import axios from '@/services/api.js';
import CurrentToken from '@/services/CurrentToken.js';
export default {
  name: 'data-client',
  data: () => ({
    username: '',
    email: '',
    exist: false,
    success: false,
  }),
  methods: {
    async changeName() {
      const data = {
        name: this.username,
        email: this.email,
      };
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.post('/user/update', data, header);
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 4000);
      } catch (err) {
        console.log(err.response);
        if (err.response.data.errors.email[0].match(/email/)) {
          this.exist = true;
          setTimeout(() => {
            this.exist = false;
          }, 4000);
        }
      }
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/index.scss';
.field-email {
  position: relative;
  p {
    top: 31.5px !important;
    right: -109px !important;
  }
}
.change-user {
  margin-top: 20px;
  padding: 10px;
  position: relative;
  @include input;
  input {
    margin: 20px 0;
  }
  .btn-change {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      @include button;
    }
  }
}
.x {
  display: flex;
  justify-content: flex-end;
  span {
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
  }
}
.success {
  position: absolute;
  right: -166px;
  bottom: 18px;
  color: green;
  font-weight: 500;
}
</style>
