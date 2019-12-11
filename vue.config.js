const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");

module.exports = {
    configureWebpack: {
        cache: false,
        plugins: [
            new PrerenderSPAPlugin({
                // Required - The path to the webpack-outputted app to prerender.
                staticDir: path.join(__dirname, "dist"),
                // Required - Routes to render.
                routes: [
                    "/",
                    "/fazer-login",

                ]
            })
        ]
        // publicPath: process.env.NODE_ENV === "production" ? "/dist/" : "/"
    },

    pluginOptions: {
      prerenderSpa: {
        registry: undefined,
        renderRoutes: [
          '/'
        ],
        useRenderEvent: true,
        headless: true,
        onlyProduction: true
      }
    }
};
