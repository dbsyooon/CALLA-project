# MediUp
2025 MediUp 프로젝트
Calla는 국민건강영양조사(KNHANES) 데이터를 활용해 사용자의 건강 데이터를 분석하고 통계적 인사이트를 제공하는 AI 기반 건강 분석 웹 애플리케이션입니다.
이 프로젝트는 AI 기반 건강 분석 서비스로, 자연어 입력을 통한 건강 지표 분석과 통계적 비교를 제공합니다.



## 기술 스택
백엔드
프레임워크: FastAPI
데이터베이스: SQLite (SQLAlchemy ORM)
인증: JWT (python-jose), bcrypt
AI/ML:
Sentence Transformers (KR-SBERT-V40K-klueNLI-augSTS)
PyTorch
soynlp (한국어 토크나이저)
데이터 처리: pandas, numpy

프론트엔드
프레임워크: React 18 + TypeScript
빌드 도구: Vite
라우팅: React Router v7
스타일링: Tailwind CSS
UI 컴포넌트: Radix UI 기반 커스텀 컴포넌트
아이콘: Lucide React



## 핵심 기능
1. 자연어 기반 건강 데이터 분석
입력 예시: "26살 남성 당화혈색소 6.9"
추출 정보:
나이 (정규표현식)
성별 (남성/여성)
측정값 (숫자)
건강 지표 (Sentence Transformer 유사도 매칭)

2. 통계적 분석
KNHANES 데이터 기반 비교
연령대·성별 그룹 통계
Z-score 계산
분위수 분석 (25%, 50%, 75%)
±1σ, ±2σ 범위 제공

3. 질병 위험도 평가
지원 지표:
당뇨병: 공복혈당 ≥126 mg/dL, 당화혈색소 ≥6.5%
고지혈증: 총콜레스테롤 ≥240 mg/dL, 중성지방 ≥200 mg/dL
고혈압: 수축기 ≥140 mmHg, 이완기 ≥90 mmHg
통풍: 요산 ≥7.0 mg/dL
빈혈: 헤모글로빈 <12.0 g/dL

4. 대시보드
건강 요약 카드
질병 위험도 평가
클러스터 분석 (구현 예정)

