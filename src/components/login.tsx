"use client";

import type React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { v4 as uuidV4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [roomId, setRoomId] = useState(""); // Correctly define state for roomId
  const [name, setName] = useState(""); // Correctly define state for name

  const createNewRoom = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast("New Room ID Generated", { duration: 2000 });
  };

  const handleJoinNow = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!roomId || !name) {
      e.preventDefault(); // Prevent navigation
      toast.error("Please fill in both Room ID and Name fields!", { duration: 2000 });
      return;
    }

    // Store current user data in localStorage
    const currentUser = { roomId, name };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Get room data from localStorage
    const roomDataKey = `room-${roomId}`;
    const roomData = localStorage.getItem(roomDataKey);
    let members = roomData ? JSON.parse(roomData).members : [];

    // Check if the user is already in the room
    const isUserInRoom = members.some((member: any) => member.name === name);
    if (!isUserInRoom) {
      // Assign a peopleId based on the number of members
      const peopleId = (members.length % 4) + 1;

      // Add the user to the room
      const newUser = { name, roomId, peopleId };
      members.push(newUser);

      // Update room data in localStorage
      localStorage.setItem(roomDataKey, JSON.stringify({ members }));

      // Store current user data in localStorage
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
          <CardDescription className="text-gray-400">Enter your room details to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="roomId" className="text-gray-300 font-medium">Room ID</Label>
                  <Input
                    id="roomId"
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter or generate a room ID"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-gray-300 font-medium">Your Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your display name"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                    required
                  />
                </div>
                <Link href="/Editor" onClick={handleJoinNow}>
                  <Button 
                    type="button" 
                    className="w-full cursor-pointer bg-white hover:bg-gray-100 text-black font-semibold shadow-lg transition-all border border-gray-200"
                  >
                    Join Room
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">Or</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">
                  Don&apos;t have a room ID?
                </p>
                <a 
                  id="link" 
                  onClick={createNewRoom} 
                  href="#" 
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Generate New Room ID
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}