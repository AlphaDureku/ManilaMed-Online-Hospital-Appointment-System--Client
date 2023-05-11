import { Route, Routes } from "react-router-dom";
import Booking from "./Booking";
import CollectInfo from "./CollectInfo";
import BookingCompletedPage from "../../BookingCompletedPage";

export default function Services() {


  return (
    <Routes>
      <Route path="/Booking" element={<Booking />} />
      <Route path="/Collect-Info" element={<CollectInfo />} />
      <Route path="/bookingcompleted" element={<BookingCompletedPage />} />
    </Routes>
  );
}
