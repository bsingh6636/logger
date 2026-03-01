
"use client"

import { useEffect, useMemo, useState } from "react"
import { columns, Log } from "./columns"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type LogsResponse = {
  data: Log[]
  page: number
  limit: number
  total: number
}

async function getData(params: URLSearchParams): Promise<LogsResponse> {
  const token = localStorage.getItem("token")
  const res = await fetch(`/api/logs?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const data = await res.json()
  if (Array.isArray(data)) {
    return { data, page: 1, limit: data.length, total: data.length }
  }
  return data
}

export default function DashboardPage() {
  const [data, setData] = useState<Log[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(50)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    message: "",
    service: "",
    function: "",
    level: "",
    from: "",
    to: "",
    sort: "desc",
  })

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit])

  const fetchLogs = async (nextPage = page, nextLimit = limit, nextFilters = filters) => {
    const params = new URLSearchParams()
    params.set("page", String(nextPage))
    params.set("limit", String(nextLimit))
    params.set("sort", nextFilters.sort)
    if (nextFilters.message) params.set("message", nextFilters.message)
    if (nextFilters.service) params.set("service", nextFilters.service)
    if (nextFilters.function) params.set("function", nextFilters.function)
    if (nextFilters.level) params.set("level", nextFilters.level)
    if (nextFilters.from) params.set("from", nextFilters.from)
    if (nextFilters.to) params.set("to", nextFilters.to)

    setLoading(true)
    try {
      const result = await getData(params)
      setData(result.data)
      setPage(result.page)
      setLimit(result.limit)
      setTotal(result.total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs(1, limit, filters)
  }, [])

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="rounded-lg border p-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Input
            placeholder="Search message"
            value={filters.message}
            onChange={(event) => setFilters((prev) => ({ ...prev, message: event.target.value }))}
          />
          <Input
            placeholder="Service"
            value={filters.service}
            onChange={(event) => setFilters((prev) => ({ ...prev, service: event.target.value }))}
          />
          <Input
            placeholder="Function"
            value={filters.function}
            onChange={(event) => setFilters((prev) => ({ ...prev, function: event.target.value }))}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground w-16">Level</label>
            <select
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm"
              value={filters.level}
              onChange={(event) => setFilters((prev) => ({ ...prev, level: event.target.value }))}
            >
              <option value="">All</option>
              <option value="debug">Debug</option>
              <option value="info">Info</option>
              <option value="warn">Warn</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground w-16">From</label>
            <Input
              type="datetime-local"
              value={filters.from}
              onChange={(event) => setFilters((prev) => ({ ...prev, from: event.target.value }))}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground w-16">To</label>
            <Input
              type="datetime-local"
              value={filters.to}
              onChange={(event) => setFilters((prev) => ({ ...prev, to: event.target.value }))}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground w-16">Sort</label>
            <select
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm"
              value={filters.sort}
              onChange={(event) => setFilters((prev) => ({ ...prev, sort: event.target.value }))}
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground w-16">Limit</label>
            <select
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm"
              value={limit}
              onChange={(event) => setLimit(Number(event.target.value))}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </select>
          </div>
          <Button onClick={() => fetchLogs(1, limit, filters)} disabled={loading}>
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const resetFilters = {
                message: "",
                service: "",
                function: "",
                level: "",
                from: "",
                to: "",
                sort: "desc",
              }
              setFilters(resetFilters)
              fetchLogs(1, limit, resetFilters)
            }}
            disabled={loading}
          >
            Reset
          </Button>
          <span className="text-sm text-muted-foreground">
            {total} log{total === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <DataTable columns={columns} data={data} />

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchLogs(Math.max(1, page - 1), limit, filters)}
            disabled={page <= 1 || loading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchLogs(Math.min(totalPages, page + 1), limit, filters)}
            disabled={page >= totalPages || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
