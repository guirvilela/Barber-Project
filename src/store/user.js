import axios from "axios";
import Vue from "vue";
import * as Cookies from "js-cookie";

export default {
    namespaced: true,
    state: {
        error: {},
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
        SET_LOGO(state, payload) {
            state.userStore.client.logo = payload;
        },
        ALTER_CLIENT(state, payload) {
            Vue.set(state, "userStore", payload);
        },
        DESTROY_CLIENT(state, payload) {
            Vue.set(state, "userStore", payload);
        },
        SET_CLIENT(state, payload) {
            state.userStore.client = payload;
            state.userStore.client_id = payload.id;
        },
        ERROR_RESPONSE(state, payload) {
            state.error = payload;
        }
    },
    actions: {
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
                    client: res.data.user.client,
                    client_id: res.data.user.client_id,
                    email: res.data.user.email,
                    id: res.data.user.id,
                    lastname: res.data.user.lastname,
                    name: res.data.user.name,
                    phone: res.data.user.phone
                };
                Cookies.set("@Access:token", res.data.user.access_token, {
                    expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000)
                });
                Cookies.set("@Refresh:token", res.data.user.refresh_token, {
                    expires: 15
                });
                // new Date(new Date().getTime() + 30 * 60 * 1000)
                Cookies.set("@Auth:user", true, {
                    expires: 15
                });
                commit("ALTER_CLIENT", data);
                commit("DESTROY_CLIENT", data);
                callback();
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
                await axios.post("/user", data);
                // const user = {
                //   avatar: res.data.user.avatar,
                //   client_id: res.data.user.client_id,
                //   email: res.data.user.email,
                //   id: res.data.user.id,
                //   lastname: res.data.user.lastname,
                //   name: res.data.user.name,
                //   phone: res.data.user.phone
                // };
                // Cookies.set("@Access:token", res.data.user.access_token, {
                //   expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000)
                // });
                // Cookies.set("@Refresh:token", res.data.user.refresh_token, {
                //   expires: 15
                // });
                // Cookies.set("@Auth:user", true, {
                //   expires: 15
                // });
                // commit("ALTER_CLIENT", user);
                callback();
            } catch (err) {
                commit("ERROR_RESPONSE", err.response.data);
            }
        },
        destroy({
            commit
        }, {
            data,
            callback
        }) {
            commit("DESTROY_CLIENT", data);
            Cookies.remove("@Auth:user");
            Cookies.remove("@Access:token");
            Cookies.remove("@Refresh:token");
            callback();
        }
    }
};