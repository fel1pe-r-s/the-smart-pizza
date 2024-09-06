import { Home, Pizza, Utensils } from "lucide-react";
import { Separator } from "./ui/separator";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/" className="flex gap-2 items-center">
            <Home className="h-4 w-4" />
            Estoque
          </Link>
          <Link href="/order" className="flex gap-2 items-center">
            <Utensils className="h-4 w-4" />
            Pedidos
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
