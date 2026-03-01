
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

export type ApiKey = {
  _id: string
  name: string
  key: string
  createdAt: string
}

export const columns: ColumnDef<ApiKey>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "key",
    header: "Key",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      const value = getValue() as string
      const date = new Date(value)
      return Number.isNaN(date.getTime()) ? value : date.toLocaleString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const apiKey = row.original

      return (
        <Button
          variant="destructive"
          size="sm"
          onClick={async () => {
            const token = localStorage.getItem("token")
            await fetch(`/api/keys/${apiKey._id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            window.location.reload()
          }}
        >
          Revoke
        </Button>
      )
    },
  },
]
