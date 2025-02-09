import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <div className="flex gap-5 items-center font-bold text-2xl">
      <Link href={"/"} className="text-primary flex items-center gap-2">
        <span>
          <Image
            src="/teller_app_logo.png"
            height={40}
            width={40}
            alt="Teller App Logo"
            className="dark:hidden"
          />
          <Image
            src="/teller_app_logo_light.png"
            height={40}
            width={40}
            alt="Teller App Logo"
            className="hidden dark:block"
          />
        </span>
        Teller
      </Link>
    </div>
  );
}
