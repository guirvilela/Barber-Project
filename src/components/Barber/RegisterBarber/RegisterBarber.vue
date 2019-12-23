<template>
  <div>
    <Header />
    <div class="login">
      <div>
        <h1>
          <span v-if="$v.name.$model == ''">Registre sua Barbearia</span
          >{{ name }}
        </h1>

        <div class="all">
          <form class="fields" autocomplete="off">
            <div class="inputs">
              <label for="name">Nome</label>
              <div style="position: relative">
                <input type="text" id="name" v-model="name" />
                <p v-if="$v.name.$error">Campo Obrigatório</p>
              </div>
            </div>

            <div class="inputs">
              <label for="cep">CEP</label>
              <div style="position: relative">
                <input
                  type="text"
                  id="cep"
                  v-model="cep"
                  @keyup="SearchCep()"
                  v-mask="['#####-###']"
                />
                <p v-if="$v.cep.$error">Campo Obrigatório</p>
              </div>
            </div>

            <div class="inputs">
              <label for="location">Rua</label>
              <div style="position: relative">
                <input type="text" id="location" v-model="location" />
                <p v-if="$v.location.$error">Campo Obrigatório</p>
              </div>
            </div>

            <div class="distric-number">
              <div class="inputs field-district">
                <label for="district">Bairro</label>
                <div style="position: relative">
                  <input type="text" id="district" v-model="district" />
                </div>
              </div>
              <div class="inputs number">
                <label for="number">Número</label>
                <div style="position: relative">
                  <input type="text" v-model="number" />
                  <p v-if="$v.district.$error | $v.number.$error">
                    Campo Obrigatório
                  </p>
                </div>
              </div>
            </div>

            <div class="distric-number">
              <div class="inputs field-district">
                <label for="city">Cidade</label>
                <div style="position: relative">
                  <input type="text" id="city" v-model="city" />
                </div>
              </div>
              <div class="inputs number">
                <label for="uf">UF</label>
                <div style="position: relative">
                  <input type="text" v-model="uf" id="uf" />
                  <p v-if="$v.uf.$error | $v.uf.$error">Campo Obrigatório</p>
                </div>
              </div>
            </div>

            <div class="send">
              <button
                @click.prevent="$router.push({ path: '/criar-barbearia' })"
              >
                Cancelar
              </button>
              <button
                @click.prevent="$v.$invalid ? $v.$touch() : CreateBarber()"
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
import { mapActions, mapMutations } from 'vuex';
export default {
  name: 'login',
  components: {
    Header: () => import('@/views/Header/HeaderBar.vue'),
  },

  data: () => ({
    name: '',
    location: '',
    district: '',
    number: '',
    city: '',
    cep: '',
    uf: '',
  }),

  validations: {
    name: { required },
    location: { required },
    district: { required },
    number: { required },
    cep: { required },
    city: { required },
    uf: { required },
  },

  methods: {
    ...mapActions({
      barber: 'user/barber',
    }),
    async SearchCep() {
      this.$viaCep.buscarCep(`${this.cep}`).then(res => {
        this.location = res.logradouro;
        this.district = res.bairro;
        this.city = res.localidade;
        this.uf = res.uf;
      });
    },
    async CreateBarber() {
      await this.barber({
        barber: {
          name: this.name,
          street: this.location,
          district: this.district,
          number: this.number,
          city: this.city,
          zip: this.cep,
          state: this.uf,
        },
        callback: () => {
          this.$router.push({
            path: '/cadastro-barbeiro',
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" src="./style.scss" />
