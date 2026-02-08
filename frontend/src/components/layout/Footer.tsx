export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <h3 className="mb-3 text-base font-semibold text-slate-900">
              P:Ko MARKET
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              검증된 한국산 프리미엄 제품만을 엄선하여 제공합니다. 장인정신과
              품질을 최우선으로 생각하는 이커머스 플랫폼입니다.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-600"
                aria-label="페이스북"
              >
                f
              </button>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-600"
                aria-label="인스타그램"
              >
                in
              </button>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-600"
                aria-label="유튜브"
              >
                yt
              </button>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">
              고객 지원
            </h4>
            <ul className="grid gap-2 text-sm text-slate-600">
              <li>자주 묻는 질문</li>
              <li>배송 안내</li>
              <li>반품 & 교환</li>
              <li>고객 문의</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">
              회사 정보
            </h4>
            <ul className="grid gap-2 text-sm text-slate-600">
              <li>미리보기</li>
              <li>이용 약관</li>
              <li>개인정보처리방침</li>
              <li>제조사 파트너</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">연락처</h4>
            <ul className="grid gap-2 text-sm text-slate-600">
              <li>✉ help@p2komarket.com</li>
              <li>☎ 02-1234-5678</li>
              <li>📍 서울특별시 강남구 테헤란로 123, 8층</li>
            </ul>
          </div>
        </div>

        <div className="my-6 border-t border-slate-200" />

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            대표자: 홍길동 | 사업자등록번호: 123-45-67890 | 통신판매업신고번호:
            2026-서울강남-12345
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-600">
              VISA
            </span>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-600">
              Master
            </span>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-600">
              Kakao Pay
            </span>
          </div>
          <div>© 2026 P:Ko MARKET. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
