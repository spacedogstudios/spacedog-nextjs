export const runtime = "edge";

import Image from "next/image";

export default function Page() {
  return (
    <main className="h-screen max-w-7xl mx-auto py-24 px-16">
      <h1 className="text-5xl md:text-7xl text-white pb-8">Top Secret</h1>
      <div className="w-full max-w-7xl aspect-video relative">
        <Image src="topsecret.jpg" alt="Top Secret" fill />
      </div>
    </main>
  );
}
