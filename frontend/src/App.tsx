import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Browse from "./pages/Browse";
import GymDetail from "./pages/GymDetail";
import AddGym from "./pages/AddGym";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/gyms/:id" element={<GymDetail />} />
          <Route path="/add" element={<AddGym />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
