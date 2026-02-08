import {
  HeaderActions,
  HeaderLogo,
  HeaderNav,
  HeaderSearch,
} from "./header-parts";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex w-full items-center justify-between gap-6 px-8 py-5">
        <HeaderLogo />
        <div className="flex flex-1 items-center justify-between gap-6 px-6">
          <HeaderNav />
          <HeaderSearch />
        </div>
        <HeaderActions />
      </div>
    </header>
  );
}
