import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    "/",
    {
        text: "演示",
        icon: "discover",
        prefix: "/demo/",
        children: ["markdown", "page", "disable", "encrypt"],
    },
    {
        text: "文章",
        icon: "note",
        prefix: "/md/",
        children: ["Docker常用命令整理", "MarkDown学习笔记", "MybatisPlus条件构造器", "Nginx详细教程"],
    },
    {
        text: "日记",
        icon: "note",
        link: "/md/日记",
    },
    {
        text: "V2 文档",
        icon: "note",
        link: "https://vuepress-theme-hope.github.io/v2/",
    },
]);
