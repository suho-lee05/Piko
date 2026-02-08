export function HeaderSearch() {
  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-full border border-slate-200 px-3 py-2">
      <input
        type="text"
        placeholder="상품을 검색하세요"
        className="w-full bg-transparent text-[18px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-[16px] text-white"
        aria-label="검색"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="20" y1="20" x2="16.5" y2="16.5" />
        </svg>
      </button>
    </div>
  );
}
