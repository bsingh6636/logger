
"use client"

import { useEffect, useState } from "react"
import { columns, Log } from "./columns"
import { DataTable } from "@/components/data-table"

async function getData(): Promise<Log[]> {
  const token = localStorage.getItem("token")
  const res = await fetch("/api/logs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default function DashboardPage() {
  const [data, setData] = useState<Log[]>([])

  useEffect(() => {
    getData().then(setData)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
