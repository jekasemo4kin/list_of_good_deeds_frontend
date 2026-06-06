'use client';
import MainLayout from '../components/layout/MainLayout';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
      <h1 className="text-2xl font-bold">Список добрых дел</h1>
      {/* Здесь будут SearchBar и ResultList */}
    </MainLayout>
  );
}