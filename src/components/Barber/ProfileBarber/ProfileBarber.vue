<template>
  <div>
    <Header />
    <div class="title">
      <h1 style="text-transform: capitalize">{{name}}</h1>
    </div>
    <div class='button-mark' >
      <button @click.prevent="$router.push({path: '/lista-barbeiros',})">Visualizar Horários</button>
    </div>
    <div class="config">
      <router-link to="/perfil-barbearia/configuracoes">Configurações</router-link>
    </div>
    <div class="informations">
      <div class="list-barber">
        <h2>Seus barbeiros</h2>
        <div class="field-barber">
          <Barbers v-for="(hair, index) in names " :key="index" :name="hair.name" />
          <PaginationBarber
            :source="totalPage"
            :pageNumber="pageNumber"
            @navigation="navigationNames()"
          />
          <button @click.prevent="$router.push({path: '/cadastro-barbeiro'})">Adicionar Barbeiro</button>
        </div>
      </div>

      <div class="field-barber">
        <h2>Datas / Horários Disponíveis</h2>
        <div class="field-barber">
          <Hour v-for="(hour, index) in hours" :key="index" :hour="hour"  />
         
          <PaginationHour
            :source="totalPageHour"
            :pageNumber="pageNumber"
            @navigation="navigationHour()"
          />
          <button @click.prevent="$router.push({path: '/cadastro-horario'})">Adicionar Horário</button>
        </div>
      </div>

      <div class="list-notify">
        <h2>Horários que os clientes marcaram</h2>
        <div class="field-barber">
          <div class="mark">
            <div class="hour-marked" v-if="nothaveHour">
              <h2>Você não tem horário marcado</h2>
            </div>
            <div class="hour-marked" v-for="client in clients" :key="client.id" v-if="!nothaveHour">
              <div class="hour-mark">
                <h3>Cliente: <span style="text-transform: capitalize">{{client.user}}</span></h3>
                <h3>
                  Cabelereiro:
                  <span>{{client.hairdresser}}</span>
                </h3>
                <h3>
                  Horário:
                  <span>{{client.date.split(" ")[1]}} {{ (new Date(), 'DD/MM/YYYY', client.date.split(' ')[0]) }} </span>
                </h3>
              </div>
              
            </div>
          </div>
          <PaginationMark :pageNumber="pageNumber" :source="totalPageMark" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/services/api.js";
import CurrentToken from "@/services/CurrentToken.js";
import format from 'date-fns/format'
export default {
  name: "profile-barber",
  components: {
    Header: () => import("@/views/Header/HeaderBar.vue"),
    Hour: () =>
      import("@/components/Barber/ProfileBarber/ButtonHour/ButtonHour.vue"),
    Barbers: () =>
      import("@/components/Barber/ProfileBarber/ButtonBarber/ButtonBarber.vue"),

    PaginationBarber: () =>
      import(
        "@/components/Barber/ProfileBarber/Pagination/PaginationBarber/PaginationBarber.vue"
      ),
    PaginationHour: () =>
      import(
        "@/components/Barber/ProfileBarber/Pagination/PaginationHour/PaginationHour.vue"
      ),
    PaginationMark: () =>
      import("./Pagination/PaginationMark/PaginationMark.vue")
  },
  data: () => ({
    names: "",
    name: "",
    idHair: "",
    hours: "",
    totalPage: "",
    totalPageHour: "",
    totalPageMark: "",
    pageNumber: 0,
    clients: "",
    hourMark: "",
    idBarber: "",
    nothaveHour: false
  }),

  computed: {
    barber() {
      return this.$store.state.user.barber;
    },
    idUser() {
      return this.$store.state.user.userStore.id;
    }
  },
  created() {
    this.getBarberLogin();
    this.GetInfo();
    this.GetHour();
    this.getHourMark();
  },

  methods: {
    async getBarberLogin() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: "Bearer " + token
          }
        };
        const res = await axios.get(`user/${this.idUser}`, header);

        this.idBarber = res.data.barber.id;

        this.GetBarber();
      } catch (err) {
        this.$router.push({
          path: "/cadastrar-barbearia"
        });
      }
    },
    async getHourMark() {
      const token = await CurrentToken.init();

      const header = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      const res = await axios.get("/schedule/user", header);
      if(res.data.schedules.data[0].user == null){
        this.nothaveHour = true
      }
      this.clients = res.data.schedules.data;
      this.totalPageMark = res.data.schedules.last_page;
      
    },
    async GetHour() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: "Bearer " + token
          }
        };
        const res = await axios.get("/schedule", header);
        this.hours = res.data.schedules.data;
        this.totalPageHour = res.data.schedules.last_page;
      } catch (err) {
        console.log(err);
      }
    },
    async GetInfo() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: "Bearer " + token
          }
        };
        const res = await axios.get("/hairdresser", header);
        this.names = res.data.hairdressers.data;
        this.totalPage = res.data.hairdressers.last_page;
      } catch (err) {
        console.log(err);
      }
    },
    async GetBarber() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: "Bearer " + token
          }
        };
        const res = await axios.get(`/barber/${this.idBarber}`, header);

        this.name = res.data.barber.name;

        const idHair = res.data.barber.hairdresser.forEach(el => {
          this.idHair = el.id;
        });
      } catch (err) {
        console.log(err);
      }
    },

    async navigationNames() {
      const token = await CurrentToken.init();

      const header = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      const res = await axios.get(
        `http://192.168.15.12:8000/hairdresser?page=${this.pageNumber + 1}`,
        header
      );

      this.totalPages = res.data.hairdressers.last_page;
      this.names = res.data.hairdressers.data;
    },
    async navigationHour() {
      const token = await CurrentToken.init();

      const header = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      const res = await axios.get(
        `http://192.168.15.12:8000/schedule?page=${this.pageNumber + 1}`,
        header
      );

      this.totalPages = res.data.schedules.last_page;
      this.hours = res.data.schedules.data;
    },
    async navigationMark() {
      const token = await CurrentToken.init();

      const header = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      const res = await axios.get(
        `http://192.168.15.12:8000/schedule/user?page=${this.pageNumber + 1}`,
        header
      );
      console.log(res)
      this.clients = res.data.schedules.data;
      this.totalPageMark = res.data.schedules.last_page;
    }
  }
};
</script>
<style lang="scss" src='./style.scss'>
