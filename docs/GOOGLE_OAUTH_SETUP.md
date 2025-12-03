# Google OAuth 설정 가이드

Clerk를 통해 Google 로그인을 활성화하는 방법입니다.

## 1. Clerk 대시보드 설정

1. [Clerk 대시보드](https://dashboard.clerk.com)에 로그인
2. 프로젝트 선택
3. **User & Authentication** → **Social Connections** 메뉴로 이동
4. **Google** 옵션 찾기
5. **Enable** 버튼 클릭
6. Google OAuth 설정:
   - **Client ID**: Google Cloud Console에서 발급받은 Client ID
   - **Client Secret**: Google Cloud Console에서 발급받은 Client Secret

## 2. Google Cloud Console 설정

### 2.1. 프로젝트 생성
1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택

### 2.2. OAuth 2.0 클라이언트 ID 생성
1. **API 및 서비스** → **사용자 인증 정보** 메뉴로 이동
2. **사용자 인증 정보 만들기** → **OAuth 2.0 클라이언트 ID** 선택
3. 애플리케이션 유형: **웹 애플리케이션** 선택
4. 승인된 리디렉션 URI 추가:
   ```
   https://your-clerk-domain.clerk.accounts.dev/v1/oauth_callback
   ```
   - Clerk 대시보드의 **API Keys** 페이지에서 정확한 도메인 확인 가능
   - 개발 환경의 경우:
     ```
     http://localhost:3000/v1/oauth_callback
     ```

### 2.3. OAuth 동의 화면 설정
1. **OAuth 동의 화면** 메뉴로 이동
2. 사용자 유형 선택 (외부 또는 내부)
3. 앱 정보 입력:
   - 앱 이름: "My Korean Name"
   - 사용자 지원 이메일: 본인 이메일
   - 개발자 연락처 정보: 본인 이메일
4. 범위 추가 (기본 범위로 충분):
   - `openid`
   - `email`
   - `profile`

## 3. 환경 변수 확인

`.env` 파일에 다음 변수들이 설정되어 있는지 확인:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## 4. 테스트

1. 개발 서버 실행:
   ```bash
   pnpm run dev
   ```

2. 브라우저에서 `http://localhost:3000` 접속
3. 우측 상단의 **"Sign in with Google"** 버튼 클릭
4. Google 계정으로 로그인

## 문제 해결

### Google 로그인 버튼이 표시되지 않는 경우
- Clerk 대시보드에서 Google OAuth가 활성화되어 있는지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### 리디렉션 URI 오류
- Google Cloud Console의 승인된 리디렉션 URI가 정확한지 확인
- Clerk 대시보드의 도메인과 일치하는지 확인

### 추가 도움말
- [Clerk Google OAuth 문서](https://clerk.com/docs/authentication/social-connections/google)
- [Google OAuth 2.0 문서](https://developers.google.com/identity/protocols/oauth2)

