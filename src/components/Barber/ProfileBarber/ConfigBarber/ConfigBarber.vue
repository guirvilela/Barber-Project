<template>
  <div>
    <Header />
    <router-link to="/perfil-barbearia"> Voltar</router-link>
    <div class="title">
      <h1>Configurações da sua Barbearia</h1>
    </div>
    <div class="add-photo">
      <div class="add-text">
        <h2>Adicionar uma foto para sua Barbearia</h2>
      </div>
      <div class="upload">
        <img
          v-if="selectedFile == '' || selectedFile == null"
          :src="require('@/assets/images/profile.png')"
          alt="Foto perfil"
          width="60"
        />
        <img
          v-else
          :src="selectedFile.replace('localhost:8000', '192.168.15.12:8000')"
          alt="Foto de perfil"
          class="photo-profile"
        />
        <label for="p-upload" @change="fileSelect">
          <input type="file" id="p-upload" style="display: none;" />
          <div class="add-photo">Add</div>
        </label>
        <!-- <p
        class="delete-photo-client"
        v-if="selectedFile != null"
        @click.prevent="deletePhoto()"
      >
        Excluir Foto
      </p> -->
      </div>
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
import { mapActions, mapMutations } from 'vuex';
export default {
  props: ['prop'],
  name: 'profile-barber',
  components: {
    Header: () => import('@/views/Header/HeaderBar.vue'),
  },
  data: () => ({
    salved: false,
    name: '',
    selectedFile: '',
    name: '',
    cep: '',
    district: '',
    street: '',
    number: '',
    city: '',
    idBarber: '',

    property: {
      name: true,
      cep: true,
      street: true,
      district: true,
      number: true,
      city: true,
    },
  }),
  computed: {
    idUser() {
      return this.$store.state.user.userStore.id;
    },
  },
  created() {
    this.getBarberLogin();
  },

  methods: {
    ...mapMutations({
      setLogo: 'user/SET_LOGO',
    }),
    ...mapActions({
      destroySession: 'user/destroy',
    }),

    async getBarberLogin() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.get(`user/${this.idUser}`, header);
        this.idBarber = res.data.barber.id;

        this.GetBarber();
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
        const res = await axios.get(`/barber/${this.idBarber}`, header);

        this.selectedFile = res.data.barber.logo;
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
    async fileSelect(event) {
      let formData = new FormData();
      setTimeout(() => {
        this.selectedFile = URL.createObjectURL(event.target.files[0]);
      }, 400);

      formData.append('logo', event.target.files[0]);

      const token = await CurrentToken.init();

      const header = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      try {
        const res = await axios.post(
          `barber/update/${this.idBarber}`,
          formData,
          header,
        );
        this.setLogo(res.data.barber.logo);
        this.$store.state.user.barber.logo = this.selectedFile.replace(
          'localhost:8000',
          '192.168.15.12:8000',
        );
      } catch (err) {
        console.log('Não Deu', err);
      }
    },
    async DeleteBarber() {
      try {
        const token = await CurrentToken.init();
        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.delete(`barber/${this.idBarber}`, header);
        this.destroy();
      } catch (err) {
        console.log(err);
      }
    },
    destroy() {
      this.destroySession({
        data: {},
        callback: () => {
          this.$router.push({
            path: '/fazer-login',
          });
        },
      });
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
        logo: this.selectedFile,
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
        const res = await axios.post(
          `barber/update/${this.idBarber}`,
          data,
          header,
        );

        this.salved = true;
        setTimeout(() => {
          this.salved = false;
        }, 3000);
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
  button {
    @include button;
  }
}
.add-photo {
  .add-text {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
}
.upload {
  margin: 20px auto;
  align-self: center;
  width: 110px;
  height: 110px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img.photo-profile {
    object-fit: contain;
    width: 100%;
    border-radius: 50%;
    height: 100%;
  }

  label[for='p-upload'] {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;

    img {
      width: 38px;
      object-fit: cover;
    }
  }

  .spinn-delete {
    position: absolute;
    top: 57px;
    left: 57px;
    opacity: 100% !important;
  }

  .delete-photo-client {
    position: absolute;
    bottom: -35px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .add-photo {
    background: blue;
    border-radius: 50%;
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 2px 4px #2e97ff73;
  }
}
</style>
