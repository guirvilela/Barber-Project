<template>
  <div>
    <Header />
    <component :is="componentId"></component>
  </div>
</template>
<script>
export default {
  props: ['active'],
  components: {
    Header: () => import('@/views/Header/HeaderBar.vue'),
    CreateAccount: () =>
      import('@/components/HandleUser/CreateAccount/CreateAccount.vue'),
    Login: () => import('@/components/HandleUser/UserLogin/Login.vue'),
    Register: () =>
      import('@/components/Barber/RegisterBarber/RegisterBarber.vue'),
    RegisterHair: () =>
      import('@/components/Barber/RegisterHair/RegisterHair.vue'),
  },
  data: () => ({
    componentId: 'Login',
  }),

  created() {
    this.Components(this.active);
  },
  methods: {
    Components(active) {
      let comp = active;
      switch (comp) {
        case 1:
          return (this.componentId = 'Login');
          break;
        case 2:
          return (this.componentId = 'CreateAccount');
          break;
      }
    },
  },
};
</script>
