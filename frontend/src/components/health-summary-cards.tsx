import { Card } from "@/components/ui/card"
import { Activity, Heart, Moon, TrendingUp } from "lucide-react"

interface HealthSummaryCardsProps {
  data: any
}

export function HealthSummaryCards({ data }: HealthSummaryCardsProps) {
  const bmi =
    data.weight && data.height
      ? (Number.parseFloat(data.weight) / Math.pow(Number.parseFloat(data.height) / 100, 2)).toFixed(1)
      : "0"

  const activityLevel =
    Number.parseInt(data.exercise) >= 3 ? "활발함" : Number.parseInt(data.exercise) >= 1 ? "보통" : "낮음"
  const sleepQuality =
    Number.parseFloat(data.sleep) >= 7 ? "양호" : Number.parseFloat(data.sleep) >= 5 ? "보통" : "부족"

  const cards = [
    {
      icon: Activity,
      label: "BMI 지수",
      value: bmi,
      status: Number.parseFloat(bmi) < 25 ? "정상" : "주의",
      color: Number.parseFloat(bmi) < 25 ? "text-success" : "text-warning",
    },
    {
      icon: TrendingUp,
      label: "활동 수준",
      value: activityLevel,
      status: `주 ${data.exercise}회 운동`,
      color: Number.parseInt(data.exercise) >= 3 ? "text-success" : "text-warning",
    },
    {
      icon: Moon,
      label: "수면 패턴",
      value: `${data.sleep}시간`,
      status: sleepQuality,
      color: Number.parseFloat(data.sleep) >= 7 ? "text-success" : "text-warning",
    },
    {
      icon: Heart,
      label: "생활 습관",
      value: data.smoking === "no" ? "양호" : "주의",
      status: data.smoking === "no" ? "비흡연" : "흡연",
      color: data.smoking === "no" ? "text-success" : "text-destructive",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
              <card.icon className="h-5 w-5 text-primary" />
            </div>
            <span className={`text-sm font-medium ${card.color}`}>{card.status}</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
