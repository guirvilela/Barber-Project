<template>
  <div>
    <Header />
    <div class="login">
      <div class="hair">
        <h1>
          Adicione os Horários
        </h1>

        <div class="all">
          <form class="fields" autocomplete="off">
            <div class="inputs">
              <label for="hour">Data / Horário</label>
              <div style="position: relative" class="field-name">
                <input
                  type="text"
                  id="hour"
                  v-model="hour"
                  placeholder="Exemplo: 2019-12-24 09:40"
                  @focus="$v.hour.$reset()"
                />

                <p v-if="$v.hour.$error">Campo Obrigatório</p>
                <p v-if="invalid">Formato Inválido</p>
              </div>
              <div class="example">
                <h3>Exemplo: 2019-12-24 09:40</h3>
              </div>
            </div>

            <div class="send">
              <a @click.prevent="$router.push({ path: '/perfil-barbearia' })"
                >Cancelar</a
              >
              <button
                @click.prevent="$v.$invalid ? $v.$touch() : registerHour()"
              >
                Adicionar
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
    invalid: false,
    event: {
      delete: false,
    },
    selectedFile: '',
    hour: '',
  }),

  validations: {
    hour: { required },
  },

  methods: {
    async registerHour() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };

        const res = await axios.post('/schedule', { date: this.hour }, header);

        this.$router.push({ path: '/perfil-barbearia' });
      } catch (err) {
        console.log(err.response);
        if (err.response.data.message.match(/invalid/)) {
          this.invalid = true;
          setTimeout(() => {
            this.invalid = false;
          }, 3000);
        }
      }
    },
  },
};
</script>

<style lang="scss" src="./style.scss" />
