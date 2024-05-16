import { defineConfig } from "codegem";
import { Ctx, FileType } from "codegem/build/type";
import path from "path";
import fse from "fs-extra";
import { satisfies } from "compare-versions";

export default defineConfig({
  // output: "src/fnStore", // 根目录;所有生成文件统一生成在这个目录下
  factory: [
    {
      name: "fnStore",
      use: [loadFnStore(), loadFnMeta()],
      machine: createFn as any,
    },
  ],
});

function loadFnStore() {
  return async (_: Ctx) => {
    const response = await fetch("https://function-store.zeabur.app/api/meta");
    const result = await response.json();
    if (result.errorCode === 0) {
      return result.data;
    }
    return [];
  };
}

function loadFnMeta() {
  return async (_: Ctx) => {
    const _module = await import(path.join(process.cwd(), "src/fnStore/packages.json"), {
      assert: { type: "json" },
    });
    console.log("loadFnMeta", _module.default);
    return _module.default;
  };
}

type MetaList = {
  filename: string;
  directory: string;
  code: string;
  version: string;
  description: string;
}[];
function createFn([metaList, components]: [MetaList, Record<string, string>]): FileType[] {
  console.log(metaList);
  const root = path.join(process.cwd(), "src/fnStore");
  fse.ensureDirSync(root);

  return metaList
    .filter((item) => {
      const name = Object.keys(components).find((it) => new RegExp(it).test(item.filename)) as
        | keyof typeof components
        | undefined;
      return name && satisfies(item.version, components[name]);
    })
    .map((item) => {
      return {
        pathname: path.join(root, item.directory, item.filename),
        code: item.code,
      };
    });
}
