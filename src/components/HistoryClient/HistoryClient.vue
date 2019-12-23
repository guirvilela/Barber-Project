<template>
  <div>
    <Header />
    <div class="history">
      <div class="barbers ">
        <div class="filter">
          <div class="filtered">
            <input type="text" v-model="searchBarber" placeholder="Filtrar" />
          </div>

          <Pagination
            :source="totalPages"
            :pageNumber="pageNumber"
            @navigate="navigate()"
          />
          <div class="btn-barbers">
            <button
              v-for="barber in filteredBarber"
              @click="(select = barber), GetTotalBarber(select.id)"
            >
              <div class="btn-field-barbers ">
                <div class="title-barber">
                  <div class="img-barber" @click="alertUser()">
                    <img
                      v-if="barber.logo == null"
                      :src="require('@/assets/images/profile.png')"
                      alt="Photo"
                    />
                    <img
                      :src="
                        barber.logo.replace(
                          'localhost:8000',
                          '192.168.15.12:8000',
                        )
                      "
                      alt="user"
                      v-else
                    />
                  </div>
                  <h2>{{ barber.name }}</h2>
                </div>
                <div class="location">
                  <h3>{{ barber.street }},</h3>
                  <h3>
                    {{ barber.district }}, {{ barber.number }},
                    {{ barber.city }}
                  </h3>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="barbers ">
        <div class="filter">
          <h3 style="margin-bottom: 98px; text-align: center;">Cabelereiros</h3>

          <div class="types-props">
            <label
              :for="'type-' + index"
              v-for="(hair, index) in hairs"
              :key="hair.id"
              class="item-list-prop"
            >
              <input
                type="radio"
                v-model="barberHair"
                :id="'type-' + index"
                :value="hair.id"
              />
              {{ hair.name }}
            </label>
          </div>
        </div>
      </div>
      <div class="barbers " style="position:relative">
        <div class="filter">
          <h3 style="margin-bottom: 98px; text-align: center;">
            Horários / Datas
          </h3>

          <div class="types-props">
            <label
              :for="'typ-' + index"
              v-for="(hour, index) in hours"
              :key="hour.id"
              class="item-list-prop"
            >
              <input
                type="radio"
                v-model="barberHour"
                :id="'typ-' + index"
                :value="hour.id"
              />
              {{ hour.date.split(' ')[1] }}
              {{ hour.date.split(' ')[0] }}
            </label>
          </div>

          <div class="btn-create">
            <button
              @click.prevent="CreateHour()"
              :disabled="barber == 1"
              :class="{ disabled: barber == 1 }"
            >
              Marcar
            </button>
            <div class="feedback">
              <div class="success" v-if="sucess">
                <h3>
                  Seu horário foi marcado com sucesso!
                </h3>
              </div>
              <div class="error" v-if="error">
                <h3>Você já tem um horário marcado</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/services/api.js';
import CurrentToken from '@/services/CurrentToken.js';
import format from 'date-fns/format';
export default {
  name: 'history-client',
  components: {
    Header: () => import('@/views/Header/HeaderBar.vue'),
    Pagination: () => import('./Pagination/Pagination'),
  },
  data: () => ({
    hairs: [],
    hours: '',
    hourDate: '',
    date: '',
    check: false,
    totalPages: '',
    barberHair: '',
    barberHour: '',
    teste: null,
    select: null,
    pageNumber: 0,
    searchBarber: '',
    sucess: false,
    error: false,
  }),
  created() {
    this.GetBarbers();
  },
  computed: {
    barber() {
      return this.$store.state.user.userStore.barber;
    },
    filteredBarber() {
      return this.teste.filter(res => {
        return res.name.match(this.searchBarber);
      });
    },
  },

  methods: {
    formatDate() {
      this.hours.forEach(el => {
        this.hourDate = el.date.split(' ')[0].replace(/\D/g, ',');

        const Years = new Date(this.hourDate);

        const formattedDate = format(this.hourDate, 'DD/MM/YYYY');

        this.hourDate = formattedDate;
      });
    },

    async CreateHour() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.post(
          `/schedule/${this.barberHour}/hairdresser/${this.barberHair}`,
          {},
          header,
        );
        console.log(res);
        this.sucess = true;
        setTimeout(() => {
          this.sucess = false;
          this.$router.push({
            path: '/perfil-cliente/dados-pessoais',
          });
        }, 4000);
      } catch (err) {
        console.log(err);
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 4000);
      }
    },
    async navigate() {
      const token = await CurrentToken.init();

      const header = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      const res = await axios.get(
        `http://192.168.15.12:8000/barber?page=${this.pageNumber + 1}`,
        header,
      );

      this.totalPages = res.data.barbers.last_page;
      this.teste = res.data.barbers.data;
    },

    async GetBarbers() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.get('/barber', header);

        this.totalPages = res.data.barbers.last_page;
        this.teste = res.data.barbers.data;
      } catch (err) {
        console.log(err);
      }
    },
    async GetTotalBarber(id) {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.get(`/barber/${id}`, header);
        this.hairs = res.data.barber.hairdresser;
        // this.date = res.data.schedules;
        this.hours = res.data.schedules;
        this.formatDate();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style src="./style.scss" lang="scss" scoped />
