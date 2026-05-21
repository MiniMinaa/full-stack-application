import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Browse from "./pages/Browse";
import LampDetail from "./pages/LampDetail";
import AddLamp from "./pages/AddLamp";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/lamps/:id" element={<LampDetail />} />
          <Route path="/add" element={<AddLamp />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
