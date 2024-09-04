import { Makings } from "@/component/makings";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-center">
        <Makings />
      </h1>
    </main>
  );
}
