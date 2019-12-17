<template>
  <div>
    <Header />
    <router-link to="/perfil-barbearia"> Voltar</router-link>
    <div class="title">
      <h1>Configurações da sua Barbearia</h1>
    </div>

    <div class="informations">
      <div class="data-info">
        <div class="data">
          <h2>Nome:</h2>
          <div class="data-barber">
            <h3 v-if="property.name" style="text-transform: capitalize">
              {{ name }}
            </h3>
            <input type="text" v-model="name" v-else />
            <img
              src="@/assets/images/pencil.svg"
              alt="change"
              @click.prevent="property.name = !property.name"
            />
            <button @click.prevent="changeData()">
              <span v-if="salved">Salvo!</span>
              <span v-else>Salvar</span>
            </button>
          </div>
        </div>
        <div class="data">
          <h2>Cep:</h2>
          <div class="data-barber">
            <h3 v-if="property.cep">{{ cep }}</h3>
            <input
              type="text"
              v-model="cep"
              v-else
              v-mask="['#####-###']"
              @keyup="SearchCep()"
            />
            <img
              src="@/assets/images/pencil.svg"
              alt="change"
              @click.prevent="property.cep = !property.cep"
            />
          </div>
        </div>
        <div class="data">
          <h2>Endereço:</h2>
          <div class="data-barber">
            <h3 v-if="property.street">{{ street }}</h3>
            <input type="text" v-model="street" v-else />
            <img
              src="@/assets/images/pencil.svg"
              alt="change"
              @click.prevent="property.street = !property.street"
            />
          </div>
        </div>
        <div class="data">
          <h2>Bairro:</h2>
          <div class="data-barber">
            <h3 v-if="property.district">{{ district }}</h3>
            <input type="text" v-model="district" v-else />
            <img
              src="@/assets/images/pencil.svg"
              alt="change"
              @click.prevent="property.district = !property.district"
            />
          </div>
        </div>
        <div class="data">
          <h2>Número:</h2>
          <div class="data-barber">
            <h3 v-if="property.number">{{ number }}</h3>
            <input type="text" v-model="number" v-else />
            <img
              src="@/assets/images/pencil.svg"
              alt="change"
              @click.prevent="property.number = !property.number"
            />
          </div>
        </div>
        <div class="data">
          <h2>Cidade:</h2>
          <div class="data-barber">
            <h3 v-if="property.city">{{ city }}</h3>
            <input type="text" v-model="city" v-else />
            <img
              src="@/assets/images/pencil.svg"
              alt="change"
              @click.prevent="property.city = !property.city"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="deleteBarber">
      <button @click.prevent="DeleteBarber()">
        Quero Excluir minha barbearia
      </button>
    </div>
  </div>
</template>
<script>
import axios from '@/services/api.js';
import CurrentToken from '@/services/CurrentToken.js';
import { mask } from 'vue-the-mask';
export default {
  props: ['prop'],
  name: 'profile-barber',
  components: {
    Header: () => import('@/views/Header/HeaderBar.vue'),
  },
  data: () => ({
    salved: false,
    name: '',

    property: {
      name: true,
      cep: true,
      street: true,
      district: true,
      number: true,
      city: true,
    },
  }),
  created() {
    this.GetBarber();
  },
  computed: {
    id() {
      return this.$store.state.user.barber.id;
    },
  },
  methods: {
    async DeleteBarber() {
      try {
        const token = await CurrentToken.init();
        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.delete(`barber/${this.id}`, header);
        console.log(res);
        this.$router.push({
          path: '/criar-barbearia',
        });
      } catch (err) {
        console.log(err);
      }
    },
    async SearchCep() {
      this.$viaCep.buscarCep(`${this.cep}`).then(res => {
        this.street = res.logradouro;
        this.district = res.bairro;
        this.city = res.localidade;
      });
    },
    async changeData() {
      const data = {
        name: this.name,
        street: this.street,
        district: this.district,
        number: this.number,
        city: this.city,
        zip: this.cep,
      };
      const token = await CurrentToken.init();

      const header = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      try {
        const res = await axios.post(`barber/update/${this.id}`, data, header);
        console.log(res);
        this.salved = true;
        setTimeout(() => {
          this.salved = false;
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    },
    async GetBarber() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.get(`/barber/${this.id}`, header);
        console.log(res);
        this.name = res.data.barber.name;
        this.street = res.data.barber.street;
        this.district = res.data.barber.district;
        this.number = res.data.barber.number;
        this.cep = res.data.barber.zip;
        this.city = res.data.barber.city;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/index.scss';
.title {
  display: flex;
  justify-content: center;
  margin-top: 57px;

  h1 {
    color: $black;
  }
}
.informations {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 34vh;
  .data-info {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 50%;
    max-width: 50%;
  }
  .data {
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: relative;
    h2 {
      font-size: 18px;
      color: $black;
    }
    h3 {
      font-size: 18px;
    }
    img {
      width: 18px;
      position: absolute;
      top: 0;
      right: -34px;
      cursor: pointer;
    }
    button {
      position: absolute;
      top: -42px;
      right: -174px;
      cursor: pointer;
      @include button;
    }
  }
}
.deleteBarber {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
}
</style>
