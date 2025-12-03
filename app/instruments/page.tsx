import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

/**
 * Supabase 공식 문서 예제 페이지
 * 
 * 이 페이지는 Supabase 공식 문서의 Next.js Quickstart 가이드를 기반으로 합니다.
 * https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
 * 
 * instruments 테이블에서 데이터를 조회하여 표시합니다.
 */
async function InstrumentsData() {
  const supabase = await createClient();
  const { data: instruments, error } = await supabase.from("instruments").select();

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="font-semibold text-red-800 mb-2">에러 발생</h3>
        <p className="text-sm text-red-700">{error.message}</p>
        <p className="text-xs text-red-600 mt-2">
          💡 <strong>해결 방법:</strong>
          <br />
          1. Supabase Dashboard에서 instruments 테이블이 생성되었는지 확인
          <br />
          2. RLS 정책이 올바르게 설정되었는지 확인
          <br />
          3. 환경 변수가 올바르게 설정되었는지 확인
        </p>
      </div>
    );
  }

  if (!instruments || instruments.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">데이터가 없습니다.</p>
        <p className="text-xs text-yellow-700 mt-2">
          Supabase SQL Editor에서 다음 쿼리를 실행하여 샘플 데이터를 추가하세요:
        </p>
        <pre className="mt-2 p-2 bg-yellow-100 rounded text-xs overflow-x-auto">
{`-- Create the table
create table instruments (
  id bigint primary key generated always as identity,
  name text not null
);

-- Insert some sample data
insert into instruments (name)
values
  ('violin'),
  ('viola'),
  ('cello');

-- Enable RLS
alter table instruments enable row level security;

-- Create RLS policy
create policy "public can read instruments"
on public.instruments
for select to anon
using (true);`}
        </pre>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 font-semibold">
          ✅ Supabase 연결 성공! {instruments.length}개의 악기 데이터를 불러왔습니다.
        </p>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b">
          <h2 className="font-semibold">Instruments 테이블 데이터</h2>
        </div>
        <pre className="p-4 bg-white overflow-x-auto text-sm">
          {JSON.stringify(instruments, null, 2)}
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {instruments.map((instrument: { id: number; name: string }) => (
          <div
            key={instrument.id}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="font-semibold text-lg">{instrument.name}</div>
            <div className="text-sm text-gray-500 mt-1">ID: {instrument.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Instruments() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Supabase 공식 문서 예제
        </h1>
        <p className="text-gray-600">
          이 페이지는{" "}
          <a
            href="https://supabase.com/docs/guides/getting-started/quickstarts/nextjs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Supabase 공식 Next.js Quickstart 가이드
          </a>
          를 기반으로 합니다.
        </p>
      </div>

      <Suspense fallback={<div className="p-8 text-center">로딩 중...</div>}>
        <InstrumentsData />
      </Suspense>

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-bold mb-2">💡 이 페이지의 작동 원리</h3>
        <ul className="text-sm text-blue-900 space-y-1 list-disc list-inside">
          <li>
            Supabase 공식 문서의 표준 패턴을 사용합니다:{" "}
            <code className="bg-blue-100 px-1 rounded">createClient()</code>
          </li>
          <li>Clerk 인증과 통합되어 있어 인증된 사용자만 데이터에 접근할 수 있습니다</li>
          <li>Server Component에서 비동기로 데이터를 가져옵니다</li>
          <li>
            <code className="bg-blue-100 px-1 rounded">Suspense</code>를 사용하여 로딩 상태를 처리합니다
          </li>
        </ul>
      </div>
    </div>
  );
}

