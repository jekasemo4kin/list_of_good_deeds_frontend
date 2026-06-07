import '../styles/globals.css';
import StoreProvider from './StoreProvider';
import ModalManager from '../components/ui/ModalManager';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <StoreProvider>
          {children}
          <ModalManager />
          </StoreProvider>
      </body>
    </html>
  );
}
