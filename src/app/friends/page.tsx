"use client";

import { useSound } from "@/context/SoundContext";
import axios from "axios";
import {Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Friend {
  id?: string;
  username: string;
  rating: string;
}

interface FriendRequest {
  request_id?: string;
  sender: Friend;
}

export default function FriendsPage() {
  const { playClick } = useSound();
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friend, setFriend] = useState<Friend>();
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [error, setError] = useState("");
  const [chooseTurn, setChooseTurn] = useState(false);

  const router = useRouter();

  const handleSearchFriends = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/search-friends?username=${search}`
      );

      const result = response.data.friend;
      console.log(response.data);
      setFriend(result);
      setError("");
    } catch (error) {
      setError("Player not found!");
      setFriend(undefined);
    }
  };

  const respondFriendRequestHandler = async (
    value: string,
    id: string,
    sender: Friend
  ) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/respond-friend-request/${id}?response=${value}`
      );

      const updatedRequests = friendRequests.filter(
        (req) => req.request_id != id
      );
      setFriendRequests(updatedRequests);

      if (value === "ACCEPTED") {
        const updatedFriends = [...friends, sender];
        setFriends(updatedFriends);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addFriendHandler = async (receiver_id: string) => {
    try {
      const sender_id = localStorage.getItem("userId");
      const response = await axios.post(
        `http://127.0.0.1:8000/send-friend-request`,
        {
          sender_id,
          receiver_id,
        }
      );
      const message = response.data.message;
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

  const createInviteLink = async (
    invitee_username: string,
    turn: string,
    invitee_rating: string
  ) => {
    setChooseTurn(false);
    const inviter_username = localStorage.getItem("username");
    const inviter_rating = localStorage.getItem("rating");
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/invite/${inviter_username}/${invitee_username}/${turn}/${inviter_rating}/${invitee_rating}`
      );
      const invites = response.data.invites;
      if (invites) {
        router.push(invites[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getAllFriends() {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://127.0.0.1:8000/get-all-friends/${userId}`
        );
        setFriends(response.data.friends);
      } catch (error) {
        console.log(error);
      }
    }
    getAllFriends();
  }, []);

  useEffect(() => {
    async function getAllFriendRequests() {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://127.0.0.1:8000/friend-requests/${userId}`
        );
        console.log(response.data);

        setFriendRequests(response.data.friends);
      } catch (error) {
        console.log(error);
      }
    }
    getAllFriendRequests();
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-end p-4 bg-[url(/BaghChal.jpg)] bg-no-repeat bg-center bg-cover relative overflow-hidden scroll-hidden">
      <Link href="/">
        <button
          className="absolute top-5 left-5 bg-[url(/back.png)] active:scale-90 transition-all w-[10rem] h-[5rem] flex justify-center items-center bg-center bg-cover p-3 rounded-full cursor-pointer"
          onClick={() => playClick()}
        >
          <p className="text-xl text-black">Back</p>
        </button>
      </Link>

      <div className="flex justify-center mt-[7rem] items-start space-x-4">
        <div className="h-[25rem] w-[20rem] bg-[#143034] border-black p-4 space-y-4 overflow-hidden rounded-lg relative">
          <div className="space-y-2">
            <h2 className="text-xl text-[white] font-bold">Search</h2>

            <form
              onSubmit={handleSearchFriends}
              className="flex justify-between items-center gap-2"
            >
              <input
                placeholder="Search friends..."
                className="py-1 px-4 w-full "
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button
                type="submit"
                className="text-white text-bold hover:bg-[#317f41]/50 transition-all duration-200 bg-[#317f41] py-1 px-4"
              >
                <Search />
              </button>
            </form>

            {friend && (
              <>
                <h2 className="text-xl text-[white] font-bold">Result:</h2>
                <div
                  key={friend.id}
                  className="text-[white] text-md flex bg-[#317f41] items-center justify-between p-2"
                >
                  {friend.username}
                  <button
                    className="text-base text-white text-bold hover:bg-orange-600 transition-all duration-200 bg-orange-500 py-1 px-2 rounded-lg"
                    onClick={() => addFriendHandler(friend.id!)}
                  >
                    Add
                  </button>
                </div>
              </>
            )}

            {error && (
              <>
                <h2 className="text-xl text-[white] font-bold">Result:</h2>
                <div className="text-[white] text-md flex items-center justify-between">
                  {error}
                </div>
              </>
            )}
          </div>

          <div className="w-full h-[1px] bg-[white] " />

          <div className="space-y-3 absolute bottom-3 w-[90%]">
            <h2 className="text-xl text-[white] font-bold">All Friends</h2>

            <div className="space-y-1 h-[10rem] overflow-y-scroll">
              {friends?.map((friend) => (
                <div
                  key={friend.id}
                  className="text-[white] text-md flex bg-[#317f41] items-center justify-between p-2"
                >
                  {friend.username}
                  {!chooseTurn ? (
                    <button
                      className="text-white text-bold hover:bg-orange-600 transition-all duration-200 bg-orange-500 py-1 px-2 rounded-lg h-[1.9rem]"
                      onClick={() => setChooseTurn(true)}
                    >
                      Invite
                    </button>
                  ) : (
                    <div className="space-x-1">
                      <button
                        className="text-white text-bold hover:bg-orange-600 transition-all duration-200 bg-orange-500 py-1 px-2 rounded-lg h-[1.9rem]"
                        onClick={() =>
                          createInviteLink(
                            friend.username,
                            "tiger",
                            friend.rating
                          )
                        }
                      >
                        Tiger
                      </button>
                      <button
                        className="text-white text-bold hover:bg-orange-600 transition-all duration-200 bg-orange-500 py-1 px-2 rounded-lg h-[1.9rem]"
                        onClick={() =>
                          createInviteLink(
                            friend.username,
                            "goat",
                            friend.rating
                          )
                        }
                      >
                        Goat
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-[25rem] w-[20rem] bg-[#143034] border-black p-4 space-y-4 overflow-hidden rounded-lg">
          <div className="space-y-4">
            <h2 className="text-xl text-[white] font-bold">Friend Requests</h2>

            <div className="space-y-1 h-[20.5rem] overflow-y-scroll ">
              {friendRequests?.map((friendRequest) => (
                <div
                  key={friendRequest?.request_id}
                  className="text-[white] text-md flex bg-[#317f41] items-center justify-between p-2"
                >
                  {friendRequest?.sender?.username}

                  <div className="space-x-1 flex items-center">
                    <button
                      className="text-white text-bold hover:bg-orange-600 transition-all duration-200 bg-orange-500 py-1 px-2 rounded-lg h-[1.9rem]"
                      onClick={() =>
                        respondFriendRequestHandler(
                          "ACCEPTED",
                          friendRequest.request_id!,
                          friendRequest.sender
                        )
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="text-white text-bold hover:bg-orange-600 transition-all duration-200 bg-orange-500 py-1 px-2 rounded-lg h-[1.9rem]"
                      onClick={() =>
                        respondFriendRequestHandler(
                          "REJECTED",
                          friendRequest.request_id!,
                          friendRequest.sender
                        )
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
