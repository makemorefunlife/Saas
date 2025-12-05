# Phase 3: 장바구니 & 주문 구현 계획

## 🎯 구현 목표

장바구니 기능과 주문 프로세스를 구현하여 사용자가 상품을 선택하고 주문할 수 있도록 합니다.

---

## 📋 구현 범위

### 1. 장바구니 기능
**목표**: 사용자가 상품을 장바구니에 추가/삭제하고 수량을 변경할 수 있도록 구현

#### 구현 내용
- [ ] 장바구니 타입 정의 (`types/cart.ts`)
- [ ] 장바구니 데이터 페칭 함수 (`lib/supabase/cart.ts`)
  - `getCartItems(clerkId)`: 사용자 장바구니 조회
  - `addToCart(clerkId, productId, quantity)`: 장바구니에 상품 추가
  - `updateCartItem(cartItemId, quantity)`: 장바구니 아이템 수량 변경
  - `removeFromCart(cartItemId)`: 장바구니에서 상품 삭제
- [ ] 장바구니 아이콘 컴포넌트 (Navbar에 표시)
- [ ] 장바구니 페이지 (`/cart`)
  - 장바구니 아이템 목록 표시
  - 수량 변경 UI
  - 삭제 버튼
  - 총 금액 계산 및 표시
  - "주문하기" 버튼

#### 디자인 요구사항
- Modern Seoul 테마 유지
- Spacing-First 정책 준수
- 반응형 디자인

---

### 2. 주문 생성 흐름
**목표**: 장바구니에서 주문 페이지로 이동하여 주문 정보를 입력하고 주문을 생성

#### 구현 내용
- [ ] 주문 타입 정의 (`types/order.ts`)
- [ ] 주문 데이터 저장 함수 (`lib/supabase/orders.ts`)
  - `createOrder(clerkId, orderData)`: 주문 생성
  - `createOrderItems(orderId, items)`: 주문 상세 아이템 저장
- [ ] 주문 페이지 (`/checkout`)
  - 주문 요약 (장바구니 아이템 목록)
  - 배송지 정보 입력 폼
    - 이름, 전화번호, 주소 (우편번호, 기본주소, 상세주소)
    - 주문 메모 (선택사항)
  - 총 금액 표시
  - 주문 생성 버튼
  - react-hook-form + Zod로 폼 검증

#### 주문 데이터 구조
```typescript
interface OrderData {
  clerk_id: string;
  total_amount: number;
  shipping_address: {
    name: string;
    phone: string;
    postcode: string;
    address: string;
    detailAddress: string;
  };
  order_note?: string;
  items: Array<{
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }>;
}
```

---

### 3. 주문 테이블 저장 및 합계 검증
**목표**: 주문 데이터를 `orders`와 `order_items` 테이블에 저장하고 합계를 검증

#### 구현 내용
- [ ] 주문 생성 Server Action (`actions/orders.ts`)
  - 장바구니 아이템 조회
  - 상품 가격 재확인 (변동 방지)
  - 총 금액 계산 및 검증
  - 트랜잭션 처리:
    1. `orders` 테이블에 주문 생성
    2. `order_items` 테이블에 주문 상세 아이템 저장
    3. 장바구니 비우기 (`cart_items` 삭제)
  - 에러 처리 및 롤백
- [ ] 주문 완료 페이지 (`/checkout/success`)
  - 주문 번호 표시
  - 주문 정보 요약
  - "주문 내역 보기" 버튼

---

## 🏗 기술 스펙

### 데이터 페칭
- **Server Actions**: 주문 생성은 Server Action으로 구현
- **Client Components**: 장바구니 UI는 Client Component로 구현
- **React Query**: 장바구니 데이터는 React Query로 관리 (선택사항)

### 타입 정의
```typescript
// types/cart.ts
export interface CartItem {
  id: string;
  clerk_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product; // JOIN된 상품 정보
}

// types/order.ts
export interface Order {
  id: string;
  clerk_id: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: {
    name: string;
    phone: string;
    postcode: string;
  };
  order_note?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  created_at: string;
}
```

### 폼 검증
- **react-hook-form**: 폼 상태 관리
- **Zod**: 스키마 검증
- **@hookform/resolvers**: Zod 리졸버

---

## 📁 파일 구조

