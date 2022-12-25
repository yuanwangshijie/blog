import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "远望世界' Blog",
      description: "作者自用博客，用于学习记录",
    }
  },
  theme,
  shouldPrefetch: false,
});
