<template>
  <div>
    <Header />
    <div class="title">
      <h1>Seu Perfil</h1>
    </div>
    <div class="button-mark">
      <button @click.prevent="$router.push({path: '/lista-barbeiros',})">Quero reservar um horário</button>
    </div>
    <div class="informations">
      <div class="list-barber">
        <div class="config-data">
          <router-link to="/perfil-cliente/dados-pessoais">Dados Pessoais</router-link>
          <router-link to="/perfil-cliente/configuracoes">Configuração da conta</router-link>
        </div>
        <div style="height: 100%">
          <router-view />
        </div>
      </div>
      <div class="list-notify">
        <h2>Horário que você reservou</h2>
        <div class="mark">
          <div class="hour-marked" v-if="nothaveHour">
            <h2>Você não tem Horário marcado</h2>
          </div>
          <div class="hour-marked" v-if="!nothaveHour">
            <div class="name-barber">
              <h2>{{nameBarber}}</h2>
            </div>
            <div class="hour-mark">
              <h3>
                Endereço:
                <span>{{street}}</span>
              </h3>
              <h3>
                Bairro:
                <span>{{district}}</span>
                <span>,</span>
                <span>{{number}}</span>
              </h3>
              <h3>
                Cidade:
                <span>{{city}}</span>
              </h3>
              <h3>
                Cabelereiro:
                <span>{{nameHair}}</span>
              </h3>
              <h3>
                Data:
                <span> {{hour.split(' ')[1]}} {{date}}</span>
              </h3>
            </div>
            <div class="desmark">
              <button @click.prevent="Desmark()">Desmarcar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {  formatDistance, formatRelative, subDays, parseISO } from 'date-fns'
import format from 'date-fns/format'
import axios from "@/services/api.js";
import CurrentToken from "@/services/CurrentToken.js";
import { parse } from 'path';
export default {
  name: "profile-barber",
  data: () => ({
    nothaveHour: false,

    nameBarber: "",
    nameHair: "",
    street: "",
    district: "",
    city: "",
    number: "",
    date: "",
    hour: '',


    scheduleid: "",
    hairdresserid: ""
  }),
  components: {
    Header: () => import("@/views/Header/HeaderBar.vue")
  },

  created() {
    this.getHour();
   
  },
  methods: {
    formatDate(){
      const Years = new Date(this.hour);
      const formattedDate = format(Years, 'DD/MM/YYYY');
      
      this.date = formattedDate
    },
    async Desmark() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: "Bearer " + token
          }
        };
        const res = await axios.delete(
          `/schedule/${this.scheduleid}/hairdresser/${this.hairdresserid}`,
          header
        );
       
        this.$router.go({
          path: "/perfil-cliente/dados-pessoais"
        });
      } catch (err) {
        console.log(err);
      }
    },
    async getHour() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: "Bearer " + token
          }
        };
        const res = await axios.get("/user/schedule", header);
        this.scheduleid = res.data.schedule.schedule.id;
        this.hairdresserid = res.data.schedule.hairdresser.id;
        this.date = res.data.schedule.schedule.date;
        this.nameBarber = res.data.schedule.barber.name;
        this.nameHair = res.data.schedule.hairdresser.name;
        this.street = res.data.schedule.barber.street;
        this.district = res.data.schedule.barber.district;
        this.city = res.data.schedule.barber.city;
        this.number = res.data.schedule.barber.number;
        this.hour = res.data.schedule.schedule.date
         this.formatDate()

        this.nothaveHour = false;
      } catch (err) {
        if (err.response.data.error.match(/User/)) {
          this.nothaveHour = true;
        }
      }
    }
  }
};
</script>
<style lang="scss" src='./style.scss'>
