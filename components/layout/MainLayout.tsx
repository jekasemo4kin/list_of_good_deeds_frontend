'use client';
import Header from './Header';
import { useSocketEvents } from '../../hooks/useSocketEvents';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  useSocketEvents();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow p-4 md:p-8">{children}</main>
    </div>
  );
}