import { useEffect } from 'react';
import AppRouter from './routes/AppRouter';
import { useThemeStore } from './store/themeStore';

function App() {
  const initTheme = useThemeStore((state) => state.initTheme);

  useEffect(() => initTheme(), []);

  return (
    <AppRouter />
  );
}

export default App;