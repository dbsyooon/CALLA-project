# MediUp
2025 MediUp 프로젝트
Calla는 국민건강영양조사(KNHANES) 데이터를 활용해 사용자의 건강 데이터를 분석하고 통계적 인사이트를 제공하는 AI 기반 건강 분석 웹 애플리케이션입니다.

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
