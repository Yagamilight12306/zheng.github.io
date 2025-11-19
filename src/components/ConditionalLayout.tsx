'use client';
import { usePathname } from 'next/navigation';
import NavBar from './NavBar';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isTodoList = pathname === '/todolist';

  if (isTodoList) {
    return <>{children}</>;
  }

  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <main className="flex justify-start space-x-4">{children}</main>
      <footer className="flex justify-center items-center md:pt-[150px] pt-[70px]">
        <small className="text-sm font-medium leading-none">
          @2024 footer test test
        </small>
      </footer>
    </>
  );
}


