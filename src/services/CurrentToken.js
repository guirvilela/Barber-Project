import axios from '@/services/api.js';
import * as Cookies from "js-cookie";

class CurrentToken {
    async init() {
        if (Cookies.get("@Access:token") === undefined) {
            await this.update(Cookies.get("@Refresh:token"));
        }
        return Cookies.get("@Access:token");
    }

    async update(token) {
        try {
            const res = await axios.put("/auth", {
                refresh_token: token
            });

            Cookies.set("@Access:token", res.data.user.access_token, {
                expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000)
            });
            Cookies.set("@Refresh:token", res.data.user.refresh_token, {
                expires: 15
            });
            Cookies.set("@Auth:user", true, {
                expires: 15
            });
        } catch (err) {
            Cookies.remove("@Auth:user");
            Cookies.remove("@Access:token");
            Cookies.remove("@Refresh:token");
        }
    }
}

// eslint-disable-next-line new-cap
export default new CurrentToken();