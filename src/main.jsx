import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 1, // 1 hours
    },
  },
});

// const persister = createSyncStoragePersister({
//   storage: window.localStorage,
// });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <PersistQueryClientProvider client={queryClient}> */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    {/* </PersistQueryClientProvider> */}
  </StrictMode>
);
