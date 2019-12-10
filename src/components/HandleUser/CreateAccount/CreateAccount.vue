<template>
  <div class='login'>
    <div>
        <h1>Criar Conta</h1>

        <div class='all'>
            <form class='fields' autocomplete="off">
                <div class='inputs'>
                    <label for="name">Nome</label>
                    <div style='position: relative'>
                    <input type="text" id='name' v-model='name'>
                    <p v-if='$v.name.$error'>Campo Obrigatório</p>
                    </div>
                </div>
                <div class='inputs'>
                    <label for="email">Email</label>
                    <div style='position: relative'>
                    <input type="text" id='email' v-model='email'>
                     <p v-if='$v.email.$error'>{{email == '' ? 'Campo Obrigatório' : 'Email inválido'}}</p>
                    </div>
                </div>
                <div class='inputs'>
                    <label for="pass">Senha</label>
                    <div style='position: relative'>
                    <input type="password" id='pass' v-model='pass'>
                     <p v-if='$v.pass.$error' >Campo Obrigatório</p>
                    </div>
                </div>
                <div class='inputs'>
                    <label for="confirm">Confirmar Senha</label>
                    <div style='position: relative'>
                    <input type="password" id='confirm' v-model='confirm'>
                     <p v-if='$v.confirm.$error' >{{confirm == '' ? 'Campo Obrigatório' : 'Senhas diferente'}}</p>
                    </div>
                </div>
                 <p>Já tenho uma conta <a @click.prevent='$parent.Components(1)'>Fazer login</a></p>
                <div class='send'>
                    <a class='cancelBtn' @click.prevent='$parent.Components(1)'>Cancelar</a>
                <button @click.prevent='$v.$invalid ? $v.$touch() : $parent.Components(3)' >Cadastrar</button>
               
                </div>
            </form>
        </div>
    </div>
</div>
</template>
<script>
import { required, email, sameAs } from "vuelidate/lib/validators";
export default {
    
    name: 'login',
    
    data: () => ({
        name: '',
        email: '',
        pass: '',
        confirm: '',
    }),
   
   validations:{
       name: {required},
       email: {required, email},
       pass: {required},
       confirm: {required,sameAs: sameAs('pass')}
   }

    

    
};
</script>
<style lang="scss" src='./style.scss'>

