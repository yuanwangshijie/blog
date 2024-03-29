import {navbar, sidebar} from "vuepress-theme-hope";

export const bar = [
    "/",
    "/notes/日记",
    {
        text: "学习笔记",
        icon: "note",
        prefix: "/notes/",
        children: [
            {
                text: "工具",
                icon: "tool",
                prefix: "工具/",
                children: [
                    "随机图片api接口",
                    "好用的Docker应用汇总",
                ]
            },
            {
                text: "教程",
                icon: "read",
                prefix: "教程/",
                children: [
                    "CSS3毛玻璃效果",
                    "Docker常用命令整理",
                    "MarkDown学习笔记",
                    "MybatisPlus条件构造器",
                    "Nginx详细教程",
                    "NPM与XUI共存",
                ]
            },
        ],
    },
    {
        text: "主题文档",
        icon: "link",
        link: "https://vuepress-theme-hope.github.io/v2/zh/",
    },
]

export const myNavbar = navbar(bar);

export const mySidebar = sidebar(bar);
