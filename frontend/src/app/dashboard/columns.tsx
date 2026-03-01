
"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Log = {
  _id: string
  timestamp: string
  level: string
  message: string
  service: string
  function: string
}

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ getValue }) => {
      const value = getValue() as string
      const date = new Date(value)
      return Number.isNaN(date.getTime()) ? value : date.toLocaleString()
    },
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "function",
    header: "Function",
  },
]
