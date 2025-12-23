# MediUp (CALLA) 프로젝트 요약

**CALLA**는 AI 기반 건강 분석 웹 애플리케이션으로, 사용자의 건강 데이터를 국민건강영양조사(KNHANES) 데이터와 비교하여 통계적 인사이트를 제공합니다.  
  
<br>
<br>


## 주요 기능

### 대표 기능 및 목적
#### 1. 자연어 기반 건강 데이터 분석
사용자가 자연어로 건강 정보를 입력하면 AI가 자동으로 분석
  - 자연어 입력 파싱 (예: "26살 남성 당화혈색소 6.9")
  - 나이, 성별, 측정값, 건강 지표 자동 추출
  - Sentence Transformer를 이용한 건강 지표 매칭
  - 50개 이상의 건강 지표 지원 (혈압, 혈당, 콜레스테롤, 영양소 등)

#### 2. 통계적 비교 분석
  사용자 데이터를 동일 연령대·성별 그룹과 비교
  - KNHANES 데이터 기반 통계 분석
  - 평균, 표준편차, 분위수(25%, 50%, 75%) 계산
  - Z-score 기반 정상 범위 판정
  - ±1σ(68%), ±2σ(95%) 정상 범위 제공

#### 3. 질병 위험도 평가
측정값이 질병 진단 기준을 초과하는지 평가
- **지원 질병**:
  - 당뇨병 (공복혈당, 당화혈색소)
  - 고혈압 (수축기/이완기 혈압)
  - 고지혈증 (총콜레스테롤, 중성지방)
  - 통풍 (요산)
  - 빈혈 (헤모글로빈)

#### 4. AI 건강 상담 (채팅)
자연어로 건강 관련 질문에 답변
  - 실시간 채팅 인터페이스
  - 자연어 질문 처리
  - 통계 기반 건강 분석 결과 제공

#### 5. 건강 대시보드
사용자 건강 상태를 한눈에 확인
  - 건강 요약 카드 (BMI, 활동 수준, 수면 패턴, 생활 습관)
  - 질병 위험도 평가 (심혈관계, 당뇨병, 스트레스, 대사증후군)
  - 클러스터 분석 (비슷한 건강 프로필 그룹 비교)

#### 6. 사용자 인증 시스템
개인화된 건강 분석 서비스 제공
  - 회원가입/로그인
  - JWT 기반 인증
  - 사용자별 건강 데이터 저장

---

## 기술 스택

**백엔드**
- Python
- SQLite
- FastAPI - RESTful API 서버
- PyTorch
- Sentence Transformers - 한국어 문장 임베딩 (KR-SBERT)

**프론트엔드**
- React 18 - UI 프레임워크
- TypeScript - 타입 안정성
- Vite - 빌드 도구
- Tailwind CSS - 스타일링
- React Router - 라우팅

---

## 폴더 구조

