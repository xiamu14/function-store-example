import { useMount } from "~fnStore/hooks/mount";
import Button from "~fnStore/components/button";

export default function Home() {
  useMount(() => {
    console.log("once excute");
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>查看全部组件</Button>
    </main>
  );
}
