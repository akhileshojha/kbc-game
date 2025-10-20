import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import GamePage from '@/pages/GamePage';
import GameOverPage from '@/pages/GameOverPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/play" element={<GamePage />} />
            <Route path="/game-over" element={<GameOverPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;