import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Services from "./pages/Services/Services";
import Track from "./pages/Tracking";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Services/*" element={<Services />} />
      <Route path="/User/*" element={<Track />} />
      <Route path="/Admin/*" element={<Admin />} />
    </Routes>
  );
}
