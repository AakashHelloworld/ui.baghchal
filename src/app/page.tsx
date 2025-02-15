import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link href="/game"><button >Go to Game</button></Link>
    </main>
  );
}
