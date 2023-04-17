import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Track from "./pages/Tracking";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Booking" element={<Booking />} />
      <Route path="/User/*" element={<Track />} />
      <Route path="/Admin/*" element={<Admin />} />
    </Routes>
  );
}
