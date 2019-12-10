<template>
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
            <label for="location">Rua</label>
            <div style="position: relative">
              <input type="text" id="location" v-model="location" />
              <p v-if="$v.location.$error">Campo Obrigatório</p>
            </div>
          </div>
          <div>
            <div class="inputs">
              <label for="district">Bairro</label>
              <div style="position: relative">
                <input type="text" id="district" v-model="district" />
                <p v-if="$v.district.$error">Campo Obrigatório</p>
              </div>
            </div>
            <div class="inputs number">
              <label for="number">Número</label>
              <div style="position: relative">
                <input type="text" v-model="number" />
                <p v-if="$v.number.$error">Campo Obrigatório</p>
              </div>
            </div>
          </div>
          <div class="inputs">
            <label for="confirm">CEP</label>
            <div style="position: relative">
              <input type="password" id="confirm" v-model="cep" />
              <p v-if="$v.cep.$error">Campo Obrigatório</p>
            </div>
          </div>

          <div class="send">
            <a @click.prevent="$parent.Components(3)">Cancelar</a>
            <button
              @click.prevent="$v.$invalid ? $v.$touch() : $parent.Components()"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators';
export default {
  name: 'login',

  data: () => ({
    name: '',
    location: '',
    district: '',
    number: '',
    cep: '',
  }),

  validations: {
    name: { required },
    location: { required },
    district: { required },
    number: { required },
    cep: { required },
  },
};
</script>

<style lang="scss"></style>
