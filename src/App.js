import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Booking from "./pages/Booking";
import Home from "./pages/Home";
import Track from "./pages/Tracking";

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
