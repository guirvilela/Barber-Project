<template>
  <div>
    <Header />
    <div class="login">
      <div class="hair">
        <h1>
          Adicione o Barbeiro
        </h1>

        <div class="all">
          <form class="fields" autocomplete="off">
            <div class="inputs">
              <label for="name">Nome</label>
              <div style="position: relative" class="field-name">
                <input type="text" id="name" v-model="name" />
                <p v-if="$v.name.$error">Campo Obrigatório</p>
              </div>
            </div>

            <div class="hours-barber">
              <label for="check"
                >Horário de funcionamento: 08:00h às 18:00h</label
              >
            </div>

            <div class="send">
              <a @click.prevent="$router.push({ path: '/perfil-barbearia' })"
                >Cancelar</a
              >
              <button
                @click.prevent="$v.$invalid ? $v.$touch() : registerHair()"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators';
import { mask } from 'vue-the-mask';
import axios from '@/services/api.js';
import CurrentToken from '@/services/CurrentToken.js';
export default {
  name: 'login',
  components: {
    Header: () => import('@/views/Header/HeaderBar.vue'),
  },

  data: () => ({
    event: {
      delete: false,
    },
    selectedFile: '',
    name: '',
  }),

  validations: {
    name: { required },
  },

  methods: {
    async registerHair() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };

        const res = await axios.post(
          '/hairdresser',
          { name: this.name },
          header,
        );
        console.log(res);

        this.$router.push({ path: '/perfil-barbearia' });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" src="./style.scss" />
