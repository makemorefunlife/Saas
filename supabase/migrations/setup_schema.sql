-- Users 테이블 생성
-- Clerk 인증과 연동되는 사용자 정보를 저장하는 테이블

CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    clerk_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 테이블 소유자 설정
ALTER TABLE public.users OWNER TO postgres;

-- Row Level Security (RLS) 활성화
-- Clerk JWT 기반으로 사용자별 데이터 접근 제어
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 권한 부여
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;

-- RLS 정책: 사용자는 자신의 데이터만 조회 가능
CREATE POLICY "Users can view their own data"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (
    -- Clerk JWT의 'sub' 클레임을 사용하여 사용자 ID 확인
    clerk_id = (SELECT auth.jwt()->>'sub')
  );

-- RLS 정책: 새 사용자 생성 가능 (초기 회원가입 시)
CREATE POLICY "Users can insert their own data"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- 자신의 Clerk ID와 일치하는 레코드만 생성 가능
    clerk_id = (SELECT auth.jwt()->>'sub')
  );

-- RLS 정책: 사용자는 자신의 데이터만 수정 가능
CREATE POLICY "Users can update their own data"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (
    clerk_id = (SELECT auth.jwt()->>'sub')
  )
  WITH CHECK (
    clerk_id = (SELECT auth.jwt()->>'sub')
  );

-- RLS 정책: 사용자는 자신의 데이터만 삭제 가능
CREATE POLICY "Users can delete their own data"
  ON public.users
  FOR DELETE
  TO authenticated
  USING (
    clerk_id = (SELECT auth.jwt()->>'sub')
  );
