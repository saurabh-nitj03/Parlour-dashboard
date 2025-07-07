"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"
import { useAuth } from "@/hooks/use-auth" 

interface SocketContextType {
  socket: Socket | null
}

export const SocketContext = createContext<SocketContextType>({ socket: null })

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    if (!user) return; 
    let socketInstance: Socket | null = null;
    
      socketInstance = io(process.env.NEXT_PUBLIC_API_URL || "https://parlour-dashboard-83dz.onrender.com",{
        auth: {
          token: localStorage.getItem("token"), // or send as query param
        },
      })
      setSocket(socketInstance)
      // console.log(socketInstance)
      // console.log("Socket Connected :"+socketInstance);

    return () => {
      socketInstance?.close()
    }
  }, [user])

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}

