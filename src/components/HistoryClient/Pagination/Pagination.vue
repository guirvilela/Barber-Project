<template>
  <div>
    <div class="paginated">
      <small>Página {{ pageNumber + 1 }} de {{ source }}</small>
      <div class="controls-paginated">
        <button
          @click.prevent="prevPage()"
          :class="{ disabled: pageNumber <= 0 }"
          :disabled="pageNumber <= 0"
        ></button>
        <button
          class="right"
          @click.prevent="nextPage()"
          :class="{ disabled: pageNumber + 1 == source }"
          :disabled="pageNumber + 1 == source"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { range } from 'lodash';
import axios from '@/services/api.js';
import CurrentToken from '@/services/CurrentToken.js';
export default {
  name: 'paginated',
  props: ['source', 'pageNumber'],
  data: () => ({}),

  methods: {
    nextPage() {
      this.$parent.pageNumber++;
      this.$parent.navigate();
    },
    prevPage() {
      this.$parent.pageNumber--;
      this.$parent.navigate();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.paginated {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
  .controls-paginated {
    margin: 0px 15px;
    display: flex;
    button {
      margin-top: 0;
      height: 30px;
      width: 30px;
      border-radius: 50%;
      font-size: 20px;
      background: transparent;
      border: 1px solid blue;
      color: blue;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative !important;
      touch-action: manipulation !important;
      transition: 0.01s ease-in;
      &:first-child {
        margin-right: 10px;
      }
      &:active {
        background: blue;
        color: #fff !important;
        box-shadow: rgb(255, 255, 255) 0px 0px 4px 0px,
          rgb(113, 113, 113) 0px 0px 4px 1px,
          rgba(255, 255, 255, 0.5) 0px 0px 4px 2px !important;
        outline: none !important;
        animation: box-shadow 0.2s ease 0s !important;
      }
      &.disabled {
        color: rgb(193, 195, 199);
        border: 1px solid rgb(193, 195, 199);
      }
    }
  }
}

.arrow {
  color: blue;
}

.right .arrow {
  transform: rotate(180deg);
}

.content {
  display: flex;
  flex-direction: column;
}
.all-adverts {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 12px;
  flex-wrap: wrap;
  a {
    text-decoration: none;
  }
}

.nostep {
  cursor: not-allowed !important;
}
</style>
