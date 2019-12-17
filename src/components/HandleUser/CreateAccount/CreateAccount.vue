<template>
  <div class="login">
    <div class="create">
      <h1>Criar Conta</h1>

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
            <label for="email">Email</label>
            <div style="position: relative">
              <input type="text" id="email" v-model="email" />
              <p v-if="$v.email.$error">{{email == '' ? 'Campo Obrigatório' : 'Email inválido'}}</p>
              <p v-if="alreadyExist">Email já existe</p>
            </div>
          </div>

          <div class="inputs">
            <label for="pass">Senha</label>
            <div style="position: relative">
              <input type="password" id="pass" v-model="pass" />
              <p
                v-if="$v.pass.$error"
              >{{pass == '' ? 'Campo Obrigatório' : 'Senha com pelo menos 6 caracteres'}}</p>
            </div>
          </div>

          <div class="inputs">
            <label for="confirm">Confirmar Senha</label>
            <div style="position: relative">
              <input type="password" id="confirm" v-model="confirm" />
              <p
                v-if="$v.confirm.$error"
              >{{confirm == '' ? 'Campo Obrigatório' : 'Senhas diferente'}}</p>
            </div>
          </div>

          <div class="imbarber">
            <input type="checkbox" v-model="barber" />
            <span>Tenho minha barbearia</span>
          </div>

          <p style="margin-top: 10px">
            Já tenho uma conta
            <a @click.prevent="$parent.Components(1)">Fazer login</a>
          </p>
          <div class="send">
            <a class="cancelBtn" @click.prevent="$parent.Components(1)">Cancelar</a>
            <button @click.prevent="$v.$invalid ? $v.$touch() : createAccount()">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/services/api.js";
import { required, email, sameAs } from "vuelidate/lib/validators";
import { mapActions, mapMutations } from "vuex";
import * as Cookies from "js-cookie";
export default {
  name: "login",

  data: () => ({
    name: "",
    email: "",
    pass: "",
    confirm: "",
    alreadyExist: false,
    barber: false
  }),

  validations: {
    name: { required },
    email: { required, email },
    pass: { required },
    confirm: { required, sameAs: sameAs("pass") }
  },
  computed: {
    errorRequest() {
      return this.$store.state.user.error.errors;
    },
    hairBarber(){
        return this.$store.state.user.userStore.barber
    }
  },
 

  methods: {
    ...mapActions({
      store: "user/store"
    }),
    async createAccount() {
      await this.store({
        data: {
          name: this.name,
          email: this.email,
          password: this.pass,
          barber: this.barber
        },
        callback: () => {
            if(this.hairBarber == 1){
              this.$router.push({
                path: '/perfil-barbearia'
              })
            }else{
              this.$router.push({
                path: '/perfil-cliente/dados-pessoais'
              })
            };
          
        }
      });
      this.error();
    },
    error() {
      if (
        this.errorRequest.email !== undefined &&
        this.errorRequest.email[0].match(/email/)
      ) {
        this.alreadyExist = true;
        setTimeout(() => {
          this.alreadyExist = false;
        }, 5000);
      }
    }
  }
};
</script>
<style lang="scss" src='./style.scss'>
