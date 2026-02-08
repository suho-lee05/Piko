import Link from "next/link";

export function HeaderLogo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-3"
      style={{ width: "150px", height: "150px", userSelect: "none" }}
    >
      <img
        src="/P:ko-logo.png?v=2"
        alt="P:Ko Market"
        style={{
          width: "150px",
          height: "150px",
          maxWidth: "none",
          cursor: "pointer",
          userSelect: "none",
        }}
      />
    </Link>
  );
}
