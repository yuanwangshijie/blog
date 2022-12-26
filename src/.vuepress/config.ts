import {defineUserConfig} from "vuepress";
import theme from "./theme.js";
import {searchProPlugin} from "vuepress-plugin-search-pro";

export default defineUserConfig({
    lang: "zh-CN",
    title: "远望世界' Blog",
    theme,
    shouldPrefetch: false,
    plugins: [
        // 搜索插件，开销较大
        searchProPlugin({indexContent: true,}),
    ],
});
