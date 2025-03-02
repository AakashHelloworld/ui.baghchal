import { useSound } from "@/context/SoundContext";
import { Volume2, VolumeX } from "lucide-react";

export function SoundToggler() {
  const { isPlaying, toggleBackgroundMusic } = useSound();

  return (
    <div className="absolute bottom-5 left-5 bg-[url(/audio_wooden.png)] w-[10rem] h-[10rem] flex justify-center items-center bg-center bg-cover p-3 rounded-full cursor-pointer">
      <button
        onClick={() => toggleBackgroundMusic()}
        className="bg-transparent mt-[-1rem]"
      >
        {!isPlaying ? (
          <VolumeX
            size={44}
            color="black"
          />
        ) : (
          <Volume2
            size={44}
            color="black"
          />
        )}
      </button>
    </div>
  );
}
