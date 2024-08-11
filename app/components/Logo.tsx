import { Link } from "@remix-run/react";

import type { LogoProps } from "~/types/home";

export function Logo(props: LogoProps) {
  const { siteTitle } = props.home ?? {};

  if (!siteTitle && typeof document !== `undefined`) {
    console.info(
      `Create and publish "home" document in Sanity Studio at ${window.origin}/studio/desk/home`
    );
  }

  return (
    <p className="text-lg font-bold tracking-tighter text-indigo-900 dark:text-indigo-600 lg:text-2xl">
      <Link to="/">{siteTitle ?? `Sanity Remix`}</Link>
    </p>
  );
}
