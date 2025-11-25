"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { HealthSummaryCards } from "@/components/health-summary-cards"
import { RiskAssessment } from "@/components/risk-assessment"
import { ClusterVisualization } from "@/components/cluster-visualization"

export default function DashboardPage() {
  const [healthData, setHealthData] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem("healthData")
    if (stored) {
      setHealthData(JSON.parse(stored))
    } else {
      // Demo data
      setHealthData({
        age: "35",
        weight: "70",
        height: "175",
        sleep: "7",
        exercise: "3",
        smoking: "no",
        alcohol: "occasional",
      })
    }
  }, [])

  if (!healthData) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">건강 분석 대시보드</h1>
          <p className="text-muted-foreground">AI가 분석한 나의 건강 상태를 확인하세요</p>
        </div>

        <div className="space-y-8">
          {/* Health Summary Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">나의 건강 요약</h2>
            <HealthSummaryCards data={healthData} />
          </section>

          {/* Risk Assessment Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">예상 질병 위험도</h2>
            <RiskAssessment data={healthData} />
          </section>

          {/* Cluster Analysis Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">나와 비슷한 사람들의 그룹 분석</h2>
            <ClusterVisualization data={healthData} />
          </section>
        </div>
      </main>
    </div>
  )
}
