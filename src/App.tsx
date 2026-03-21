import { useEffect } from 'react';
import AppRouter from './routes/AppRouter';
import { useThemeStore } from './lib/store/themeStore';
import { Toaster } from "sileo";

function App() {
  const initTheme = useThemeStore((state) => state.initTheme);

  useEffect(() => initTheme(), []);

  return (
    <>
      <Toaster position="top-right" />
      <AppRouter />
    </>
  );
}

export default App;