import type { PropsWithChildren } from "react";

export function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="bg-gradient-to-r dark:from-indigo-300  dark:to-indigo-900 from-indigo-500  to-indigo-900 inline-block text-transparent bg-clip-text text-bold max-w-4xl text-4xl font-bold tracking-tighter md:text-4xl lg:text-5xl xl:text-8xl text-balance">
      {children}
    </h1>
  );
}
