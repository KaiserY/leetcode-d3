import { defineConfig } from "vitepress";

export default defineConfig({
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],
    sidebar: [],
  },
});
