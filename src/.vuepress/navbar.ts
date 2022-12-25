import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    "/",
    {
        text: "演示",
        icon: "discover",
        link: "/demo/"
    },
    {
        text: "文档",
        icon: "edit",
        prefix: "/md/",
        children: ["日记", "Docker常用命令整理", "MarkDown学习笔记", "MybatisPlus条件构造器", "Nginx详细教程"],
    },
    {
        text: "博文",
        icon: "edit",
        prefix: "/posts/",
        children: [
            {
                text: "苹果",
                icon: "edit",
                prefix: "apple/",
                children: ["1", "2", "3", "4"],
            },
            {
                text: "香蕉",
                icon: "edit",
                prefix: "banana/",
                children: ["1", "2", "3", "4"],
            },
            {
                text: "樱桃",
                icon: "edit",
                link: "cherry"
            },
            {
                text: "火龙果",
                icon: "edit",
                link: "dragonfruit"
            },
            "tomato",
            "strawberry",
        ],
    },
    {
        text: "V2 文档",
        icon: "note",
        link: "https://vuepress-theme-hope.github.io/v2/",
    },
]);
