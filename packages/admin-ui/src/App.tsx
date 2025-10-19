import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import QuizListPage from './pages/QuizListPage';
import QuizEditorPage from './pages/QuizEditorPage';

// Create a client for TanStack Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="quizzes" element={<QuizListPage />} />
            <Route path="quizzes/new" element={<QuizEditorPage />} />
            <Route path="quizzes/:id" element={<QuizEditorPage />} />
            {/* Add other routes here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;