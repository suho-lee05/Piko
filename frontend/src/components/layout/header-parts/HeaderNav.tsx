import Link from "next/link";

const categories = ["전체", "인증 제품", "우수 제조사", "신상품"];

export function HeaderNav() {
  return (
    <nav
      className="hidden items-center gap-4 font-medium text-slate-700 md:flex"
      style={{ fontSize: "28px" }}
    >
      {categories.map((category) => (
        <Link key={category} href="/search">
          {category}
        </Link>
      ))}
    </nav>
  );
}
