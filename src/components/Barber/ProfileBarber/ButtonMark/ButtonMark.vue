<template>
  <div class="btn-barber">
    <div class="barber-field">
      <div>
        {{ avatar }}
      </div>

      <div>
        <h3>{{ name }}</h3>
        <h4>{{ hour }}</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['avatar', 'name', 'hour'],
};
</script>
<style lang="scss">
@import '@/assets/scss/index.scss';
.btn-barber {
  display: flex;
  justify-content: center;

  .barber-field {
    width: 300px;
    display: flex;
    background: #d2691eb8;
    margin-top: 20px;
    align-items: center;
    border-radius: 5px;
    padding: 10px;
  }
}
</style>
