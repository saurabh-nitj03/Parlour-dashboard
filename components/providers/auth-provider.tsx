"use client"
import type React from "react"
import  {BACKEND_URL}  from "../../lib/config"
import axios from "axios"
import { useRouter } from "next/navigation"
import { createContext, useEffect, useState } from "react"


interface User {
  _id: string
  name: string
  email: string
  role: "SUPER_ADMIN" | "ADMIN"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  console.log("Backend url:"+BACKEND_URL)
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      (async () => {
        await verifyToken(token);
      })();
    } else {
      setIsLoading(false)
    }
  }, [])

  const verifyToken = async (token: string) => {
    try {
      // console.log(token);
      const response = await axios.get(`${BACKEND_URL}/api/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(response)

      if (response.data.success) {
        // console.log(response)
        const userData = response.data
        // console.log(userData);
        setUser(userData)
      } else {
        localStorage.removeItem("token")
      }
    } catch (error) {
      localStorage.removeItem("token")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    console.log("backend url in login"+BACKEND_URL)
    const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
      email,
      password,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    // console.log(response);
    // console.log(typeof response)

    if (response.status !== 200) {
      throw new Error("Login failed")
    }

    const data = response.data;
    // console.log("data after login"+data);
    // console.log(data);
    localStorage.setItem("token", data.token);
    document.cookie = `token=${data.token}; path=/;`
    setUser(data.user);
    // console.log(user);
  }

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null)
     document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
     router.replace("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}
