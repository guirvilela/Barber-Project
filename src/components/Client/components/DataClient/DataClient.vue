<template>
  <div class="personal-data">
    <div class="upload">
      <img
        v-if="selectedFile == '' || selectedFile == null"
        :src="require('@/assets/images/profile.png')"
        alt="Foto perfil"
        width="60"
      />
      <img
        v-else
        :src="selectedFile.replace('localhost:8000', '192.168.15.12')"
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
    <div class="date total">
      <h3>Sua conta foi criada dia:</h3>
      <span>{{ $date(new Date(), 'DD/MM/YYYY') | createdAt }}</span>
    </div>
    <div class="name total">
      <h3>Nome:</h3>
      <span>{{ userName }}</span>
    </div>
    <div class="email total">
      <h3>Email:</h3>
      <span>{{ userEmail }}</span>
    </div>
  </div>
</template>
<script>
import axios from '@/services/api.js';
import CurrentToken from '@/services/CurrentToken.js';
import * as Cookies from 'js-cookie';
import { dateFilter } from 'vue-date-fns';
import { mapMutations } from 'vuex';
export default {
  name: 'data-client',

  computed: {
    id() {
      return this.$store.state.user.userStore.id;
    },
  },
  data: () => ({
    userName: '',
    userEmail: '',
    createdAt: '',
    selectedFile: '',
  }),

  created() {
    this.GetUser();
  },

  methods: {
    ...mapMutations({
      setAvatar: 'user/SET_AVATAR',
    }),

    async GetUser() {
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.get(`/user/${this.id}`, header);
        this.userName = res.data.user.name;
        this.userEmail = res.data.user.email;
        this.createdAt = res.data.user.created_at;
        this.selectedFile = res.data.user.avatar;
        console.log('PUXOU', res);
      } catch (err) {
        console.log(err);
      }
    },

    async fileSelect(event) {
      let formData = new FormData();
      setTimeout(() => {
        this.selectedFile = URL.createObjectURL(event.target.files[0]);
      }, 400);

      formData.append('avatar', event.target.files[0]);

      const token = await CurrentToken.init();

      const header = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      try {
        const res = await axios.post('/user/update', formData, header);
        this.setAvatar(res.data.user.avatar);
        this.$store.state.user.userStore.avatar = this.selectedFile;
        console.log('DEU', res);
      } catch (err) {
        console.log('Não Deu', err);
      }
    },
  },
};
</script>
<style lang="scss">
.personal-data {
  padding: 0 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  margin: 30px 0;

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
