<template>
  <div class="btn-barber">
    <div class="barber-field">
      <div class="name">
        <h3>{{ name }}</h3>
        <!-- <h4>{{ prop.hour }}</h4> -->
        <span @click.prevent="removeHair(index)">&times;</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '@/services/api.js';
import CurrentToken from '@/services/CurrentToken.js';
export default {
  props: ['name'],

  methods: {
    async removeHair(index) {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.delete(
          `/hairdresser/${this.$parent.idHair}`,
          header,

          this.$parent.names.splice(index, 1),
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
    position: relative;
  }
}
span {
  position: absolute;
  font-size: 18px;
  font-weight: 500;
  top: 11px;
  right: 20px;
  cursor: pointer;
}
</style>