```
app/
├── cart/
│   └── page.tsx                    # 장바구니 페이지
├── checkout/
│   ├── page.tsx                    # 주문 페이지
│   └── success/
│       └── page.tsx                # 주문 완료 페이지

components/
├── CartIcon.tsx                    # Navbar용 장바구니 아이콘
├── CartItem.tsx                    # 장바구니 아이템 컴포넌트
├── CartSummary.tsx                 # 장바구니 요약 컴포넌트
└── CheckoutForm.tsx                # 주문 폼 컴포넌트

lib/
└── supabase/
    ├── cart.ts                     # 장바구니 데이터 페칭 함수
    └── orders.ts                   # 주문 데이터 페칭 함수

actions/
└── orders.ts                       # 주문 생성 Server Action

types/
├── cart.ts                         # CartItem 타입 정의
└── order.ts                        # Order, OrderItem 타입 정의
```

---

## ✅ 구현 체크리스트

### Step 1: 타입 정의
- [ ] `types/cart.ts` 생성 (CartItem 인터페이스)
- [ ] `types/order.ts` 생성 (Order, OrderItem 인터페이스)

### Step 2: 장바구니 데이터 페칭
- [ ] `lib/supabase/cart.ts` 생성
  - [ ] `getCartItems(clerkId)` 함수
  - [ ] `addToCart(clerkId, productId, quantity)` 함수
  - [ ] `updateCartItem(cartItemId, quantity)` 함수
  - [ ] `removeFromCart(cartItemId)` 함수

### Step 3: 장바구니 UI 컴포넌트
- [ ] `components/CartIcon.tsx` 생성 (Navbar에 표시)
- [ ] `components/CartItem.tsx` 생성 (장바구니 아이템 표시)
- [ ] `components/CartSummary.tsx` 생성 (총 금액 계산)

### Step 4: 장바구니 페이지
- [ ] `app/cart/page.tsx` 생성
  - [ ] 장바구니 아이템 목록 표시
  - [ ] 수량 변경 기능
  - [ ] 삭제 기능
  - [ ] 총 금액 표시
  - [ ] "주문하기" 버튼

### Step 5: Navbar에 장바구니 아이콘 추가
- [ ] `components/Navbar.tsx` 수정
  - [ ] CartIcon 컴포넌트 추가
  - [ ] 장바구니 아이템 개수 표시

### Step 6: 주문 데이터 페칭
- [ ] `lib/supabase/orders.ts` 생성
  - [ ] `createOrder(orderData)` 함수 (서비스 역할 클라이언트 사용)

### Step 7: 주문 생성 Server Action
- [ ] `actions/orders.ts` 생성
  - [ ] `createOrderAction(formData)` 함수
  - [ ] 장바구니 아이템 조회
  - [ ] 상품 가격 재확인
  - [ ] 총 금액 계산 및 검증
  - [ ] 트랜잭션 처리 (orders + order_items)
  - [ ] 장바구니 비우기

### Step 8: 주문 폼 컴포넌트
- [ ] `components/CheckoutForm.tsx` 생성
  - [ ] react-hook-form + Zod 사용
  - [ ] 배송지 정보 입력 필드
  - [ ] 주문 메모 입력 필드
  - [ ] 폼 검증

### Step 9: 주문 페이지
- [ ] `app/checkout/page.tsx` 생성
  - [ ] 주문 요약 표시
  - [ ] CheckoutForm 컴포넌트
  - [ ] 총 금액 표시
  - [ ] 주문 생성 버튼

### Step 10: 주문 완료 페이지
- [ ] `app/checkout/success/page.tsx` 생성
  - [ ] 주문 번호 표시
  - [ ] 주문 정보 요약
  - [ ] "주문 내역 보기" 버튼

### Step 11: ProductCard에 장바구니 추가 버튼
- [ ] `components/ProductCard.tsx` 수정
  - [ ] "장바구니 추가" 버튼 추가 (상세 페이지가 아닌 경우)

---

## 🎨 디자인 가이드

### 색상
- 배경: `bg-black`
- 카드 배경: `bg-white/5`
- 버튼: `bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500`
- 텍스트: `text-white`, `text-white/70`

### 간격
- 페이지 패딩: `p-4 md:p-6 lg:p-8`
- 요소 간격: `gap-4 md:gap-6`
- Spacing-First 정책 준수

---

## 🔗 관련 파일

- [ggultip.mdc 규칙](../.cursor/rules/ggultip.mdc)
- [Next.js Convention](../.cursor/rules/web/nextjs-convention.mdc)
- [TODO.md](./TODO.md)
- [PRD.md](./PRD.md)

