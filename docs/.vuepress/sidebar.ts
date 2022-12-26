import {sidebar} from "vuepress-theme-hope";

export const zhSidebar = sidebar([
    "/",
    "/md/日记",
    {
        text: "文章",
        icon: "note",
        prefix: "/md/",
        children: ["Docker常用命令整理", "MarkDown学习笔记", "MybatisPlus条件构造器", "Nginx详细教程"],
    },
    {
        text: "主题文档",
        icon: "note",
        link: "https://vuepress-theme-hope.github.io/v2/zh/",
    },
]);
