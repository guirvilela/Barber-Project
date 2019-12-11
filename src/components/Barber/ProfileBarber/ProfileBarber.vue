<template>
  <div>
    <Header />
    <div class='title'>
      <h1>Nome da Barbearia</h1>
    </div>
    <div class='informations'>
        
        <div class='list-barber'>
        <h2>Aqui Estão todos seus barbeiros</h2>
        <Barbers/>
        </div>
        <div class='list-notify'>
            <h2>Aqui ficarão os horários que os clientes marcaram</h2> 
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'profile-barber',
  components: {
    Header: () => import('@/views/Header/HeaderBar.vue'),
    Barbers: () => import('@/components/Barber/ProfileBarber/ButtonBarber/ButtonBarber.vue')
  },
};
</script>
<style lang="scss" src='./style.scss'>
