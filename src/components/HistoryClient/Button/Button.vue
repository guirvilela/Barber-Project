<template>
  <div class="btn-field-barber">
    <div class="title-barber">
      <div class="img-barber">
        <img src="@/assets/images/profile.png" alt="perfil" />
      </div>

      <h2>{{ prop.name }}</h2>
    </div>
    <div class="location">
      <h3>{{ prop.street }},</h3>
      <h3>{{ prop.district }}, {{ prop.number }}, {{ prop.city }}</h3>
    </div>
  </div>
</template>
<script>
export default {
  props: ['prop'],
};
</script>
<style lang="scss">
@import '@/assets/scss/index.scss';
.btn-field-barber {
  background: $brown;
  margin-top: 30px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 2px 2px 4px #c4c4c4;

  h3,
  h2 {
    color: #ffffff;
  }
  .title-barber {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    justify-content: center;

    .img-barber {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
  .location {
    h3 {
      font-size: 18px;
      margin: 10px 0;
    }
  }
}
</style>
