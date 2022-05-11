import { defaultTheme, viteBundler } from "vuepress";
import { defineUserConfig } from "@vuepress/cli";

export default defineUserConfig({
  // site config
  lang: "en-US",
  title: "LeetCode D3",
  description: "LeetCode D3",

  base: "/leetcode-d3/",

  head: [["link", { rel: "icon", href: "/favicon.ico" }]],

  // theme and its config
  theme: defaultTheme({
    themeConfig: {
      logo: "/logo.png",
    },
  }),

  // when using vuepress-vite package, you can omit this field
  // because vite is the default bundler
  bundler: viteBundler({
    viteOptions: {
      root: "docs",
      optimizeDeps: {
        include: ["vue"],
      },
      // @ts-expect-error Invalid types can be ignored
      ssr: {
        noExternal: ["d3", "d3-drag", "d3-force", "d3-selection", "d3-zoom"],
      },
    },
  }),
});
