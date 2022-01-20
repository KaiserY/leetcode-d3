import { defineConfig } from "vitepress";

export default defineConfig({
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    nav: [],
    sidebar: [
      { text: "Home", link: "/" },
      { text: "1. Two Sum", link: "/leetcode/p1.html" },
      { text: "2. Add Two Numbers", link: "/leetcode/p2.html" },
    ],
  },
});
