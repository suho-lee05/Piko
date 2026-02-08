"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5000";

    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data?.message || "로그인에 실패했습니다. 다시 시도해주세요."
        );
        return;
      }

      if (data?.token) {
        localStorage.setItem("pko_token", data.token);
      }

      router.push("/");
    } catch (error) {
      setErrorMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-slate-50 px-6 py-12">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#000080]">
            P:Ko Market
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">로그인</h1>
          <p className="text-sm text-slate-500">
            국내 제조 브랜드의 가치를 담은 커머스를 시작하세요.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            이메일
            <input
              type="email"
              placeholder="name@pko.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            비밀번호
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
            />
          </label>

          {errorMessage ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </div>
          ) : null}

          <div className="flex items-center justify-between text-xs text-slate-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-[#000080]" />
              로그인 유지
            </label>
            <button type="button" className="text-[#000080]">
              비밀번호 찾기
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#000080] py-3 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          아직 회원이 아니신가요?{" "}
          <Link href="/sign-up" className="font-semibold text-[#000080]">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
