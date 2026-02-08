"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("필수 항목을 모두 입력해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5000";

    try {
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          userName: name,
          password,
          phoneNumber: phoneNumber || null,
          roadAddress: roadAddress || null,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data?.message || "회원가입에 실패했습니다. 다시 시도해주세요."
        );
        return;
      }

      router.push("/sign-in");
    } catch (error) {
      setErrorMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-slate-50 px-6 py-12">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#000080]">
            P:Ko Market
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">회원가입</h1>
          <p className="text-sm text-slate-500">
            국내 제조사의 프리미엄 상품을 가장 먼저 만나보세요.
          </p>
        </div>

        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700 sm:col-span-1">
            이름
            <input
              type="text"
              placeholder="홍길동"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700 sm:col-span-1">
            연락처
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
            이메일
            <input
              type="email"
              placeholder="name@pko.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700 sm:col-span-1">
            비밀번호
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700 sm:col-span-1">
            비밀번호 확인
            <input
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
            주소
            <input
              type="text"
              placeholder="서울특별시 강남구 ..."
              value={roadAddress}
              onChange={(event) => setRoadAddress(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
            />
          </label>

          {errorMessage ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 sm:col-span-2">
              {errorMessage}
            </div>
          ) : null}

          <label className="flex items-center gap-2 text-xs text-slate-500 sm:col-span-2">
            <input type="checkbox" className="h-4 w-4 accent-[#00C853]" />
            서비스 이용약관 및 개인정보 처리방침에 동의합니다.
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#00C853] py-3 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
            disabled={isLoading}
          >
            {isLoading ? "가입 중..." : "회원가입 완료"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          이미 계정이 있으신가요?{" "}
          <Link href="/sign-in" className="font-semibold text-[#000080]">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
