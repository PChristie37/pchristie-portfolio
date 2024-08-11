import { Link, Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <div className="transition-colors duration-1000 relative isolate dark:bg-black bg-white px-6 py-24 sm:py-32 lg:px-8">
      <p className="text-md font-bold tracking-tighter text-indigo-900 dark:text-indigo-700">
        <Link prefetch="intent" to={`/codetests/defertest`}>
          Defer test
        </Link>
      </p>
      <p className="text-md font-bold tracking-tighter text-indigo-900 dark:text-indigo-700">
        <Link prefetch="intent" to={`/codetests/lottietest`}>
          Lottie Test
        </Link>
      </p>
      <Outlet />
    </div>
  );
}
