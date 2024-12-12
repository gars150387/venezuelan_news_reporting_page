import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home";
import { Main } from "./components/artricle/Main";

function App() {
  // const Main = lazy(() => import("./components/artricle/Main"));
  return (
    <BrowserRouter>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        </Routes>
      </Suspense> */}
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
