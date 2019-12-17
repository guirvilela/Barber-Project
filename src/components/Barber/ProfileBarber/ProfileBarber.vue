<template>
  <div>
    <Header />
    <div class='title'>
      <h1 style="text-transform: capitalize">{{name}}</h1>
    </div>
    <div class='config'>
      <router-link to="/perfil-barbearia/configuracoes">Configurações</router-link>
    </div>
    <div class='informations'>
        
        <div class='list-barber'>
        <h2>Aqui Estão todos seus barbeiros</h2>
        <div class='field-barber'>
        <Barbers
        v-for='hair in names '
        :key="hair.id"
        :name='hair.name'
        />
        <button @click.prevent="$router.push({path: '/cadastro-barbeiro'})">Adicionar Barbeiro</button>
        </div>
        </div>
        <div class='list-notify'>
            <h2>Aqui ficarão os horários que os clientes marcaram</h2> 
            <Mark
        
            />
        </div>
    </div>
  </div>
</template>
<script>
import axios from '@/services/api.js';
import CurrentToken from '@/services/CurrentToken.js';
export default {
  name: 'profile-barber',
  components: {
    Header: () => import('@/views/Header/HeaderBar.vue'),
    Barbers: () => import('@/components/Barber/ProfileBarber/ButtonBarber/ButtonBarber.vue'),
    Mark: () => import('@/components/Barber/ProfileBarber/ButtonMark/ButtonMark.vue')
  },
  data: () => ({
    names: '',
    name: '',
   
  }),
  
  computed:{
    id(){
      return this.$store.state.user.barber.id
    },
    barber(){
      return this.$store.state.user.barber
    }
  },
  created() {
    this.GetInfo();
    this.GetBarber()
  },
  methods: {
    async GetInfo() {
      try {
        
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.get('/hairdresser', header);
        this.names = res.data.hairdressers.data
      } catch (err) {
        console.log(err);
      }
    },
    async GetBarber(){
      try {
        const token = await CurrentToken.init();

        const header = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const res = await axios.get(`/barber/${this.id}`, header);
        this.name = res.data.barber.name;
        console.log('ASDASD', res)
        
      } catch (err) {
        console.log('asd',err)
         this.$router.push({
            path: ('/cadastrar-barbearia')
          })
        if (err.response.data.message.match(/Unauthenticated/)) {
         
        };
      }
    }
  },
  
 
};
</script>
<style lang="scss" src='./style.scss'>
