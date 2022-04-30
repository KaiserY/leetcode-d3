import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  // site config
  lang: "en-US",
  title: "LeetCode D3",
  description: "LeetCode D3",

  base: "/",

  head: [["link", { rel: "icon", href: "/favicon.ico" }]],

  // theme and its config
  theme: "@vuepress/theme-default",
  themeConfig: {
    logo: "/logo.png",
  },

  // when using vuepress-vite package, you can omit this field
  // because vite is the default bundler
  bundler: "@vuepress/bundler-vite",
  // options for vite bundler
  bundlerConfig: {
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
  },
});
