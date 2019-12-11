<template>
  <div class="login">
    <div class="hair">
      <h1>
        Adicione os Barbeiros e seus horários
      </h1>

      <div class="all">
        <form class="fields" autocomplete="off">
          <div class="upload">
            <img
              v-if="selectedFile == '' || selectedFile == null"
              :src="require('@/assets/images/profile.png')"
              alt="Foto perfil"
              width="60"
            />
            <img
              v-else
              :src="selectedFile"
              alt="Foto de perfil"
              class="photo-profile"
              :class="{ 'delete-photo': event.delete }"
            />
            <label for="p-upload" @change="fileSelect">
              <input type="file" id="p-upload" style="display: none;" />
              <div class="add-photo">Add</div>
            </label>
            <p
              class="delete-photo-client"
              v-if="selectedFile != null"
              @click.prevent="deletePhoto()"
            >
              Excluir Foto
            </p>
          </div>
          <div class="inputs">
            <label for="name">Nome</label>
            <div style="position: relative" class="field-name">
              <input type="text" id="name" v-model="name" />
              <p v-if="$v.name.$error">Campo Obrigatório</p>
            </div>
          </div>
          <div class="hours-barber">
            <label for="check"
              >Adicione os horários disponíveis de {{ name }}</label
            >
            <div class="hour">
              <ul v-for="(checks, index) in check" :key="index">
                <li>
                  <input type="checkbox" id="check" v-model="checks.active" />{{
                    checks.horario
                  }}
                </li>
              </ul>
            </div>
          </div>

          <div class="send">
            <a @click.prevent="$parent.Components(4)">Cancelar</a>
            <button
              @click.prevent="$v.$invalid ? $v.$touch() : $parent.Components(5)"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators';
import { mask } from 'vue-the-mask';
import axios from 'axios';
export default {
  name: 'login',

  data: () => ({
    event: {
      delete: false,
    },
    selectedFile: '',
    name: '',
    check: [
      {
        horario: '08:00',
        active: false,
      },
      {
        horario: '09:00',
        active: false,
      },
      {
        horario: '10:00',
        active: false,
      },
      {
        horario: '11:00',
        active: false,
      },
      {
        horario: '12:00',
        active: false,
      },
      {
        horario: '13:00',
        active: false,
      },
      {
        horario: '14:00',
        active: false,
      },
      {
        horario: '15:00',
        active: false,
      },
      {
        horario: '16:00',
        active: false,
      },
      {
        horario: '17:00',
        active: false,
      },
      {
        horario: '18:00',
        active: false,
      },
    ],
  }),

  validations: {
    name: { required },
  },

  created() {
    console.log(this.check);
  },
  methods: {
    async SearchCep() {
      this.$viaCep.buscarCep(`${this.cep}`).then(res => {
        this.location = res.logradouro;
        this.district = res.bairro;
        this.city = res.localidade;
        this.uf = res.uf;
      });
    },

    async fileSelect(event) {
      let formData = new FormData();

      setTimeout(() => {
        this.selectedFile = URL.createObjectURL(event.target.files[0]);
      }, 400);

      formData.append('avatar', event.target.files[0]);

      // const token = await CurrentToken.init();

      // const header = {
      //   headers: {
      //     Authorization: 'Bearer ' + token,
      //   },
      // };

      // try {
      //   const res = await axios.post("/user/update", formData, header);

      //   this.setAvatar(res.data.user.avatar);
      //   this.$store.state.user.userStore.avatar = this.selectedFile;
      // } catch (err) {
      //   console.log("Não Deu", err);
      // }
    },
    async deletePhoto() {
      // const token = await CurrentToken.init();
      // const header = {
      //   headers: {
      //     Authorization: 'Bearer ' + token,
      //   },
      // };
      // try {
      //   const res = await axios.delete("/user/media/delete", header);
      //   console.log("Deu", res);
      //   this.event.delete = true;
      //   setTimeout(() => {
      //     this.$store.state.user.userStore.avatar = null;
      //     this.selectedFile = null;
      //     this.event.delete = false;
      //   }, 2000);
      // } catch (err) {
      //   console.log("nao deu", err);
      // }
    },
  },
};
</script>

<style lang="scss">
.hair {
  max-width: 400px;
  width: 400px;
  h1 {
    text-transform: none;
  }
}
.distric-number {
  display: flex;

  .field-district {
    flex: 0 0 49%;
    margin-right: 10px;
  }
}
.hour {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;

  ul {
    list-style-type: none;
    margin-right: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
    li {
      align-items: center;
      display: flex;
      input {
        margin-right: 5px;
      }
    }
  }
}
.field-name {
  input {
    margin-bottom: 23px !important ;
  }
}

.upload {
  margin: 0 auto;
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
  margin-bottom: 30px;

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
