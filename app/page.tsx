'use client';
import MainLayout from '../components/layout/MainLayout';
import SearchBar from '../components/ui/SearchBar';
import TitleBar from '../components/ui/TitleBar';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ActionButtons from '../components/ui/ActionButtons';
import ResultList from '../components/todos/ResultList';

export default function HomePage() {
  const { isAuthenticated, isInitialized } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {

    if (isInitialized && !isAuthenticated && window.location.pathname !== '/login') {
      router.push('/login');
    }
  }, [isAuthenticated, isInitialized, router]);

  if (!isInitialized) return null;
  
  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <ActionButtons />
        <SearchBar />
        <TitleBar />
        <ResultList />
      </div>
    </MainLayout>
  );
}