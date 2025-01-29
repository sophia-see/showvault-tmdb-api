import Link from "next/link";
import { MdMovie } from "react-icons/md";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-1 flex justify-center">
        <div className="mt-[60px] md:mt-[80px] flex-1 flex flex-col items-center gap-[60px] md:gap-[72px] lg:gap-[82px]">
            <Link href="/">
              <MdMovie className="fill-pure-red" size={48}/>
            </Link>
            {children}
        </div>
    </main>
  );
}