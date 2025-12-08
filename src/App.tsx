import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
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
      <Route path="/" element={<LandingPage />} />
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
