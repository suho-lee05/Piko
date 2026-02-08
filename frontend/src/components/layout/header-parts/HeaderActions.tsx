import Link from "next/link";

type HeaderActionsProps = {
  isLoggedIn: boolean;
};

export function HeaderActions({ isLoggedIn }: HeaderActionsProps) {
  return (
    <div
      className="flex items-center gap-4 font-medium text-slate-700"
      style={{ fontSize: "28px" }}
    >
      <Link href="/cart">장바구니</Link>
      <Link href="/favorites">찜</Link>
      {isLoggedIn ? (
        <>
          <Link href="/my-page">마이페이지</Link>
          <button type="button" className="text-slate-500">
            로그아웃
          </button>
        </>
      ) : (
        <>
          <Link href="/sign-in">로그인</Link>
          <Link href="/sign-up">회원가입</Link>
        </>
      )}
    </div>
  );
}
