"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { SoundToggler } from "../components/shared/soundToggler";
import { useSound } from "@/context/SoundContext";
import { useNotification } from "@/context/NotificationContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function GameOptions() {
  const [step, setStep] = useState("home");
  const [username, setUsername] = useState<string | null>(null);
  const { playClick } = useSound();
  const { notifications } = useNotification();

  useEffect(() => {
    const user = localStorage.getItem("username");
    setUsername(user);

    console.log({ username });
  }, []);

  const clickBackButtonHandler = () => {
    setStep("home");
    playClick();
  };

  return (
    <main className="flex min-h-screen flex-col justify-end p-4 bg-[url(/BaghChal.jpg)] bg-no-repeat bg-center bg-cover relative overflow-hidden scroll-hidden">
      {step !== "home" && (
        <Link href="/">
          <button
            className="absolute top-5 left-5 bg-[url(/back.png)] active:scale-90 transition-all w-[10rem] h-[5rem] flex justify-center items-center bg-center bg-cover p-3 rounded-full cursor-pointer"
            onClick={clickBackButtonHandler}
          >
            <p className="text-xl text-black">Back</p>
          </button>
        </Link>
      )}

      <div className="absolute top-5 right-5">
        {username ? (
          <DropdownMenuDemo />
        ) : (
          <Link href="/auth">
            <button className="w-[10rem] flex items-center justify-center outline-none h-[4rem] text-black text-[2rem] text-xl p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2 font-[900]">
              Login
            </button>
          </Link>
        )}
      </div>

      {notifications &&
        notifications.map((notification) => (
          <Link href={notification.invitee_link}>
            <div className="text-white absolute bottom-5 right-0 p-4 border rounded-full bg-orange-400 text-xl font-semibold">
              {notification.inviter} is challenging you!
            </div>
          </Link>
        ))}

      <div className="flex flex-col items-center justify-center space-y-1 mb-20">
        {step === "home" && (
          <>
            {username && (
              <Link href="/friends">
                <button className="w-[20rem] h-[8rem] text-black text-[2rem] text-2xl p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2 font-[900]">
                  Friends
                </button>
              </Link>
            )}
            <button
              className="w-[20rem] h-[8rem] text-black text-[2rem] text-2xl p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2 font-[900]"
              onClick={() => setStep("main")}
            >
              {username ? "Play" : "Play as Guest"}
            </button>
          </>
        )}

        {step === "main" && (
          <>
            <Link href="/game">
              <button className="w-[20rem] h-[8rem] text-black text-[2rem] text-2xl p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2 font-[900]">
                Same device
              </button>
            </Link>
            <button
              className="w-[20rem] h-[8rem] text-black text-[2rem] text-2xl p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2 font-[900]"
              onClick={() => setStep("computer")}
            >
              Play vs Bot
            </button>
          </>
        )}

        {step === "play" && (
          <>
            <Link href="/game">
              <button className="w-[20rem] h-[8rem] text-black text-[2rem] text-2xl p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2 font-[900]">
                Same Device
              </button>
            </Link>
            <button className="w-[20rem] h-[8rem] text-black text-[2rem] text-2xl p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2 font-[900]">
              Friend
            </button>
          </>
        )}

        {step === "computer" && (
          <>
            <Link href="/ai_tiger">
              <button className="w-[20rem] h-[8rem] text-black text-[2rem] text-2xl p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2 font-[900]">
                Tiger Bot
              </button>
            </Link>
            <Link href="/ai_goat">
              <button className="w-[20rem] h-[8rem] text-black text-[2rem] text-2xl p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2 font-[900]">
                Goat Bot
              </button>
            </Link>
          </>
        )}
      </div>

      {/* <div className="absolute bottom-5 left-5 bg-[url(/audio_wooden.png)] w-[10rem] h-[10rem] flex justify-center items-center bg-center bg-cover p-3 rounded-full cursor-pointer">
        <button
          onClick={() => setMuted(!muted)}
          className="bg-transparent mt-[-1rem]"
        >
          {muted ? (
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
      </div> */}

      <SoundToggler />
    </main>
  );
}

export function DropdownMenuDemo() {
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("rating");
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-[10rem] flex items-center justify-center outline-none h-[4rem] text-black text-[2rem] text-xl p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2 font-[900]">
          Profile
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#143034] border-none text-white">
        <DropdownMenuLabel className="text-lg">My Game Info</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-[16px]">
            Username: {localStorage.getItem("username")}
          </DropdownMenuItem>
          <DropdownMenuItem className="text-[16px]">
            Rating: {localStorage.getItem("rating")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-[16px]"
          onClick={handleLogout}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
