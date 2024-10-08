import { Logo } from "~/components/Logo";
import type { LogoProps } from "~/types/home";

export function Footer(props: LogoProps) {
  return (
    <header className="border-t border-gray-100 transition-colors duration-1000 ease-in-out dark:border-gray-900">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <Logo home={props.home} />
        <div className="flex max-w-sm text-right flex-1 flex-col items-end justify-end gap-2 text-sm lg:flex-row lg:items-center lg:gap-2">
          <a
            className="hover:text-indigo-600 dark:hover:text-indigo-500"
            href="https://www.linkedin.com/in/pschristie/"
          >
            Linkedin
          </a>
        </div>
        <div className="flex max-w-sm text-right flex-1 flex-col items-end justify-end gap-2 text-sm lg:flex-row lg:items-center lg:gap-2">
          <a
            className="hover:text-indigo-600 dark:hover:text-indigo-500"
            href="https://github.com/PChristie37"
          >
            Github
          </a>
        </div>
      </div>
    </header>
  );
}
