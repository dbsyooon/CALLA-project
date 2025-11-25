import { Card } from "@/components/ui/card"
import { Heart, Activity, Brain, Droplet } from "lucide-react"
import { cn } from "@/lib/utils"

interface RiskAssessmentProps {
  data: any
}

export function RiskAssessment({ data }: RiskAssessmentProps) {
  // Simple risk calculation based on input data
  const calculateRisk = (category: string) => {
    const bmi = Number.parseFloat(data.weight) / Math.pow(Number.parseFloat(data.height) / 100, 2)
    const age = Number.parseInt(data.age)
    const exercise = Number.parseInt(data.exercise)
    const sleep = Number.parseFloat(data.sleep)

    switch (category) {
      case "cardiovascular":
        if (bmi > 25 || data.smoking !== "no" || exercise < 2) return "high"
        if (bmi > 23 || age > 40) return "medium"
        return "low"
      case "diabetes":
        if (bmi > 27 || age > 45) return "medium"
        if (bmi > 30) return "high"
        return "low"
      case "stress":
        if (sleep < 6 || exercise < 2) return "high"
        if (sleep < 7) return "medium"
        return "low"
      case "metabolic":
        if (bmi > 25 && exercise < 2) return "high"
        if (bmi > 23) return "medium"
        return "low"
      default:
        return "low"
    }
  }

  const risks = [
    {
      icon: Heart,
      category: "심혈관계 질환",
      risk: calculateRisk("cardiovascular"),
      description: "고혈압, 심장병 등",
    },
    {
      icon: Droplet,
      category: "당뇨병",
      risk: calculateRisk("diabetes"),
      description: "혈당 관련 질환",
    },
    {
      icon: Brain,
      category: "스트레스 관련",
      risk: calculateRisk("stress"),
      description: "불안, 우울, 번아웃",
    },
    {
      icon: Activity,
      category: "대사 증후군",
      risk: calculateRisk("metabolic"),
      description: "비만, 고지혈증 등",
    },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-destructive/10 border-destructive/20 text-destructive"
      case "medium":
        return "bg-warning/10 border-warning/20 text-warning"
      case "low":
        return "bg-success/10 border-success/20 text-success"
      default:
        return "bg-muted"
    }
  }

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case "high":
        return "높음"
      case "medium":
        return "보통"
      case "low":
        return "낮음"
      default:
        return "알 수 없음"
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {risks.map((item, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold">{item.category}</h3>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap",
                    getRiskColor(item.risk),
                  )}
                >
                  {getRiskLabel(item.risk)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
