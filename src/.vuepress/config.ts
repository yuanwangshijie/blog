import {defineUserConfig} from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
    lang: "zh-CN",
    title: "远望世界' Blog",
    theme,
    shouldPrefetch: false,
});
