import { Link } from "react-router-dom" // next/link 대신 사용
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Activity, Brain, Users, MessageSquare } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Activity className="h-4 w-4" />
            <span>AI 기반 건강 분석 서비스</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
            AI로 나의 건강을
            <br />
            <span className="text-primary">더 잘 이해해보세요</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed max-w-2xl mx-auto">
            AI가 건강 데이터를 분석하여 개인 맞춤형 인사이트를 제공합니다. 질병 위험도를 예측하고, 비슷한 사람들과
            비교하며, AI에게 건강 상담을 받아보세요.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="text-base">
              {/* href를 to로 변경 */}
              <Link to="/input">분석 시작하기</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
              {/* href를 to로 변경 */}
              <Link to="/dashboard">데모 보기</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI 건강 분석</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              최신 AI 기술로 건강 데이터를 분석하여 질병 위험도를 예측합니다
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">그룹 분석</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              나와 비슷한 건강 프로필을 가진 사람들과 비교 분석합니다
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI 건강 상담</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              건강에 대한 궁금한 점을 AI에게 자연어로 물어보세요
            </p>
          </Card>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="p-6 bg-muted/50 border-muted">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              ⚠️ 이 서비스는 전문 의료 상담을 대체하지 않습니다. 건강에 문제가 있다면 반드시 의료 전문가와 상담하세요.
            </p>
          </Card>
        </div>
      </main>
    </div>
  )
}