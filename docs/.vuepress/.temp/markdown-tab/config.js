import { CodeTabs } from "G:/react/前端编码规范工程化/demo/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.66_markdown-it@14.1.0_typescript@5.7.2_vuepress@2.0.0-_pcjjhwfeubxgfzw7mzs6o345oy/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "G:/react/前端编码规范工程化/demo/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.66_markdown-it@14.1.0_typescript@5.7.2_vuepress@2.0.0-_pcjjhwfeubxgfzw7mzs6o345oy/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "G:/react/前端编码规范工程化/demo/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.66_markdown-it@14.1.0_typescript@5.7.2_vuepress@2.0.0-_pcjjhwfeubxgfzw7mzs6o345oy/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
