import { io } from "socket.io-client";

export let socket; // Declare a shared socket instance

export const initSocket = async () => {
  if (!socket) {
    const options = {
      reconnectionAttempts: Infinity,
      timeout: 10000,
      transports: ["polling", "websocket"], // Try polling first, then upgrade to websocket
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      autoConnect: true,
    };
    
    try {
      socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001", options);
      
      socket.on("connect_error", (error) => {
        console.warn("Socket connection error (will retry):", error.message);
      });
      
      socket.on("connect", () => {
        console.log("✅ Socket connected successfully");
      });
      
      socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });
      
    } catch (error) {
      console.error("Failed to initialize socket:", error);
    }
  }
  return socket;
};