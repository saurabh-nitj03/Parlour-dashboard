"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSocket } from "@/hooks/use-socket"
import { Clock, LogIn, LogOut } from "lucide-react"
import { BACKEND_URL } from "../../lib/config"
import axios from "axios"

interface AttendanceRecord {
  _id: string
  employee: {
    name: string
    position: string
    _id?:string
  }
  action: "IN" | "OUT"
  updatedAt: string,
  createdAt?:string
}

export function AttendanceLog() {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const { socket } = useSocket()

  useEffect(() => {
    fetchRecentAttendance()

    // Listen for real-time updates
    if (socket) {
      socket.on("attendance-update", (data) => {
        const newRecord: AttendanceRecord = {
          _id:data._id,
          employee: {
            name: data.employee?.name,
            position: data.employee?.position,
            _id:data.employee?._id
          },
          action: data.action,
          updatedAt: data.timestamp,
        }
        setRecords((prev) => [newRecord, ...prev.slice(0, 9)])
        
      })
    }

    return () => {
      if (socket) {
        socket.off("attendance-update")
      }
    }
  }, [socket])

  const fetchRecentAttendance = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/attendance/recent`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      // console.log(response);
      if (response.data.success) {
        const data = response.data.records
        // console.log(data);
        setRecords(data)
        // console.log(records);
      }
    } catch (error) {
      console.error("Failed to fetch attendance records:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Live Attendance
        </CardTitle>
        <CardDescription>Real-time punch in/out updates</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {records.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No recent attendance records</p>
            ) : (
              records.map((record) => (
                <div key={record._id+Math.random.toString()} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${record.action === "IN" ? "bg-green-100" : "bg-red-100"}`}>
                      {record.action === "IN" ? (
                        <LogIn className="h-4 w-4 text-green-600" />
                      ) : (
                        <LogOut className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{record.employee?.name}</p>
                      <p className="text-sm text-gray-600">{record.employee?.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={record.action === "IN" ? "default" : "secondary"}>Punch {record.action}</Badge>
                    <p className="text-xs text-gray-500 mt-1">{new Date(record.updatedAt).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
