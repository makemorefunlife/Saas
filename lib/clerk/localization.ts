import { koKR } from "@clerk/localizations";

/**
 * Clerk 한국어 로컬라이제이션 설정
 * 
 * 기본 한국어 로컬라이제이션을 사용하거나,
 * 필요에 따라 커스텀 로컬라이제이션을 추가할 수 있습니다.
 * 
 * @example 커스텀 로컬라이제이션 사용:
 * ```tsx
 * import { customKoKR } from '@/lib/clerk/localization';
 * 
 * <ClerkProvider localization={customKoKR}>
 *   ...
 * </ClerkProvider>
 * ```
 * 
 * @see https://clerk.com/docs/guides/customizing-clerk/localization
 */

// 기본 한국어 로컬라이제이션
export const defaultKoKR = koKR;

// 커스텀 한국어 로컬라이제이션 예제
// 필요에 따라 특정 텍스트를 커스터마이징할 수 있습니다
export const customKoKR = {
  ...koKR,
  // 버튼 텍스트 커스터마이징 예제
  formButtonPrimary: "시작하기",
  formButtonSecondary: "취소",
  
  // 회원가입 서브타이틀 커스터마이징 예제
  signUp: {
    ...koKR.signUp,
    start: {
      ...koKR.signUp?.start,
      subtitle: "{{applicationName}}에 가입하여 시작하세요",
    },
  },
  
  // 로그인 서브타이틀 커스터마이징 예제
  signIn: {
    ...koKR.signIn,
    start: {
      ...koKR.signIn?.start,
      subtitle: "{{applicationName}}에 로그인하세요",
    },
  },
  
  // 에러 메시지 커스터마이징 예제
  unstable__errors: {
    ...koKR.unstable__errors,
    not_allowed_access:
      "접근이 허용되지 않은 이메일 도메인입니다. 회사 이메일 도메인을 허용 목록에 추가하려면 이메일을 보내주세요.",
  },
};

// 기본값으로 기본 한국어 로컬라이제이션 사용
export default defaultKoKR;

