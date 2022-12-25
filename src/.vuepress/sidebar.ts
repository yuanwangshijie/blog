import {sidebar} from "vuepress-theme-hope";

export const zhSidebar = sidebar([
    "/",
    {
        text: "演示",
        icon: "discover",
        prefix: "/demo/",
        link: "/demo/page",
        children: ["page", "markdown", "encrypt", "disable",],
    },
    {
        text: "文章",
        icon: "note",
        prefix: "/md/",
        link: "/md/MarkDown学习笔记",
        children: ["MarkDown学习笔记", "Docker常用命令整理", "MybatisPlus条件构造器", "Nginx详细教程"],
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
