import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import { FetchData } from "./page/FetchData";
import Home from "./page/Home";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="fetchData" element={<FetchData />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
