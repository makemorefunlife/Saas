/**
 * @file formatPrice.ts
 * @description 가격 포맷팅 유틸리티 함수
 *
 * 숫자를 원화 형식으로 포맷팅합니다.
 * 예: 89000 -> "89,000원"
 */

/**
 * 숫자를 원화 형식으로 포맷팅
 * @param price - 포맷팅할 가격 (숫자)
 * @returns 포맷팅된 가격 문자열 (예: "89,000원")
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(price);
}

