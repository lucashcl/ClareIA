import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Button asChild>
        <Link href="/upload">Entrar</Link>
      </Button>
    </main>
  );
}
