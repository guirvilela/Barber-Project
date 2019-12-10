<template>
  <div class='login'>
    <div>
        <h1>Login</h1>

        <div class='all'>
            <form class='fields' autocomplete="off">
                
                <div class='inputs'>
                    <label for="email">Email</label>
                    <div class='field-digit'>
                    <input type="text" id='email' v-model='email' @focus='$v.email.$reset()'>
                    <p v-if='$v.email.$error'>{{ email == '' ? 'Campo Obrigatório' : 'Email inválido'}}</p>
                    </div>
                </div>
                <div class='inputs'>
                    <label for="pass">Senha</label>
                    
                    <div class='field-digit'>
                    <input type="text" id='pass' v-model='pass' @focus='$v.pass.$reset()'>
                    <p v-if='$v.pass.$error'>Campo Obrigatório</p>
                    </div>
                </div>
                
                <div class='send'>
                   <a @click.prevent="$parent.Components(2)">Criar Conta</a>  
                <button @click.prevent='$v.$invalid ? $v.$touch() : Send()'>Fazer Login</button>
               
                </div>
            </form>
            
        </div>
    </div>
</div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
export default {
    name: 'login',
    data:()=> ({
        email: '',
        pass: '',
    }),

    validations:{
        email: {required, email},
        pass: {required},
    },
    methdos:{
        Send(){
            console.log('ok')
        }
    }
    
};
</script>
<style lang="scss" src='./style.scss'>

