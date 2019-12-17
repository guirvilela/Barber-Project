<template>
  <div>
    <Header />
    <div class="title">
      <h1>Seu Perfil</h1>
    </div>
    <div class="informations">
      <div class="list-barber">
        <div class='config-data'>
          <router-link to="/perfil-cliente/dados-pessoais">Dados Pessoais</router-link>
          <router-link to="/perfil-cliente/configuracoes">Configuração da conta</router-link>
        </div>
        <div style='height: 100%'>
          <router-view />
        </div>
      </div>
      <div class="list-notify">
        <h2>Aqui ficarão os horários que você reservou</h2>
        <Mark v-for="item in 3" :key="item" :avatar="avatar" :name="name" :hour="hour" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "profile-barber",
  components: {
    Header: () => import("@/views/Header/HeaderBar.vue"),
    Mark: () =>
      import("@/components/Barber/ProfileBarber/ButtonMark/ButtonMark.vue")
  },
  data: () => ({
    avatar: "image",
    name: "João",
    hour: "15:00"
  })
};
</script>
<style lang="scss" src='./style.scss'>
