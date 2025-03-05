"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  