import { defineConfig } from "codegem";
import { Ctx, FileType } from "codegem/build/type";
import path from "path";
import fse from "fs-extra";
export default defineConfig({
  // output: "src/fnStore", // 根目录;所有生成文件统一生成在这个目录下
  factory: [
    {
      name: "fnStore",
      use: [loadFnStore()],
      machine: createFn,
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

function createFn(
  metaList: {
    filename: string;
    directory: string;
    code: string;
    version: string;
    description: string;
  }[][],
): FileType[] {
  console.log(metaList);
  const root = path.join(process.cwd(), "src/fnStore");
  fse.ensureDirSync(root);

  return metaList?.[0].map((item) => {
    return {
      pathname: path.join(root, item.directory, item.filename),
      code: item.code,
    };
  });
}
