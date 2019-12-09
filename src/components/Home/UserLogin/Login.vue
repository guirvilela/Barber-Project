<template>
  <div class='login'>
      <div>
    <h1>Login</h1>

    <div class='all'>
        <div class='fields'>
            <div class='inputs'>
                <label for="name">Nome</label>
                <input type="text" id='name'>
            </div>
            <div class='inputs'>
                <label for="email">Email</label>
                <input type="text" id='email'>
            </div>
            <div class='inputs'>
                <label for="pass">Senha</label>
                <input type="text" id='pass'>
            </div>
            <div class='inputs'>
                <label for="confirm">Confirmar Senha</label>
                <input type="text" id='confirm'>
            </div>
            <div class='send'>
            <button>Criar minha conta</button>
            </div>
        </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'login',
};
</script>
<style lang="scss" src='./style.scss'>

