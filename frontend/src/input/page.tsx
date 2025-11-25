"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Upload, Activity } from "lucide-react"

export default function InputPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    gender: "male", // 기본값 설정
    weight: "",
    height: "",
    sleep: "",
    exercise: "",
    smoking: "no",
    alcohol: "no",
    symptoms: "",
  })
  
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    const genderText = formData.gender === "male" ? "남성" : "여성";
    const query = `${formData.age}세 ${genderText} 체중 ${formData.weight}`;

    try {
        const response = await fetch("http://127.0.0.1:8000/api/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_input: query }),
        })
        const data = await response.json()
        setResult(data.response)
    } catch (error) {
        console.error("Error:", error)
        setResult("서버와 연결할 수 없습니다. 백엔드가 켜져 있는지 확인해주세요.")
    } finally {
        setLoading(false)
    }

    localStorage.setItem("healthData", JSON.stringify(formData))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">건강 데이터 입력</h1>
            <p className="text-muted-foreground">정확한 분석을 위해 건강 정보를 입력해주세요</p>
          </div>

          <Card className="p-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">나이 (세)</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="예: 35"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">성별</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">체중 (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="예: 70"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">키 (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    placeholder="예: 175"
                    value={formData.height}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleep">평균 수면시간 (시간)</Label>
                  <Input
                    id="sleep"
                    name="sleep"
                    type="number"
                    step="0.5"
                    placeholder="예: 7"
                    value={formData.sleep}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exercise">주간 운동 횟수</Label>
                  <Input
                    id="exercise"
                    name="exercise"
                    type="number"
                    placeholder="예: 3"
                    value={formData.exercise}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smoking">흡연 여부</Label>
                  <select
                    id="smoking"
                    name="smoking"
                    value={formData.smoking}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="no">비흡연</option>
                    <option value="yes">흡연</option>
                    <option value="past">과거 흡연</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alcohol">음주 빈도</Label>
                  <select
                    id="alcohol"
                    name="alcohol"
                    value={formData.alcohol}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="no">안 함</option>
                    <option value="occasional">가끔</option>
                    <option value="regular">자주</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">현재 증상 (선택사항)</Label>
                <textarea
                  id="symptoms"
                  name="symptoms"
                  placeholder="예: 가끔 두통이 있고, 피로감을 자주 느낍니다"
                  value={formData.symptoms}
                  onChange={handleChange}
                  className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "분석 중입니다..." : "AI 건강 분석 시작"}
              </Button>
            </form>
          </Card>

          {/* 결과 표시 카드 추가 */}
          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-8">
                <Card className="p-6 border-primary/50 bg-primary/5 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-6 h-6 text-primary" />
                    <h3 className="font-bold text-xl text-primary">체중 분석 리포트</h3>
                </div>
                <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed text-lg">
                    {result}
                </div>
                </Card>
            </div>
          )}

          <Card className="p-6 bg-muted/50">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">CSV 파일 업로드 (준비 중)</h3>
                <p className="text-sm text-muted-foreground">
                  웨어러블 기기 데이터나 CSV 파일을 업로드하여 자동으로 입력할 수 있습니다
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}