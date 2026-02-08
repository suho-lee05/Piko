 "use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function HeaderActions() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      const token = localStorage.getItem("pko_token");
      setIsLoggedIn(Boolean(token));
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("pko_token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

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
          <button type="button" className="text-slate-500" onClick={handleLogout}>
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
