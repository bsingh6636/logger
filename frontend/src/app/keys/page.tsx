
"use client"

import { useEffect, useState } from "react"
import { columns, ApiKey } from "./columns"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

async function getData(): Promise<ApiKey[]> {
  const token = localStorage.getItem("token")
  const res = await fetch("/api/keys", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default function KeysPage() {
  const [data, setData] = useState<ApiKey[]>([])
  const [keyName, setKeyName] = useState("")

  useEffect(() => {
    getData().then(setData)
  }, [])

  const generateKey = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch("/api/keys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: keyName }),
    })
    if (res.ok) {
      window.location.reload()
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Generate Key</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Generate API Key</DialogTitle>
              <DialogDescription>
                Give your key a name to help you identify it later.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={generateKey}>
                Generate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