```
CALLA-develop-3 복사본/
│
├── backend/                          # 백엔드 서버
│   ├── __pycache__/                  # Python 캐시 파일
│   ├── app/                          # 애플리케이션 로직
│   │   ├── __pycache__/
│   │   ├── analysis.py               # 핵심 분석 로직 (자연어 파싱, 통계 분석)
│   │   ├── RAG.py                    # RAG 관련 코드 (미사용)
│   │   └── summary1.csv              # KNHANES 통계 데이터
│   ├── analysis_server.py            # 독립 분석 서버 (미사용)
│   ├── database.py                   # 데이터베이스 설정 및 모델
│   ├── main.py                       # FastAPI 메인 애플리케이션
│   ├── requirements.txt              # Python 의존성 목록
│   └── users.db                      # SQLite 데이터베이스 파일
│
├── frontend/                         # 프론트엔드 애플리케이션
│   ├── node_modules/                 # npm 패키지
│   ├── public/                       # 정적 파일
│   │   ├── favicon.ico
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/                          # 소스 코드
│   │   ├── components/               # 재사용 가능한 컴포넌트
│   │   │   ├── ui/                   # 기본 UI 컴포넌트
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   └── label.tsx
│   │   │   ├── cluster-visualization.tsx    # 클러스터 분석 시각화
│   │   │   ├── health-summary-cards.tsx     # 건강 요약 카드
│   │   │   ├── navbar.tsx                   # 네비게이션 바
│   │   │   └── risk-assessment.tsx          # 질병 위험도 평가
│   │   ├── contexts/                 # React Context
│   │   │   └── AuthContext.tsx       # 인증 상태 관리
│   │   ├── lib/                      # 유틸리티 함수
│   │   │   ├── api.ts                # API 클라이언트
│   │   │   └── utils.tsx             # 헬퍼 함수
│   │   ├── pages/                    # 페이지 컴포넌트
│   │   │   ├── LandingPage.tsx       # 랜딩 페이지
│   │   │   ├── LoginPage.tsx         # 로그인 페이지
│   │   │   └── RegisterPage.tsx      # 회원가입 페이지
│   │   ├── chat/                     # 채팅 페이지
│   │   │   └── page.tsx              # AI 건강 상담
│   │   ├── dashboard/                # 대시보드 페이지
│   │   │   └── page.tsx              # 건강 대시보드
│   │   ├── input/                    # 입력 페이지
│   │   │   └── page.tsx              # 건강 데이터 입력
│   │   ├── App.tsx                   # 메인 앱 컴포넌트 (라우팅)
│   │   ├── main.tsx                  # React 진입점
│   │   ├── index.js                  # 엔트리 포인트
│   │   ├── index.css                 # 전역 스타일
│   │   └── App.css                   # 앱 스타일
│   ├── index.html                    # HTML 템플릿
│   ├── package.json                  # npm 의존성 및 스크립트
│   ├── package-lock.json             # 패키지 잠금 파일
│   ├── tsconfig.json                 # TypeScript 설정
│   ├── vite.config.ts                # Vite 설정
│   ├── tailwind.config.js            # Tailwind CSS 설정
│   ├── postcss.config.js             # PostCSS 설정
│   └── README.md                     # 프론트엔드 README
│
├── package.json                      # 루트 패키지 (개발 스크립트)
├── README.md                         # 프로젝트 README
└── .DS_Store                         # macOS 시스템 파일
```

### 주요 디렉토리 설명

#### 백엔드
- **`backend/main.py`**: FastAPI 애플리케이션 진입점, API 엔드포인트 정의
- **`backend/database.py`**: SQLAlchemy 모델 및 데이터베이스 연결 설정
- **`backend/app/analysis.py`**: 자연어 파싱, 통계 분석, 응답 생성 로직
- **`backend/app/summary1.csv`**: KNHANES 기반 통계 데이터 (연령대, 성별, 속성별)

#### 프론트엔드
- **`frontend/src/App.tsx`**: React Router 설정 및 라우팅 정의
- **`frontend/src/pages/`**: 주요 페이지 컴포넌트 (랜딩, 로그인, 회원가입)
- **`frontend/src/chat/page.tsx`**: AI 건강 상담 채팅 인터페이스
- **`frontend/src/dashboard/page.tsx`**: 건강 대시보드 페이지
- **`frontend/src/input/page.tsx`**: 건강 데이터 입력 폼
- **`frontend/src/components/`**: 재사용 가능한 UI 컴포넌트
- **`frontend/src/lib/api.ts`**: 백엔드 API 통신 로직
- **`frontend/src/contexts/AuthContext.tsx`**: 전역 인증 상태 관리

---

## 데이터 흐름

```
사용자 입력 (자연어)
    ↓
프론트엔드 (/input 또는 /chat)
    ↓
POST /api/analyze
    ↓
백엔드 analysis.py
    ├─ extract_info() → 나이, 성별, 수치, 속성 추출
    ├─ Sentence Transformer → 속성 매칭
    ├─ get_statistics() → CSV에서 통계 조회
    ├─ generate_statistical_response() → 분석 결과 생성
    ↓
JSON 응답 (한국어 설명)
    ↓
프론트엔드 결과 표시
```

---

## 지원 건강 지표 (50개 이상)

- **혈압**: 1차/2차/3차 수축기·이완기 혈압, 최종 혈압
- **혈당**: 공복혈당, 당화혈색소
- **지질**: 총콜레스테롤, 중성지방
- **간 기능**: ALT(SGPT), AST(SGOT)
- **신장 기능**: 혈중요소질소, 혈중크레아티닌, 요산
- **혈액**: 헤모글로빈, 헤마토크리트
- **체형**: 신장, 체중, 체질량지수, 허리둘레
- **영양소**: 단백질, 지방, 탄수화물, 비타민, 미네랄 등
- **생활습관**: 걷기 일수, 운동 시간, 앉아있는 시간 등

---

## 실행 방법

### 백엔드 실행
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 프론트엔드 실행
```bash
cd frontend
npm install
npm run dev
```

### 동시 실행 (루트 디렉토리)
```bash
npm run dev
```

