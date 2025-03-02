"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Howl } from "howler";

interface SoundContextType {
  toggleBackgroundMusic: () => void;
  playClick: () => void;
  playTigerSound: () => void;
  playGoatSound: () => void;
  playGoatMoveSound: () => void;
  playTigerWinSound: () => void;
  isPlaying: boolean;
}

// Create the context
const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const backgroundMusicRef = useRef<Howl | null>(null);
  const clickSoundRef = useRef<Howl | null>(null);
  const tigerSoundRef = useRef<Howl | null>(null);
  const goatSoundRef = useRef<Howl | null>(null);
  const goatMoveSoundRef = useRef<Howl | null>(null);
  const tigerWinSoundRef = useRef<Howl | null>(null);

  // Function to play click sound
  const playClick = () => {
    if (!clickSoundRef.current) return;

    if (isPlaying) {
      clickSoundRef.current.play();
    } else {
      clickSoundRef.current.stop();
    }
  };

  const playGoatMoveSound = () => {
    if (!goatMoveSoundRef.current) return;

    if (isPlaying) {
      goatMoveSoundRef.current.play();
    } else {
      goatMoveSoundRef.current.stop();
    }
  };

  const playTigerWinSound = () => {
    if (!tigerWinSoundRef.current) return;

    if (isPlaying) {
      tigerWinSoundRef.current.play();
    } else {
      tigerWinSoundRef.current.stop();
    }
  };

  const playTigerSound = () => {
    if (!tigerSoundRef.current) return;

    if (isPlaying) {
      tigerSoundRef.current.play();
    } else {
      tigerSoundRef.current.stop();
    }
  };

  const playGoatSound = () => {
    if (!goatSoundRef.current) return;

    if (isPlaying) {
      goatSoundRef.current.play();
    } else {
      goatSoundRef.current.stop();
    }
  };

  // // Function to play success sound
  // const playSuccess = () => successSound.play();

  // Function to toggle background music
  const toggleBackgroundMusic = () => {
    if (!backgroundMusicRef.current) return;

    if (isPlaying) {
      backgroundMusicRef.current.stop();
    } else {
      backgroundMusicRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    backgroundMusicRef.current = new Howl({
      src: ["/sounds/gamesound.mp3"],
      volume: 0.5,
      loop: true,
      autoplay: true,
    });

    backgroundMusicRef.current.play();

    return () => {
      backgroundMusicRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    clickSoundRef.current = new Howl({
      src: ["/sounds/arrow.mp3"],
      volume: 1,
    });

    return () => {
      clickSoundRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    goatMoveSoundRef.current = new Howl({
      src: ["/sounds/goatmove.mp3"],
      volume: 1,
    });

    return () => {
      goatMoveSoundRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    tigerSoundRef.current = new Howl({
      src: ["/sounds/tigersound.mp3"],
      volume: 1,
    });

    return () => {
      tigerSoundRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    tigerWinSoundRef.current = new Howl({
      src: ["/sounds/tigerwin.mp3"],
      volume: 1,
    });

    return () => {
      tigerWinSoundRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    goatSoundRef.current = new Howl({
      src: ["/sounds/goatsound.mp3"],
      volume: 1,
    });

    return () => {
      goatSoundRef.current?.unload();
    };
  }, []);

  return (
    <SoundContext.Provider
      value={{
        playTigerSound,
        playGoatMoveSound,
        playGoatSound,
        playTigerWinSound,
        playClick,
        toggleBackgroundMusic,
        isPlaying,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

// Custom hook to use SoundContext
export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useSound must be used within a SoundProvider");
  return context;
};
