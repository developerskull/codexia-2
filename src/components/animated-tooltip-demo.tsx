"use client";
import { useEffect, useState } from "react";
import { initSocket } from "@/socket"; // Import the initSocket function

// Default profile images
const profileImages = [
  "https://plus.unsplash.com/premium_photo-1731327688406-51dbb887c658?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1732757787135-ce2ad37bb72c?q=80&w=1354&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1722696650716-6ba24ffadce0?q=80&w=1347&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1731681926154-9fb4a306fe5a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function AnimatedTooltipPreview() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    const setupSocket = async () => {
      const socket = await initSocket();

      // Get current user data
      const currentUserData = localStorage.getItem("currentUser");
      if (!currentUserData) return;

      const { roomId, name } = JSON.parse(currentUserData);

      // Emit joinRoom only once
      socket.emit("joinRoom", { roomId, name });

      // Listen for room updates
      socket.on("updateRoom", (members: any[]) => {
        const formattedMembers = members.map((member: any) => ({
          id: member.peopleId,
          name: member.name,
          image: profileImages[member.peopleId - 1] || profileImages[0], // Convert 1-based to 0-based index
        }));
        setTeamMembers(formattedMembers);
      });

      // Cleanup on unmount
      return () => {
        socket.off("updateRoom");
      };
    };

    setupSocket();
  }, []);

  // If no team members yet, show placeholder
  if (teamMembers.length === 0) {
    return <div className="text-sm text-muted-foreground">No team members yet</div>;
  }

  return (
    <div className="space-y-3">
      {teamMembers.map((member) => (
        <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="relative">
            <img
              src={member.image}
              alt={member.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{member.name}</p>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>
      ))}
    </div>
  );
}