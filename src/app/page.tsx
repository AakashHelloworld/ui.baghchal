"use client";
import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Modal from "@/components/shared/Modal";
import Option from "./game/_components/Option";
import Link from "next/link";
export default function Home() {
  const [muted, setMuted] = useState<boolean>(false);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (clickAudioRef.current) {
      clickAudioRef.current.volume = 0.5; // Set volume to a low level
    }
  }, []);



  return (
    <main className="flex min-h-screen flex-col justify-end  p-24 bg-[url(/BaghChal.jpg)] relative overflow-hidden scroll-hidden">
      {/* Click Sound */}
      <audio ref={clickAudioRef} src="/click-sound.mp3" preload="auto" />

      <div className="flex flex-col self items-center justify-center space-y-5">
      <Link href="/game">
      <button
        className="w-[26rem]  h-[8rem] text-[#000] text-[2rem] translate-x-8 translate-y-4 text-4xl p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover  hover:translate-y-2"
        
      >
        Mutilple Player
      </button>

      </Link>

      <button
        className="w-[26rem]  h-[8rem] text-[#000] text-[2rem] translate-x-8 translate-y-4 text-4xl p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover  hover:translate-y-2"
        
      >
        Play with AI as Tiger
      </button>

      <button
        className="w-[26rem]  h-[8rem] text-[#000] text-[2rem] translate-x-8 translate-y-4 text-4xl p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover  hover:translate-y-2"
        
      >
        Play with AI as Goat
      </button>

      </div>


      {/* Mute Button */}
      <div className="absolute bottom-5 left-5 bg-[url(/audio_wooden.png)]  w-[15rem] h-[15rem] flex justify-center items-center bg-center bg-cover p-3 rounded-full cursor-pointer" >
        <button
        onClick={() => setMuted(!muted)}
        className="bg-transparent mt-[-2rem]"
      >
        {muted ? <VolumeX size={64} color="black" /> : <Volume2 size={64} color="black" />}
      </button>
      </div>

    </main>
  );
}
