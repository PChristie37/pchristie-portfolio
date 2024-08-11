import { Link } from "@remix-run/react";
import { Logo } from "~/components/Logo";
import { ThemeToggle } from "~/components/ThemeToggle";
import { HomeDocument } from "~/types/home";
import type { ThemePreference } from "~/types/themePreference";

type LayoutProps = {
  home: HomeDocument | null | undefined;
  theme: ThemePreference;
};

export function Header(props: LayoutProps) {
  return (
    <header className="border-b border-gray-100 transition-colors duration-1000 ease-in-out dark:border-gray-900">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <Logo home={props.home} />
        <p className="text-md font-bold tracking-tighter text-indigo-900 dark:text-indigo-300">
          <Link to="/contact">Contact</Link>
        </p>
        <p className="text-md font-bold tracking-tighter text-indigo-900 dark:text-indigo-300">
          <Link to="/codetests">Code tests</Link>
        </p>
        <ThemeToggle theme={props.theme} />
      </div>
    </header>
  );
}
