import { defineConfig } from "codegem";
import { loadFnStore, createFnStore } from "codegem-plugin-fnstore";

export default defineConfig({
  // output: "src/fnStore", // 根目录;所有生成文件统一生成在这个目录下
  factory: [
    {
      name: "fnStore",
      use: [loadFnStore()],
      machine: createFnStore,
    },
  ],
});
