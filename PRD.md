방금 논의한 아이디어(AI 기반 외국인 한글 이름 작명 및 디자인 생성 서비스)를 실제 개발 및 팝업 스토어 운영을 위한 **PRD(Product Requirements Document, 제품 요구사항 명세서)** 형태로 정리해 드립니다.

이 문서는 개발(SaaS 보일러플레이트 활용)과 오프라인 운영의 기준점이 됩니다.

---

# PRD: Project "My Korean Name" (가제)

| 항목 | 내용 |
| :--- | :--- |
| **작성일** | 2025-12-03 |
| **작성자** | PM (User) |
| **버전** | v1.0 (MVP) |
| **상태** | **기획 단계 (Planning)** |
| **목표 시장** | 서울 용산구(이태원, 용리단길) 방문 외국인 관광객 및 거주자 |

---

## 1. 개요 (Executive Summary)
### 1.1. 배경 및 문제점
*   용산 지역의 외국인 유동 인구는 많으나, 그들에게 **'개인화된 경험'**을 제공하는 저렴한 기념품이 부족함.
*   외국인들은 한글과 자신의 이름에 대한 관심이 높지만, 단순 번역기 외에 **'문화적 맥락(뜻)'**과 **'심미적 디자인'**을 제공하는 서비스가 없음.

### 1.2. 솔루션
*   **SaaS 기반 웹 애플리케이션:** QR 코드를 통해 접속하여 즉석에서 한글 이름을 생성.
*   **3가지 옵션 제공:** 단순 번역이 아닌 음차(한자), 트렌디(한국식), 순우리말 3가지 옵션을 제안하여 선택권을 부여.
*   **디지털 굿즈 생성:** 선택한 이름을 바탕으로 '타투 도안' 및 '네온사인 배경화면'을 AI로 생성하여 소장 가치를 높임.

### 1.3. 가치 제안 (Value Proposition)
*   **Fast:** 1분 안에 나만의 한국 이름과 디자인 확보.
*   **Meaningful:** 단순 글자가 아닌 '운명'과 '스토리'를 판매.
*   **Shareable:** 인스타그램에 올리기 좋은 고퀄리티 이미지 제공.

---

## 2. 사용자 타겟 (Target Audience)
1.  **Primary:** 이태원/용산 관광 외국인 (20~30대, SNS 활용도 높음).
2.  **Secondary:** 한국 거주 초기 외국인 (자신의 한국어 호칭이 필요한 사람).

---

## 3. 사용자 시나리오 (User Journey)

### 3.1. 접속 및 결제
1.  오프라인 팝업 스토어(카페 테이블 등)에서 QR 코드 스캔.
2.  랜딩 페이지 접속 (모바일 뷰 최적화).
3.  **Input:** 영어 이름 입력 (예: `Marchella`) + 선호 키워드 1개 선택 (예: `Elegant`, `Strong`, `Nature`).
4.  **Payment:** Stripe 또는 간편 결제를 통해 $5(Basic) 또는 $8(Premium) 결제.

### 3.2. 이름 생성 및 선택 (Core Feature)
1.  AI가 3가지 옵션을 생성하여 카드 형태로 제시.
    *   **Option A (음차+한자):** 발음 유사 + 깊은 뜻 (예: 마채라 - 갈고 닦은 비단)
    *   **Option B (트렌디):** 한국인 이름 스타일 (예: 채원 - 세련된 느낌)
    *   **Option C (순우리말):** 이미지/성격 기반 (예: 마루 - 정상)
2.  사용자가 마음에 드는 **하나의 옵션(예: Option B)**을 터치하여 선택.

### 3.3. 결과물 수령
1.  **로딩 화면:** "Carving your destiny..." 문구와 함께 생성 애니메이션 노출 (약 10~15초).
2.  **결과 페이지:**
    *   선택한 이름의 캘리그라피 이미지.
    *   이름의 뜻 풀이 (English).
    *   **(Premium)** 타투 도안(Fine Line) & 네온사인 월페이퍼(Cyberpunk) 다운로드 버튼 활성화.
3.  **Email 전송:** 입력한 이메일로 고화질 파일 자동 발송.

---

## 4. 기능 요구사항 (Functional Requirements)

### 4.1. 프론트엔드 (User Interface)
*   **반응형 모바일 웹:** 100% 모바일 환경 기준 디자인 (Next.js 권장).
*   **UX:** 직관적인 Step-by-Step UI (입력 -> 결제 -> 선택 -> 결과).
*   **애니메이션:** 결과 생성 시 지루함을 덜어줄 로딩 애니메이션 필수.

### 4.2. 백엔드 & AI (Server & Logic)
*   **LLM 연동 (OpenAI GPT-4o-mini 권장):**
    *   Role: "You are a professional Korean Naming Master."
    *   Task: 영어 이름을 입력받아 3가지 유형(Hanja, Trendy, Pure)으로 JSON 데이터 반환.
*   **Image Gen 연동 (DALL-E 3):**
    *   Prompt Engineering: 선택된 이름의 텍스트를 포함한 'Tattoo Flash Sheet' 및 'Neon Sign' 프롬프트 자동 생성 및 요청.
*   **Database:** 주문 내역, 생성된 이름 데이터, 유저 이메일 저장 (Supabase/PostgreSQL).

### 4.3. 결제 시스템
*   Stripe 연동 (해외 카드 결제 용이성 최우선).
*   상품 구성:
    *   Basic ($5): 이름 3종 제안 + 뜻 풀이 + 텍스트 이미지.
    *   Premium ($8): Basic + 타투 도안 + 네온 배경화면.

---

## 5. 디자인 가이드 (Design Concept)

*   **톤앤매너:** **"Modern Seoul"** (전통적인 붓글씨와 사이버펑크 네온의 조화).
*   **메인 컬러:** Black(배경), Neon Pink/Purple(포인트), White(텍스트).
*   **폰트:**
    *   영문: San-serif (깔끔함).
    *   한글: 캘리그라피 스타일 (결과물), 고딕체 (UI 설명).

---

## 6. 기술 스택 (Tech Stack Suggestion)
*이전에 언급한 '보일러플레이트' 환경 기준*

*   **Framework:** Next.js (React)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Authentication:** 보일러플레이트 내장 기능 (유저 이메일 수집용, 비회원 주문 가능하게 설정 권장)
*   **Database:** Supabase or Firebase
*   **AI API:** OpenAI API (GPT for Text, DALL-E for Image)
*   **Payment:** Stripe

---

## 7. GTM 전략 (Go-To-Market for Pop-up)

### 7.1. 장소 (Location)
*   용리단길/이태원 카페와 제휴 (주말 샵인샵).
*   테이블 1개, 태블릿 1대, X배너 1개("Get Your Korean Name Destiny Here") 설치.

### 7.2. 마케팅 (Marketing)
*   **현장:** X배너에 "Option B" 예시(Marchella -> 채원)와 타투/네온 이미지를 크게 출력하여 시각적 호기심 자극.
*   **바이럴:** 결과물 화면에 `#MyKoreanName` 해시태그와 QR코드를 워터마크로 삽입.

---

## 8. 성공 지표 (Metrics)
*   **전환율 (Conversion Rate):** QR 스캔 대비 결제 완료 비율 (목표: 10% 이상).
*   **업셀링 비율:** Basic 대비 Premium($8) 구매 비율 (목표: 30% 이상).
*   **처리 시간:** 결제 후 결과 생성까지 20초 이내 유지.