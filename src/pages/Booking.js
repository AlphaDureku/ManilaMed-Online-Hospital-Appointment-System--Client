import { useEffect } from "react";

export default function Services() {
  useEffect(() => {
    document.title = "Booking";
  }, []);
  return <>Booking</>;
}
