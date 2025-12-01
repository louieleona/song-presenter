import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DirectorPage from './components/Director/DirectorPage';
import LivePage from './components/Live/LivePage';
import { useSessionState } from './hooks/useSessionState';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const [session, setSession] = useSessionState();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/director" replace />} />
      <Route
        path="/director"
        element={<DirectorPage session={session} onSessionChange={setSession} />}
      />
      <Route
        path="/live"
        element={<LivePage session={session} onSessionChange={setSession} />}
      />
    </Routes>
  );
}

export default App;
