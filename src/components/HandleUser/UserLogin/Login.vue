<template>
  <div class='login'>
    <div class='login-user'>
        <h1>Login</h1>

        <div class='all'>
            <form class='fields' autocomplete="off">
                
                <div class='inputs'>
                    <label for="email">Email</label>
                    <div class='field-digit'>
                    <input type="text" id='email' v-model='email' @focus='$v.email.$reset()'>
                    <p v-if='$v.email.$error'>{{ email == '' ? 'Campo Obrigatório' : 'Email inválido'}}</p>
                    <p v-if='invalidEmail'>Email Não cadastrado</p>
                    </div>
                </div>
                <div class='inputs'>
                    <label for="pass">Senha</label>
                    
                    <div class='field-digit'>
                    <input type="password" id='pass' v-model='pass' @focus='$v.pass.$reset()'>
                    <p v-if='$v.pass.$error'>Campo Obrigatório</p>
                    <p v-if='invalidPass'>Senha incorreta</p>
                    </div>
                </div>
                
                <div class='send'>
                   <a @click.prevent="$parent.Components(2)">Criar Conta</a>  
                <button @click.prevent='$v.$invalid ? $v.$touch() : SendLogin()'>Fazer Login</button>
               
                </div>
            </form>
            
        </div>
    </div>
</div>
</template>
<script>
import axios from '@/services/api.js';
import { required, email } from "vuelidate/lib/validators";
import { mapActions, mapMutations } from "vuex";
import CurrentToken from "@/services/CurrentToken.js";

export default {
    name: 'login',
    data:()=> ({
        email: '',
        pass: '',
        invalidEmail: false,
        invalidPass: false
    }),

    validations:{
        email: {required, email},
        pass: {required},
    },
    computed: {
    errorRequest() {
      return this.$store.state.user.error.errors;
    },
    Barber(){
        return this.$store.state.user.userStore.barber
    }
  },
 
    methods: {
        ...mapActions({
      login: "user/login"
    }),

    async SendLogin(){
        await this.login({
            user:{
                email: this.email,
                password:this.pass,
            },
            callback:() => {
                this.$router.go({
                name: 'home',
        });
               
            }
        })
        this.requestError();
    },

    requestError() {
      if (this.errorRequest !== undefined) {
        if (
          this.errorRequest.email !== undefined &&
          this.errorRequest.email[0].match(/email/)
        ) {
          this.invalidEmail = true;
        }
        if (
          this.errorRequest.password !== undefined &&
          this.errorRequest.password[0].match(/password/)
        ) {
          this.invalidPass = true;
        }
      }
    }
 }
       
    
    
};
</script>
<style lang="scss" src='./style.scss'>

