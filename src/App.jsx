import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from "./components/Home";
import { Main } from "./components/artricle/Main";
import PWAInstallModal from "./components/PWAInstallModal";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 60 * 1000, // 1 hour
      cacheTime: 5 * 60 * 60 * 1000, // 5 hours
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Main />} />
        </Routes>
        <PWAInstallModal />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
