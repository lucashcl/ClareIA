import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <h1 className="text-4xl font-bold text-foreground mb-4">404 - Resumo não encontrado</h1>
            <p className="text-lg text-muted-foreground mb-6">
            O resumo que você está procurando não existe ou foi removido.
            </p>
            <Link
            href="/resumos"
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
            >
            Voltar para resumos
            </Link>
        </div>
    );
}