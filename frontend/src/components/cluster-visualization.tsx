"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef } from "react"

interface ClusterVisualizationProps {
  data: any
}

export function ClusterVisualization({ data }: ClusterVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = rect.width
    const height = rect.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Generate cluster data
    const clusters = [
      { x: width * 0.3, y: height * 0.4, color: "#93c5fd", label: "건강 그룹", count: 45 },
      { x: width * 0.6, y: height * 0.3, color: "#fbbf24", label: "주의 그룹", count: 32 },
      { x: width * 0.5, y: height * 0.7, color: "#f87171", label: "위험 그룹", count: 23 },
    ]

    // Draw cluster points
    clusters.forEach((cluster) => {
      // Draw cluster members
      for (let i = 0; i < cluster.count; i++) {
        const angle = (Math.PI * 2 * i) / cluster.count
        const radius = 40 + Math.random() * 30
        const x = cluster.x + Math.cos(angle) * radius
        const y = cluster.y + Math.sin(angle) * radius

        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = cluster.color + "80"
        ctx.fill()
      }

      // Draw cluster center
      ctx.beginPath()
      ctx.arc(cluster.x, cluster.y, 8, 0, Math.PI * 2)
      ctx.fillStyle = cluster.color
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Draw user position (in healthy cluster)
    const userX = clusters[0].x + 20
    const userY = clusters[0].y - 15

    ctx.beginPath()
    ctx.arc(userX, userY, 8, 0, Math.PI * 2)
    ctx.fillStyle = "#6366f1"
    ctx.fill()
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw user label
    ctx.font = "600 12px sans-serif"
    ctx.fillStyle = "#6366f1"
    ctx.textAlign = "center"
    ctx.fillText("나", userX, userY - 15)
  }, [data])

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">클러스터 분석 결과</h3>
          <p className="text-sm text-muted-foreground">
            당신은 <span className="font-semibold text-success">건강 그룹</span>에 속해 있습니다. 이 그룹의 사람들은
            규칙적인 운동과 충분한 수면을 취하는 경향이 있습니다.
          </p>
        </div>

        <div className="relative w-full h-[400px] bg-muted/30 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
        </div>

        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#93c5fd]" />
            <span className="text-muted-foreground">건강 그룹 (45명)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#fbbf24]" />
            <span className="text-muted-foreground">주의 그룹 (32명)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#f87171]" />
            <span className="text-muted-foreground">위험 그룹 (23명)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="font-medium">나</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
