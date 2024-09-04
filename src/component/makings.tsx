"use cliente";
import { getMaking } from "@/http/get-maiking";

export async function Makings() {
  const { makings } = await getMaking();
  console.log(makings);
  return (
    <div>
      <h1>Makings</h1>
      <ul>
        <h1>test</h1>
      </ul>
    </div>
  );
}
