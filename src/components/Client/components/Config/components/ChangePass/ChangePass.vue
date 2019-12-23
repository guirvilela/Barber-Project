<template>
  <div class="change-user">
    <div class="x">
      <span
        @click.prevent="$router.push({ path: '/perfil-cliente/configuracoes' })"
      >
        &times;
      </span>
    </div>
    <h2>Alteração de Senha</h2>
    <div style="position: relative">
      <input
        type="password"
        v-model="atualPass"
        placeholder="Senha Atual"
        @focus="$v.atualPass.$reset()"
      />
      <p v-if="$v.atualPass.$error">
        Campo Obrigatório
      </p>
      <p v-if="incorrectPass">Senha incorreta</p>
      <p v-if="passEquals">Senhas são iguais</p>
      <span v-if="success">Senha Alterada com sucesso</span>
    </div>
    <div style="position: relative">
      <input
        type="password"
        v-model="pass"
        placeholder="Nova senha"
        @focus="$v.pass.$reset()"
      />
      <p v-if="$v.pass.$error">
        {{ pass == '' ? 'Campo Obrigatório' : 'Mínimo de 6 caracteres' }}
      </p>
      <p v-if="$v.pass.minLength == false"></p>
    </div>
    <div style="position: relative">
      <input
        type="password"
        v-model="confirm"
        placeholder="Confirme sua senha"
        @focus="$v.confirm.$reset()"
      />
      <p v-if="$v.confirm.$error">
        {{ confirm == '' ? 'Campo obrigatório' : 'Senhas Diferentes' }}
      </p>
    </div>
    <div class="btn-change">
      <button @click.prevent="$v.$invalid ? $v.$touch() : changePass()">
        Alterar
      </button>
    </div>
  </div>
</template>
<script>
import axios from '@/services/api.js';
import CurrentToken from '@/services/CurrentToken.js';
import { required, sameAs, minLength } from 'vuelidate/lib/validators';
export default {
  name: 'data-client',
  data: () => ({
    atualPass: '',
    pass: '',
    confirm: '',
    incorrectPass: false,
    passEquals: false,
    success: false,
  }),

  validations: {
    atualPass: { required },
    pass: { required, minLength: minLength(6) },
    confirm: { required, sameAs: sameAs('pass') },
  },

  methods: {
    async changePass() {
      const data = {
        password: this.atualPass,
        new_password: this.pass,
      };
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.put('/user/password', data, header);
        (this.success = true),
          setTimeout(() => {
            this.success = false;
          }, 3000);
      } catch (err) {
        if (this.atualPass === this.pass) {
          this.passEquals = true;
          setTimeout(() => {
            this.passEquals = false;
          }, 3000);
        } else if (err.response.data.errors.password[0].match(/password/)) {
          this.incorrectPass = true;
          setTimeout(() => {
            this.incorrectPass = false;
          }, 3000);
        }
      }
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/index.scss';
p {
  top: 35.5px !important;
}
.change-user {
  margin-top: 20px;
  padding: 10px;

  @include input;
  input {
    margin: 20px 0;
    position: relative;
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
</style>
