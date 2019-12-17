<template>
  <div>
    <Header />
    <div class="history">
      <div class="barbers ">
        <div class="filter">
          <label for="">Filtro</label>

          <input type="text" />
          <div>lop</div>
          <Barbers v-for="barber in barbers" :key="barber.id" :prop="barber" />
        </div>
      </div>
      <div class="barbers">HISO</div>
    </div>
  </div>
</template>

<script>
import axios from '@/services/api.js';
import CurrentToken from '@/services/CurrentToken.js';
export default {
  name: 'history-client',
  components: {
    Header: () => import('@/views/Header/HeaderBar.vue'),
    Barbers: () => import('@/components/HistoryClient/Button/Button.vue'),
  },
  data: () => ({
    barbers: [],
  }),
  created() {
    this.GetBarbers();
  },
  methods: {
    async GetBarbers() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.get('/barber', header);
        console.log('RES', res);
        this.barbers = res.data.barbers.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
.history {
  display: flex;
  justify-content: center;
  align-self: center;
  height: calc(100vh - 71px);

  .barbers {
    flex: 1;
    padding: 30px;
    display: flex;
    justify-content: center;
  }
  .barber {
    display: flex;
    justify-content: center;
  }
}
.filter {
  width: 100%;
}
</style>
