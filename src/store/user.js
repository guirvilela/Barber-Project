import axios from '@/services/api.js';
import Vue from "vue";
import * as Cookies from "js-cookie";
import CurrentToken from '@/services/CurrentToken.js';

export default {
    namespaced: true,
    state: {
        error: {},
        barber: null,
        userStore: null
    },
    getters: {
        getState: state => {
            return state;
        }
    },
    mutations: {
        SET_AVATAR(state, payload) {
            state.userStore.avatar = payload;
        },
        CHANGE_USER(state, payload) {
            Vue.set(state, "userStore", payload);
        },
        ALTER_BARBER(state, payload) {
            Vue.set(state, 'barber', payload)
        },
        DESTROY_BARBER(state, payload) {
            Vue.set(state, "barber", payload);
        },
        DESTROY_CLIENT(state, payload) {
            Vue.set(state, "userStore", payload);
        },
        ERROR_RESPONSE(state, payload) {
            state.error = payload;
        }
    },
    actions: {
        async barber({
            commit
        }, {
            barber,
            callback
        }) {
            try {
                const token = await CurrentToken.init();

                const header = {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                };
                const res = await axios.post('/barber', barber, header);
                console.log(res)

                const data = {
                    name: res.data.barber.name,
                    street: res.data.barber.street,
                    district: res.data.barber.district,
                    number: res.data.barber.number,
                    city: res.data.barber.city,
                    zip: res.data.barber.zip,
                    id: res.data.barber.id
                };
                commit('ALTER_BARBER', data);
                callback()
            } catch (err) {
                console.log('ERROR_RESPONSE', err)
            }
        },
        async login({
            commit
        }, {
            user,
            callback
        }) {
            try {
                const res = await axios.post("/auth", user);

                const data = {
                    avatar: res.data.user.avatar,
                    email: res.data.user.email,
                    id: res.data.user.id,
                    name: res.data.user.name,
                    barber: res.data.user.barber,
                };

                Cookies.set("@Access:token", res.data.access_token, {
                    expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000)
                });
                Cookies.set("@Refresh:token", res.data.refresh_token, {
                    expires: 15
                });
                // new Date(new Date().getTime() + 30 * 60 * 1000)
                Cookies.set("@Auth:user", true, {
                    expires: 15
                });
                commit("CHANGE_USER", data);
                commit("DESTROY_CLIENT", data);
                callback();
                console.log(res)
            } catch (err) {
                commit("ERROR_RESPONSE", err.response.data);
            }
        },
        async store({
            commit
        }, {
            data,
            callback
        }) {
            try {
                const res = await axios.post("/user", data);
                console.log(res)
                const user = {
                    avatar: res.data.user.avatar,
                    email: res.data.user.email,
                    id: res.data.user.id,
                    name: res.data.user.name,
                    barber: res.data.user.barber,
                    access: res.data.access_token,
                };
                Cookies.set("@Access:token", res.data.access_token, {
                    expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000)
                });
                Cookies.set("@Refresh:token", res.data.refresh_token, {
                    expires: 15
                });
                Cookies.set("@Auth:user", true, {
                    expires: 15
                });
                commit("CHANGE_USER", user);

                callback();
            } catch (err) {
                commit("ERROR_RESPONSE", err);
            }
        },
        destroy({
            commit
        }, {
            data,
            callback
        }) {
            commit('DESTROY_BARBER', data)
            commit("DESTROY_CLIENT", data);
            Cookies.remove("@Auth:user");
            Cookies.remove("@Access:token");
            Cookies.remove("@Refresh:token");
            callback();
        }
    }
};