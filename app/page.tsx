'use client';
import MainLayout from '../components/layout/MainLayout';
import SearchBar from '../components/ui/SearchBar';
import TitleBar from '../components/ui/TitleBar';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ActionButtons from '../components/ui/ActionButtons';

export default function HomePage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <ActionButtons />
        <SearchBar />
        <TitleBar />
        {/* Здесь будет ResultList */}
      </div>
    </MainLayout>
  );
}