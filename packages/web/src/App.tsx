import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import GamePage from '@/pages/GamePage';
import GameOverPage from '@/pages/GameOverPage';
import { Toaster } from '@/components/ui/Toaster';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/play" element={<GamePage />} />
          <Route path="/end" element={<GameOverPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;