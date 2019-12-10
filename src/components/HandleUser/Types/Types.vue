<template>
  <div class="main-types">
    <div class="types">
      <div class="client">
        <h1>Sou Cliente</h1>
        <div class="prop">
          <p>
            Cliente tem a grande vantagem de reservar sua vaga, em qualquer
            barbearia, e no horário que quiser!
          </p>
        </div>
      </div>
      <div class="client" @click.prevent="$parent.Components(4)">
        <h1>Tenho uma Barbearia</h1>
        <div class="prop">
          <p>
            Para você que deseja alcaçar mais clientes através de uma plataforma
            de Agendamento totalmente Online
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Types',
};
</script>
<style lang="scss" src="./style.scss" />
