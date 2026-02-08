# P:Ko Market

국내 중소 제조업체의 고품질 제품을 큐레이션하고, 제조 공정의 투명한 공개를 통해 신뢰 기반 커머스를 제공하는 쇼핑몰 프로젝트입니다.

## 핵심 가치
- 엄격한 입점 심사로 순수 국내 제조 제품 인증
- 제조 현장 스토리와 공정 영상으로 진정성 전달
- 가치 소비를 지향하는 MZ세대와 품질 중심의 3050 세대 연결

## 브랜드 가이드라인
- 폰트: Pretendard
- 메인 컬러: 네이비 `#000080`
- 포인트 컬러: 그린 `#00C853`
- 디자인 원칙: 화이트 배경 중심의 미니멀 UI + 네이비 포인트

## 기술 스택
- 프론트엔드: Next.js (App Router), TypeScript, React, Tailwind CSS
- 백엔드: Node.js (Express/Fastify)
- DB: Supabase (PostgreSQL)

## 기능 요약
### 구매자 (Buyer)
- 메인: 슬로건 및 우수 제조사/상품 큐레이션
- 검색/필터: 키워드, 제조사/인증 유형 필터링
- 상품 상세: 이미지, 공정 비디오, 인증 데이터, 상세 설명
- 제조사 페이지: 공장 실사 영상, 브랜드 철학 인터뷰, 제조사 상품 목록
- 장바구니/찜: 수량 편집, 관심 상품 저장
- 주문/결제: 배송지 입력, 결제 수단 선택, 주문 내역 확인
- 마이페이지: 회원 정보 수정, 배송 상태 조회, 찜 목록 관리

### 관리자 (Admin/Seller)
- 대시보드: 실시간 매출 지표, 신규 주문/재고 현황
- 상품 관리: 등록(이미지/영상 업로드), 수정, 삭제, 판매 상태 제어
- 제조사 정보 관리: 홍보 영상 URL, 브랜드 스토리 편집
- 회원/주문 관리: 구매 유저 목록, 주문 상태 업데이트

## 폴더 구조
```
frontend/
  public/
  src/
    app/
      (auth)/
        sign-in/
        sign-up/
      (buyer)/
        page.tsx
        item/[id]/
        cart/
        search/
        favorites/
        my-page/
        order/
        order-history/
        company/
      (admin)/
        dashboard/
        products/
        upload/
        buyers/
        orders/
        company/
      layout.tsx
    components/
      common/
      layout/
      features/
    hooks/
    services/
    store/
    types/
    utils/
    constants/
backend/
  src/
    domains/
      auth/
      manufacturers/
      products/
```

## 실행 방법
### 백엔드
```
cd backend
npm install
npm run dev
```

### 프론트엔드
```
cd frontend
npm install
npm run dev
```

## 환경 변수
- 프론트엔드: `frontend/.env.local`
- 백엔드: `backend/.env`

## 참고
- 프론트엔드와 백엔드를 분리 개발합니다.